import Controller from "../fetchers";

import Alerts from "../helpers/Alerts";
import { apiUrl } from "../config.js";
import axios from "axios";

class Controller_Auth extends Controller {
  /*!
    =========================================================
    * 
    =========================================================
    */

  login = (loginEmail, loginPass, _success, _error) => {
    Alerts.showLoading();

    axios({
      method: "post",
      url: apiUrl + "/login",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: {
        email: loginEmail,
        password: loginPass,
      },
    })
      .then((response) => {
        Alerts.showLoading(false);
        _success && _success(response.data);
      })
      .catch((error) => {
        this.errorsHandler(error, () => {
          this.login(loginEmail, loginPass, _success, _error);
        });
        _error && _error(error);
      });
  };
  /*!
    =========================================================
    * 
    =========================================================
    */

  singup = (signUpData, _success, _error) => {
    Alerts.showLoading();
    axios({
      method: "post",
      url: apiUrl + "/signup",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: signUpData,
    })
      .then((response) => {
        Alerts.showLoading(false);
        _success && _success(response.data);
      })
      .catch((error) => {
        this.errorsHandler(error, () => {
          this.singup(signUpData, _success, _error);
        });
        _error && _error(error);
      });
  };
}

export default Controller_Auth;
