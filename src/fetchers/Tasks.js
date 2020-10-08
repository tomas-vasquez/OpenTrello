import Controller from ".././fetchers";

import Alerts from "helpers/Alerts";
import { apiLinks, apiUrl } from "../site.config";
import axios from "axios";

class Controller_Tasks extends Controller {
  constructor() {
    super();
  }

  /*!
    =========================================================
    * 
    =========================================================
    */

  unsafeLogout = () => {
    Alerts.showLoading();

    axios({
      method: "get",
      url: apiUrl + "/logout",
      headers: {
        "api-token": this.db.get("api-token"),
      },
    })
      .then((response) => {
        Alerts.showSuccess("", "Sesión cerrada ");
        this.clearData();
      })
      .catch((error) => {
        this.errorsHandler(error, () => this.unsafeLogout());
      });
  };
}

export default Controller_Tasks;
