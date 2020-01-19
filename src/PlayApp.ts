import { AADApp } from "./aadApp/AadApp";

class PlayApp {
  appList: Array<AADApp> = [];
  app?: AADApp;
  constructor(appList?: Array<AADApp>, defaultApp?: string) {
    if (!appList) {
      const appListStr = localStorage.getItem("appList");
      if (appListStr) {
        this.appList = JSON.parse(appListStr);
      }
    } else {
      this.appList = appList;
      this.app = appList[0];
    }
  }
  /**
   * token request params
   * let urlParams = window.location.search.replace("?", "").split("&");
   * if (!urlParams) {
   *   urlParams = window.location.hash.split("&");
   * }
   *
   */
  tokenRequestParam(urlParams: string[]): { [key: string]: string } {
    let p: { [key: string]: string } = {};
    if (urlParams && urlParams.length > 0) {
      p = urlParams.reduce((result: { [key: string]: string }, p: string) => {
        const keyValue = p.split("=");
        let key = keyValue[0];
        let value = decodeURIComponent(keyValue[1]);
        if (key === "code_challenge") {
          if (this.app && this.app.appParam.code_verifier) {
            result["code_verifier"] = this.app.appParam.code_verifier;
            //remove code_challenge
            return result;
          }
        }

        if (key === "code") {
          result["grant_type"] = "authorization_code";
        }

        result[key] = value;
        return result;
      }, {});
    }
    return p;
  }
}

export { PlayApp };
