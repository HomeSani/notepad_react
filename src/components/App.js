import axios from "axios";
import uniqid from "uniqid";
import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import { app } from "./App.module.scss";
import Note from "./Note";

import settings from "../config";

import { useDispatch } from "react-redux";
import { setNote } from "../redux/actions/note";

function App() {
  const dispatch = useDispatch();

  const url = window.location.href;
  const host = settings.host;

  const id = url.split("/")[url.split("/").length - 1];

  if (!id) {
    window.location.href = url + uniqid();
  }

  React.useEffect(() => {
    axios
      .get(`${host}:8080/notes?id=${id}`)
      .then((resp) => dispatch(setNote(resp.data[0])));
  }, []);

  return (
    <BrowserRouter>
      <div className={app}>
        <Route path="/*">
          <Note host={host} />
        </Route>
      </div>
    </BrowserRouter>
  );
}

export default App;
