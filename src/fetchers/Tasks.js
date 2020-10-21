import Controller from ".././fetchers";

import Alerts from "../helpers/Alerts";
import { apiUrl } from "../site.config";
import axios from "axios";

class Controller_Task extends Controller {
  /*!
    =========================================================
    * 
    =========================================================
    */

  addTask = (data, _callback) => {
    Alerts.showLoading();

    axios({
      method: "post",
      url: apiUrl + "/tasks",
      headers: {
        "api-token": this.db.get("api-token"),
      },
      data,
    })
      .then((response) => {
        Alerts.showLoading(false);
        _callback(response.data);
      })
      .catch((error) => {
        this.errorsHandler(error, () => this.addTask(data));
      });
  };

  getTasks = (_callback) => {
    Alerts.showLoading();
    axios({
      method: "get",
      url: apiUrl + "/tasks",
      headers: {
        "api-token": this.db.get("api-token"),
      },
    })
      .then((response) => {
        Alerts.showLoading(false);
        _callback(response.data);
      })
      .catch((error) => {
        this.errorsHandler(error, () => this.getTasks(_callback));
      });
  };

  updateTaskTitle = (taskId, taskUpdated, _callback) => {
    Alerts.showLoading();
    axios({
      method: "put",
      url: apiUrl + "/tasks",
      headers: {
        "api-token": this.db.get("api-token"),
      },
      data: taskUpdated,
    })
      .then((response) => {
        Alerts.showLoading(false);
        _callback(response.data);
      })
      .catch((error) => {
        this.errorsHandler(error, () =>
          this.updateTaskTitle(taskId, taskUpdated, _callback)
        );
      });
  };

  deleteTask = (taskId, _callback) => {
    Alerts.showLoading();
    axios({
      method: "delete",
      url: apiUrl + "/tasks",
      headers: {
        "api-token": this.db.get("api-token"),
      },
      data: { taskId },
    })
      .then((response) => {
        Alerts.showLoading(false);
        _callback(response.data);
      })
      .catch((error) => {
        this.errorsHandler(error, () => this.deleteTask(taskId, _callback));
      });
  };

  strikeTask = (taskId, completed, _callback) => {
    Alerts.showLoading();
    axios({
      method: "put",
      url: apiUrl + "/tasks",
      headers: {
        "api-token": this.db.get("api-token"),
      },
      data: { taskId, completed },
    })
      .then((response) => {
        Alerts.showLoading(false);
        _callback(response.data);
      })
      .catch((error) => {
        this.errorsHandler(error, () =>
          this.strikeTask(taskId, completed, _callback)
        );
      });
  };
}

export default Controller_Task;
