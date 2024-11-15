import React, { useContext, useEffect, useRef,useState } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNotes,editNote} = context;
  const [note, setNote] = useState({etitle: "", edescription: "", etag: ""})
  useEffect(() => {
    getNotes();
  }, []);

  const ref = useRef(null);
const updateNote = (currentNote) => {
  handleOpenModal();

  setNote({etitle: currentNote.title, edescription: currentNote.description, etag:currentNote.tag})
}

const [showModal, setShowModal] = useState(false);

const handleOpenModal = () => {
  setShowModal(true);
};

const handleCloseModal = () => {
  setShowModal(false);
};
const handleClick = (e)=>{
  console.log("Updating the note...", note)
  editNote(note.id,note.etitle,note.edescription,note.etag);
}
const onChange = (e)=>{
  setNote({...note, [e.target.name]: e.target.value})
}
return (
  <div className="container">
    <AddNote />

    <div>
      {showModal && (
        <div
          className="modal fade show"
          style={{ display: "block" }}
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden={!showModal}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Edit Note
                </h5>
                <button
                  type="button"
                  className="close"
                  onClick={handleCloseModal}
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form className="my-3">
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                      Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      name="etitle"
                      value={note.etitle}
                      aria-describedby="emailHelp"
                      onChange={onChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                      Description
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="description"
                      value={note.edescription}
                      name="edescription"
                      onChange={onChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="tag" className="form-label">
                      Tag
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="tag"
                      name="etag"
                      value={note.etag}
                      onChange={onChange}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleClick}
                >
                  Update note
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>

    <div className="row my-3">
      <h2>Your Notes</h2>

      {notes.map((noteItem) => (
        <NoteItem key={noteItem._id} updateNote={updateNote} notes={noteItem} />
      ))}
    </div>
  </div>
);
};

export default Notes;
