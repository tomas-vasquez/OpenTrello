import Controller from ".././fetchers";

import Alerts from "helpers/Alerts";
import { apiLinks, apiUrl } from "../site.config.js";
import axios from "axios";

class Controller_Auth extends Controller {
  constructor() {
    super();
  }

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
        pass: loginPass,
      },
    })
      .then((response) => {
        Alerts.showLoading(false);
        Alerts._success && _success(response.data);
      })
      .catch((error) => {
        Alerts.showErrorUnknow(() => {
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

  singup = (signUpEmail, signUpPass, signUpPassConf, _success, _error) => {
    Alerts.showLoading();
    axios({
      method: "post",
      url: apiUrl + "/signup",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: {
        email: signUpEmail,
        pass: signUpPass,
        passConfirm: signUpPassConf,
      },
    })
      .then((response) => {
        Alerts.showLoading(false);
        _success && _success(response.data);
      })
      .catch((error) => {
        Alerts.showErrorUnknow();
        _error && _error(error);
      });
  };
}

export default Controller_Auth;
