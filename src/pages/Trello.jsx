import React, { useState, useEffect } from "react";
// import { v4 as uuidv4 } from "uuid";

// // Context API
// // import { UserContext } from "contexts/userContext";

// Child components
import Navbar from "components/theme/Navbar";
import Card from "components/Trello/Card";
import Widget from "../components/Trello/Widget";
import Controller_Card from "fetchers/Cards";
import Controller_Tasks from "fetchers/Tasks";

function Trello() {
  const controllerCards = new Controller_Card();
  const controllerTasks = new Controller_Tasks();

  const [cards, setCards] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    controllerCards.getCards((_cards) => {
      setCards([...cards, ..._cards]);
    });
    controllerTasks.getTasks((_tasks) => {
      setTasks([...tasks, ..._tasks]);
    });
  }, []);

  const updateCardTitle = (cardId, newTitle) => {
    controllerCards.updateCardTitle(cardId, newTitle, () => {
      let _cards = [...cards];
      _cards = _cards.map((currCard) => {
        if (currCard._id === cardId) {
          console.log(currCard.cardTitle);
          currCard.cardTitle = newTitle;
        }
        return currCard;
      });
      setCards(_cards);
    });
  };

  const addCard = () => {
    let cardTitle = "New Card (Update)";
    controllerCards.addCard(cardTitle, (newCard) => {
      console.log(newCard);
      setCards([...cards, newCard]);
    });
  };

  const deleteCard = (_id) => {
    setTasks(tasks.filter((currTask) => currTask.parentid !== _id));
    setCards(cards.filter((currCard) => currCard._id !== _id));

    fetch(`/cards/${_id}`, {
      method: "DELETE",
    });
  };

  // ------ TASK'S STATE ------
  const updateTaskTitle = (taskId, newTitle) => {
    controllerTasks.updateTaskTitle(taskId, newTitle, () => {
      let _tasks = [...tasks];
      _tasks = _tasks.map((curr) => {
        if (curr._id === taskId) {
          curr.taskTitle = newTitle;
        }
        return curr;
      });
      setTasks(_tasks);
    });
  };

  // Add Task to Card & Update State
  const addTask = (parentCardId, addedTitle) => {
    const newTask = {
      taskTitle: addedTitle,
      completed: false,
      parentid: parentCardId,
    };
    controllerTasks.addTask(newTask, () => {
      setTasks([...tasks, newTask]);
    });
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((currTask) => currTask.taskid !== taskId));

    fetch(`/tasks/${taskId}`, {
      method: "DELETE",
    });
  };

  const strikeTask = (taskId) => {
    let edit = tasks.slice();
    edit.forEach((currTask) => {
      if (currTask.taskid === taskId) {
        let isStruck = currTask.completed;
        currTask.completed = !isStruck;

        fetch(`/tasks/completed/${taskId}`, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
      }
    });
    setTasks(edit);
  };

  // **** UI ****
  return (
    <>
      <Navbar />
      <div className="container-fluid card-columns py-4">
        {/* CARDS */}
        {cards.map((currCard) => (
          <Card
            key={currCard._id}
            cardTitle={currCard.cardTitle}
            taskList={tasks.filter((curr) => curr.parentid === currCard._id)}
            _id={currCard._id}
            // Card Functions
            updateCardTitle={updateCardTitle}
            deleteCard={deleteCard}
            // Task Functions
            updateTaskTitle={updateTaskTitle}
            addTask={addTask}
            deleteTask={deleteTask}
            strikeTask={strikeTask}
          />
        ))}

        <Widget onClick={() => addCard()} />
      </div>
    </>
  );
}

export default Trello;
