import axios from "axios";
import React from "react";

import style from "./Note.module.scss";
import { useSelector } from "react-redux";

function Note({ host }) {
  const note = useSelector(({ notes }) => notes.items[0]);

  const url = window.location.href;

  const noteColors = [
    "#FF8A65",
    "#C5E1A5",
    "#90CAF9",
    "#CE93D8",
    "#80CBC4",
    "#F48FB1",
  ];

  const [colorMenuIsActive, setColorMenuIsActive] = React.useState(false);
  const [currentColor, setCurrentColor] = React.useState("#C5E1A5");
  const [noteText, setNoteText] = React.useState("");

  React.useEffect(() => {
    if (note) {
      setNoteText(note.text);
      setCurrentColor(note.color);
    }
  }, [note]);

  const copyUrl = () => {
    navigator.clipboard.writeText(url);
  };

  const toggleColorMenu = () => {
    setColorMenuIsActive(!colorMenuIsActive);
  };

  const selecteColor = (color) => {
    setCurrentColor(color);
  };

  const handleTextarea = (e) => {
    setNoteText(e.target.value);
  };

  const saveNote = () => {
    const id = url.split("/")[url.split("/").length - 1];

    const newNote = {
      id: id,
      text: noteText,
      color: currentColor,
    };

    axios.get(`${host}:8080/notes?id=${id}`).then((resp) => {
      if (resp.data[0]) {
        axios.put(`${host}:8080/notes/${id}`, newNote);
      } else {
        axios.post(`${host}:8080/notes`, newNote);
      }
    });
  };

  return (
    <div
      className={style.note}
      style={{
        backgroundColor: currentColor,
      }}
    >
      <header>
        <h1>
          <a>Notepad</a>
        </h1>

        <div className={style.menu}>
          <div className={style.copy} onClick={copyUrl}>
            <img src="ui/copy.svg" alt="copy" />
          </div>
          <div className={style.save} onClick={saveNote}>
            <img src="ui/save.svg" alt="save" />
          </div>
          <div className="colors">
            <div className={style.selectedColor} onClick={toggleColorMenu}>
              <div
                style={{
                  backgroundColor: currentColor,
                }}
              ></div>
              <ul className={colorMenuIsActive ? style.active : ""}>
                {noteColors
                  .filter((color) => color !== currentColor)
                  .map((color) => (
                    <li key={color} onClick={() => selecteColor(color)}>
                      <div
                        style={{
                          backgroundColor: color,
                        }}
                      ></div>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </header>
      <div className={style.content}>
        <textarea
          spellCheck={false}
          wrap="hard"
          maxLength={390}
          placeholder="Wtite your note"
          value={noteText}
          onChange={handleTextarea}
        ></textarea>
      </div>
    </div>
  );
}

export default Note;
