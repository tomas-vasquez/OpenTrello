import Icons from "../../Components/common/Icons";
import React, { useState } from "react";

export default function Task({ task, updateTask, deleteTask, strikeTask }) {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [taskTitleChangeBool, setTaskTitleChangeBool] = useState(false);

  const [isCompleted, setIsCompleted] = useState(task.completed);

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    if (newTaskTitle === "") {
      return;
    } else {
      updateTask(task._id, { ...task, taskTitle: newTaskTitle });
      setNewTaskTitle("");
      setTaskTitleChangeBool(!taskTitleChangeBool);
    }
  };

  const handleStrike = () => {
    updateTask(task._id, { ...task, completed: !isCompleted });
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
                placeholder={task.taskTitle}
                onChange={(event) => setNewTaskTitle(event.target.value)}
                defaultValue={task.taskTitle}
              />
            </div>
          </form>
        ) : (
          <>
            <p
              onClick={() => handleStrike(task.taskId)}
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
              {task.taskTitle}
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
            onClick={() => deleteTask(task._id)}
          >
            <Icons icon="trash" />
          </button>
        </div>
      </div>
    </>
  );
}
