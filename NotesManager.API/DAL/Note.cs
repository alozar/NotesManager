namespace NotesManager.API.DAL;

public partial class Note
{
    /// <summary>
    /// Идентификатор
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    /// Заголовок
    /// </summary>
    public string Head { get; set; } = null!;

    /// <summary>
    /// Содержание
    /// </summary>
    public string? Content { get; set; }

    /// <summary>
    /// Дата последнего изменения
    /// </summary>
    public DateTime Date { get; set; }
}
