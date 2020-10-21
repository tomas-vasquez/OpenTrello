import Controller from ".././fetchers";

import Alerts from "helpers/Alerts";
import { apiUrl } from "../site.config";
import axios from "axios";

class Controller_Card extends Controller {
  /*!
    =========================================================
    * 
    =========================================================
    */

  addCard = (title, _callback) => {
    Alerts.showLoading();

    axios({
      method: "post",
      url: apiUrl + "/cards",
      headers: {
        "api-token": this.db.get("api-token"),
      },
      data: { title },
    })
      .then((response) => {
        Alerts.showLoading(false);
        _callback(response.data);
      })
      .catch((error) => {
        this.errorsHandler(error, () => this.addCard(title));
      });
  };

  getCards = (_callback) => {
    Alerts.showLoading();
    axios({
      method: "get",
      url: apiUrl + "/cards",
      headers: {
        "api-token": this.db.get("api-token"),
      },
    })
      .then((response) => {
        Alerts.showLoading(false);
        _callback(response.data);
      })
      .catch((error) => {
        this.errorsHandler(error, () => this.getCards(_callback));
      });
  };

  updateCardTitle = (cardId, cardTitle, _callback) => {
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
          this.updateCardTitle(cardTitle, cardId, _callback)
        );
      });
  };
}

export default Controller_Card;
