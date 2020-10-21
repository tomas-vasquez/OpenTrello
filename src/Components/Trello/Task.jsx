import Icons from "components/common/Icons";
import React, { useState } from "react";

export default function Task({
  taskTitle,
  taskId,
  taskCompleted,
  updateTaskTitle,
  deleteTask,
  strikeTask,
}) {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [taskTitleChangeBool, setTaskTitleChangeBool] = useState(false);

  const [isCompleted, setIsCompleted] = useState(taskCompleted);

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    if (newTaskTitle === "") {
      return;
    } else {
      updateTaskTitle(taskId, newTaskTitle);
      setNewTaskTitle("");
      setTaskTitleChangeBool(!taskTitleChangeBool);
    }
  };

  const handleStrike = () => {
    strikeTask(taskId);
    setIsCompleted(!isCompleted);
  };

  return (
    <>
      <div className="card p-2">
        {taskTitleChangeBool ? (
          <form
            className="update-form"
            onSubmit={(event) => handleUpdateSubmit(event)}
          >
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder={taskTitle}
                onChange={(event) => setNewTaskTitle(event.target.value)}
              />
            </div>
          </form>
        ) : (
          <>
            <p
              onClick={() => handleStrike(taskId)}
              className="title"
              style={
                isCompleted
                  ? {
                      textDecoration: "line-through",
                      textDecorationWidth: "100px",
                      textDecorationThickness: "100px",
                      fontStyle: "italic",
                    }
                  : { textDecoration: "none" }
              }
            >
              {taskTitle}
            </p>
          </>
        )}
        <div className=" d-flex">
          <button
            className="btn btn-outline btn-sm ml-auto text-muted"
            onClick={() => setTaskTitleChangeBool(!taskTitleChangeBool)}
          >
            <Icons icon="pencil" />
          </button>

          <button
            className="btn btn-outline btn-sm  text-muted"
            onClick={() => deleteTask(taskId)}
          >
            <Icons icon="trash" />
          </button>
        </div>
      </div>
    </>
  );
}
