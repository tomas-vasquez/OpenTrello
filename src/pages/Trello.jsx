import React, { useState, useEffect } from "react";

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
    controllerCards.deleteCard(_id, () => {
      setTasks(tasks.filter((currTask) => currTask.parentid !== _id));
      setCards(cards.filter((currCard) => currCard._id !== _id));
    });
  };

  // ------ TASK'S STATE ------
  const updateTask = (taskId, updatedTask) => {
    controllerTasks.updateTaskTitle(taskId, updatedTask, () => {
      let _tasks = [...tasks];
      _tasks = _tasks.map((curr) => {
        if (curr._id === taskId) {
          return updatedTask;
        } else {
          return curr;
        }
      });
      setTasks(_tasks);
    });
  };

  const addTask = (parentCardId, addedTitle) => {
    const newTask = {
      taskTitle: addedTitle,
      completed: false,
      parentid: parentCardId,
    };
    controllerTasks.addTask(newTask, (_newTask) => {
      setTasks([...tasks, _newTask]);
    });
  };

  const deleteTask = (taskId) => {
    controllerTasks.deleteTask(taskId, () => {
      setTasks(tasks.filter((currTask) => currTask._id !== taskId));
    });
  };

  // const strikeTask = (taskId, completed) => {
  //   controllerTasks.strikeTask(taskId, completed, () => {
  //     let _tasks = [...tasks];
  //     _tasks = _tasks.map((curr) => {
  //       if (curr._id === taskId) {
  //         curr.completed = completed;
  //       }
  //       return curr;
  //     });
  //     setTasks(_tasks);
  //   });
  // };

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
            updateTask={updateTask}
            addTask={addTask}
            deleteTask={deleteTask}
          />
        ))}

        <Widget onClick={() => addCard()} />
      </div>
    </>
  );
}

export default Trello;
