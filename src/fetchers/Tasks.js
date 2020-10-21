import Controller from ".././fetchers";

import Alerts from "helpers/Alerts";
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

  updateTaskTitle = (cardId, cardTitle, _callback) => {
    Alerts.showLoading();
    axios({
      method: "put",
      url: apiUrl + "/cards",
      headers: {
        "api-token": this.db.get("api-token"),
      },
      data: { cardTitle, cardId },
    })
      .then((response) => {
        Alerts.showLoading(false);
        _callback(response.data);
      })
      .catch((error) => {
        this.errorsHandler(error, () =>
          this.updateTaskTitle(cardTitle, cardId, _callback)
        );
      });
  };
}

export default Controller_Task;
