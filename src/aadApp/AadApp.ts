import { baseUri, endpoints } from "./const";
import { CODE_CHALLENGE_METHOD, generateCodeChallenge } from "./pkce";

const allowedAuthorizeRequestParams = [
  "tenant",
  "client_id",
  "response_type",
  "redirect_uri",
  "response_mode",
  "state",
  "resource",
  "scope",
  "prompt",
  "login_hint",
  "domain_hint",
  "code_challenge_method",
  "code_challenge",
  "nonce"
];

interface AADAppParam {
  display_name?: string;
  tenant_id?: string;
  client_id: string;
  client_secret?: string;
  appType: "common" | "organizations" | "consumers" | "tenantOnly";
  response_type: ResponseTypeEnum[];
  scope: string[];
  redirectUris: Array<{
    isDefault: boolean;
    uri: string;
  }>;
  tokenRequestParam?: { [key: string]: string }[];
  apiVersion: 1 | 2;
  nonce?: string;
  state?: string;
  code_verifier?: string;
  response_mode?: "fragment" | "query" | "form_post";
  prompt?: "login" | "select_account" | "consent" | "admin_consent";
  code_challenge_method?: CODE_CHALLENGE_METHOD;
  [key: string]: any;
}
class AADApp {
  appParam: AADAppParam;
  endPoints: { [key: string]: string };
  constructor(appParam: AADAppParam) {
    this.appParam = appParam;
    //calc endpoints
    this.endPoints = this.getEndPoints();
  }
  get authorizeUri() {
    let authorizePrams = [];
    console.debug(this.appParam);
    for (let [key, value] of Object.entries(this.appParam)) {
      if (!allowedAuthorizeRequestParams.includes(key)) {
        if (key === "code_verifier" && this.appParam.code_challenge_method) {
          const codeChallenge = generateCodeChallenge(
            value,
            this.appParam.code_challenge_method
          );
          authorizePrams.push(`code_challenge=${codeChallenge}`);
        }
        console.debug(`${key} is not allowed in authorize request param.`);
        continue;
      }
      if (Array.isArray(value)) {
        value = value.join(" ");
      }
      console.debug(`${key}: ${value}`);
      const k = encodeURIComponent(key);
      const v = encodeURIComponent(value);
      console.debug(`append to url params: ${k}=${v}`);
      authorizePrams.push(`${k}=${v}`);
    }
    const redirectUri = this.appParam.redirectUris.filter(u => u.isDefault)
      ? this.appParam.redirectUris.filter(u => u.isDefault).length > 0
        ? encodeURIComponent(
            this.appParam.redirectUris.filter(u => u.isDefault)[0].uri
          )
        : null
      : null;
    if (redirectUri) {
      authorizePrams.push(`redirect_uri=${redirectUri}`);
    }
    return this.endPoints.authorize + "?" + authorizePrams.sort().join("&");
  }
  private getEndPoints() {
    var b = baseUri;
    if (this.appParam.appType !== "tenantOnly") {
      b += this.appParam.appType;
    } else {
      b += this.appParam.tenant_id;
    }
    b += "/";
    b += "oauth2/";
    if (this.appParam.apiVersion === 2) {
      b += "v2.0/";
    }
    return endpoints.reduce((result: { [key: string]: string }, ep) => {
      result[ep] = b + ep;
      return result;
    }, {});
  }
}

enum ResponseTypeEnum {
  TOKEN = "token",
  IDTOKEN = "id_token",
  CODE = "code"
}

export { AADApp, AADAppParam, ResponseTypeEnum, CODE_CHALLENGE_METHOD };
