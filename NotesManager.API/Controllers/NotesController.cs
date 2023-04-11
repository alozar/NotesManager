using Microsoft.AspNetCore.Mvc;
using NotesManager.API.DAL;
using NotesManager.API.Services;

namespace NotesManager.API.Controllers;

[ApiController]
[Route("[controller]")]
public class NotesController : ControllerBase
{
    private readonly INotesService _notesService;
    public NotesController(INotesService notesService)
    {
        _notesService = notesService;
    }

    [HttpGet("{id}")]
    public ActionResult<Note> Get(int? id)
    {
        if (id == null)
        {
            return BadRequest();
        }
        var note = _notesService.Get(id.Value);
        return Ok(note);
    }

    [HttpGet]
    public ActionResult<List<Note>> Get()
    {
        var notes = _notesService.GetAll();
        return Ok(notes);
    }

    [HttpPost]
    public ActionResult<int> Post([FromBody] Note note)
    {
        var id = _notesService.Create(note);
        return Ok(id);
    }

    [HttpPut]
    public ActionResult Put([FromBody] Note note)
    {
        _notesService.Update(note);
        return Ok();
    }

    [HttpDelete("{id}")]
    public ActionResult Delete(int? id)
    {
        if (id == null)
        {
            return BadRequest();
        }
        _notesService.Delete(id.Value);
        return Ok();
    }
}