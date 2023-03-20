using NotesManager.API.DAL;

namespace NotesManager.API.Services;

public interface INotesService
{
    List<Note> GetAll();

    Note Get(int id);

    int Create(Note note);

    void Update(Note note);

    void Delete(int id);
}
