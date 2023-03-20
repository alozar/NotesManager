namespace NotesManager.API.DAL;

public interface IRepository<T> where T : class
{
    List<T> GetAll();
    T Get(int id);
    int Create(T item);
    void Update(T item);
    void Delete(int id);
}
