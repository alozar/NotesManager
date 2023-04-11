using NotesManager.API.DAL;
using NotesManager.API.Services;

namespace NotesManager.API;

public class Program
{
    public static void Main(string[] args)
    {
        var app = CreateWebApplication(args);

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseCors(builder =>
            builder
            .AllowAnyOrigin()
            .WithMethods("GET", "POST", "PUT", "DELETE")
            .WithHeaders("accept", "content-type", "origin", "custom-header"));

        app.UseHttpsRedirection();

        app.MapControllers();

        app.Run();
    }

    private static WebApplication CreateWebApplication(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.Services.AddControllers();

        builder.Services.AddEndpointsApiExplorer();

        builder.Services.AddSwaggerGen();

        builder.Services.AddCors();


        builder.Services.AddTransient<INotesService, NotesService>();

        builder.Services.AddTransient<IRepository<Note>, NotesRepository>();

        return builder.Build();
    }
}