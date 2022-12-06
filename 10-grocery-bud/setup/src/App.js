import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage);
  const [isEditing, setIsEditing] = useState(false);
  const [alert, setAlert] = useState({ show: false, type: "", msg: "" });
  const [editId, setEditId] = useState("");

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, "danger", "Please Enter Value");
    } else if (name && isEditing) {
      showAlert(true, "success", "Item edited");
      setList(
        list.map((item) => {
          if (item.id === editId) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setEditId(null);
      setIsEditing(false);
      setName("");
    } else {
      showAlert(true, "success", "Item Successfully Added");
      const newItem = { title: name, id: new Date().getTime().toString() };
      setList([...list, newItem]);
      setName("");
    }
  };

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  const clearItems = () => {
    showAlert(true, "danger", "All items deleted");
    setList([]);
  };

  const editItem = (id) => {
    let specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditId(specificItem.id);
    setName(specificItem.title);
  };
  const deleteItem = (id) => {
    showAlert(true, "danger", "Item successfully deleted");
    setList(list.filter((item) => item.id !== id));
  };
  return (
    <section className="section-center">
      <form className="grocery-form" on onSubmit={handleSubmit}>
        {alert.show && (
          <Alert alert={alert} removeAlert={showAlert} list={list}></Alert>
        )}
        <h3>Grocery Bud</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="e.g eggs"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="submit-btn">{`${
            isEditing ? "Edit" : "Submit"
          }`}</button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-container">
          <List items={list} editItem={editItem} deleteItem={deleteItem} />
          <button className="clear-btn" onClick={clearItems}>
            Clear Items
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
