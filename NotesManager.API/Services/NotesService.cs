using NotesManager.API.DAL;

namespace NotesManager.API.Services;

public class NotesService : INotesService
{
    private readonly IRepository<Note> _notesRepository;

    public NotesService(IRepository<Note> notesRepository)
    {
        _notesRepository = notesRepository;
    }

    public List<Note> GetAll()
    {
        return _notesRepository.GetAll();
    }

    public Note Get(int id)
    {
        return _notesRepository.Get(id);
    }

    public int Create(Note note)
    {
        return _notesRepository.Create(note);
    }

    public void Update(Note note)
    {
        _notesRepository.Update(note);
    }

    public void Delete(int id)
    {
        _notesRepository.Delete(id);
    }
}
