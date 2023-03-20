using Microsoft.Data.SqlClient;
using System.Data;

namespace NotesManager.API.DAL;

public class NotesRepository : IRepository<Note>
{
    private readonly string _connection;
    public NotesRepository(IConfiguration configuration)
    {
        _connection = configuration.GetConnectionString("Default");
    }

    public int Create(Note item)
    {
        var id = 0;
        using (SqlConnection connection = new SqlConnection(_connection))
        {
            connection.Open();
            SqlCommand command = new SqlCommand("sp_InsertNote", connection);
            command.CommandType = CommandType.StoredProcedure;
            command.Parameters.AddRange(
                new[]
                {
                    new SqlParameter
                    {
                        ParameterName = "@Head",
                        Value = item.Head
                    },
                    new SqlParameter
                    {
                        ParameterName = "@Content",
                        Value = item.Content
                    },
                    new SqlParameter
                    {
                        ParameterName = "@Date",
                        Value = item.Date
                    }
                }
            );
            id = (int)command.ExecuteScalar();
        }
        return id;
    }

    public void Delete(int id)
    {
        using (SqlConnection connection = new SqlConnection(_connection))
        {
            connection.Open();
            SqlCommand command = new SqlCommand("sp_DeleteNote", connection);
            command.CommandType = CommandType.StoredProcedure;
            command.Parameters.Add(new SqlParameter
            {
                ParameterName = "@Id",
                Value = id
            });
            command.ExecuteReader();
        }
    }

    public Note Get(int id)
    {
        var note = new Note();
        using (SqlConnection connection = new SqlConnection(_connection))
        {
            connection.Open();
            SqlCommand command = new SqlCommand("sp_GetNote", connection);
            command.CommandType = CommandType.StoredProcedure;
            command.Parameters.Add(new SqlParameter
            {
                ParameterName = "@id",
                Value = id
            });
            var reader = command.ExecuteReader();
            if (reader.HasRows)
            {
                reader.Read();
                note.Id = reader.GetInt32(0);
                note.Head = reader.GetString(1).Trim();
                note.Content = reader.GetString(2);
                note.Date = reader.GetDateTime(3);
            }
            reader.Close();
        }
        return note;
    }

    public List<Note> GetAll()
    {
        var notes = new List<Note>();
        using (SqlConnection connection = new SqlConnection(_connection))
        {
            connection.Open();
            SqlCommand command = new SqlCommand("sp_GetNotes", connection);
            command.CommandType = CommandType.StoredProcedure;
            var reader = command.ExecuteReader();
            if (reader.HasRows)
            {
                while (reader.Read())
                {
                    var note = new Note();
                    note.Id = reader.GetInt32(0);
                    note.Head = reader.GetString(1).Trim();
                    note.Content = reader.GetString(2);
                    note.Date = reader.GetDateTime(3);
                    notes.Add(note);
                }
            }
            reader.Close();
        }
        return notes;
    }

    public void Update(Note item)
    {
        using (SqlConnection connection = new SqlConnection(_connection))
        {
            connection.Open();
            SqlCommand command = new SqlCommand("sp_UpdateNote", connection);
            command.CommandType = CommandType.StoredProcedure;
            command.Parameters.AddRange(
                new[]
                {
                    new SqlParameter
                    {
                        ParameterName = "@Id",
                        Value = item.Id
                    },
                    new SqlParameter
                    {
                        ParameterName = "@Head",
                        Value = item.Head
                    },
                    new SqlParameter
                    {
                        ParameterName = "@Content",
                        Value = item.Content
                    },
                    new SqlParameter
                    {
                        ParameterName = "@Date",
                        Value = item.Date
                    }
                }
            );
            command.ExecuteReader();
        }
    }
}
