import Icons from "../../components/common/Icons";
import React, { useState } from "react";
import Task from "./Task";

export default function Card({
  cardTitle,
  taskList,
  _id,
  updateCardTitle,
  deleteCard,
  updateTask,
  addTask,
  deleteTask,
  strikeTask,
}) {
  const [newCardTitle, setNewCardTitle] = useState("");
  const [cardTitleChangeBool, setCardTitleChangeBool] = useState(false);
  const [addTaskTitle, setAddTaskTitle] = useState("");

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    if (newCardTitle === "") {
      return;
    } else {
      updateCardTitle(_id, newCardTitle);
      setCardTitleChangeBool(!cardTitleChangeBool);
      setNewCardTitle("");
    }
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (addTaskTitle === "") {
      return;
    } else {
      addTask(_id, addTaskTitle);
      setAddTaskTitle("");
    }
  };

  return (
    <div className="card">
      <div className="card-header d-flex p-2">
        {cardTitleChangeBool ? (
          <form action="" onSubmit={(event) => handleUpdateSubmit(event)}>
            <input
              onChange={(event) => setNewCardTitle(event.target.value)}
              type="text"
              className="form-control"
              placeholder={cardTitle}
            />
          </form>
        ) : (
          <h3
            className="lead mb-0"
            onClick={() => setCardTitleChangeBool(!cardTitleChangeBool)}
          >
            {cardTitle}
          </h3>
        )}
        <button
          className="btn btn-secondary btn-sm ml-auto"
          onClick={() => deleteCard(_id)}
        >
          <Icons icon="trash" className="mr-2" />
          Delete
        </button>
      </div>
      <div className="card-body p-2">
        {taskList.map((curr) => (
          <Task
            key={curr._id}
            // Task Properties
            task={curr}
            parentId={_id}
            // Task Functions
            updateTask={updateTask}
            deleteTask={deleteTask}
          />
        ))}
      </div>

      <div className="card-footer p-2">
        <form
          className="d-flex"
          action="input"
          onSubmit={(event) => handleAddSubmit(event)}
        >
          <div className="form-group mb-0">
            <input
              className="form-control"
              type="text"
              placeholder="Add Task"
              onChange={(event) => setAddTaskTitle(event.target.value)}
              value={addTaskTitle}
            />
          </div>
          <button className="btn btn-sm btn-info ml-auto">
            <Icons icon="plus" className="mr-2" />
            add
          </button>
        </form>
      </div>
    </div>
  );
}
