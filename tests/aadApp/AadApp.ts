import {
  AADApp,
  AADAppParam,
  ResponseTypeEnum,
  CODE_CHALLENGE_METHOD
} from "@/aadApp/AadApp";

import testParam from "./testParam";

describe("Authorize Uri の生成", () => {
  it("for Single tenat App", () => {
    const app = new AADApp(testParam());
    expect(app.authorizeUri).toBe(
      "https://login.microsoftonline.com/whdv.onmicrosoft.com/oauth2/v2.0/authorize?client_id=eff64ce9-b445-4657-ac0b-378544e9d0bd&redirect_uri=https%3A%2F%2Fwatahani.github.io%2Faad-playapp%2F&response_type=code&scope=openid"
    );
  });
  it("for multi tenat App", () => {
    const appParam = testParam();
    appParam.appType = "common";
    const app = new AADApp(appParam);
    expect(app.authorizeUri).toBe(
      "https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=eff64ce9-b445-4657-ac0b-378544e9d0bd&redirect_uri=https%3A%2F%2Fwatahani.github.io%2Faad-playapp%2F&response_type=code&scope=openid"
    );
  });
  it("multi scopes", () => {
    const appParam = testParam();
    appParam.scope = ["openid", "profile", "email"];
    const app = new AADApp(appParam);
    expect(app.authorizeUri).toBe(
      "https://login.microsoftonline.com/whdv.onmicrosoft.com/oauth2/v2.0/authorize?client_id=eff64ce9-b445-4657-ac0b-378544e9d0bd&redirect_uri=https%3A%2F%2Fwatahani.github.io%2Faad-playapp%2F&response_type=code&scope=openid%20profile%20email"
    );
  });
  it("response_mode=query", () => {
    const appParam = testParam();
    appParam.response_mode = "query";
    appParam.nonce = "1234";
    const app = new AADApp(appParam);
    expect(app.authorizeUri).toBe(
      "https://login.microsoftonline.com/whdv.onmicrosoft.com/oauth2/v2.0/authorize?client_id=eff64ce9-b445-4657-ac0b-378544e9d0bd&nonce=1234&redirect_uri=https%3A%2F%2Fwatahani.github.io%2Faad-playapp%2F&response_mode=query&response_type=code&scope=openid"
    );
  });

  it("v1", () => {
    const appParam = testParam();
    appParam.apiVersion = 1;
    const app = new AADApp(appParam);
    expect(app.authorizeUri).toBe(
      "https://login.microsoftonline.com/whdv.onmicrosoft.com/oauth2/authorize?client_id=eff64ce9-b445-4657-ac0b-378544e9d0bd&redirect_uri=https%3A%2F%2Fwatahani.github.io%2Faad-playapp%2F&response_type=code&scope=openid"
    );
  });

  it("response_mode=fragment", () => {
    const appParam = testParam();
    appParam.response_mode = "fragment";
    const app = new AADApp(appParam);
    expect(app.authorizeUri).toBe(
      "https://login.microsoftonline.com/whdv.onmicrosoft.com/oauth2/v2.0/authorize?client_id=eff64ce9-b445-4657-ac0b-378544e9d0bd&redirect_uri=https%3A%2F%2Fwatahani.github.io%2Faad-playapp%2F&response_mode=fragment&response_type=code&scope=openid"
    );
  });

  it("response_type=code id_token", () => {
    const appParam = testParam();
    appParam.response_type = [ResponseTypeEnum.CODE, ResponseTypeEnum.IDTOKEN];
    appParam.nonce = "1234";
    const app = new AADApp(appParam);
    expect(app.authorizeUri).toBe(
      "https://login.microsoftonline.com/whdv.onmicrosoft.com/oauth2/v2.0/authorize?client_id=eff64ce9-b445-4657-ac0b-378544e9d0bd&nonce=1234&redirect_uri=https%3A%2F%2Fwatahani.github.io%2Faad-playapp%2F&response_type=code%20id_token&scope=openid"
    );
  });

  it("state=state_param 👮‍♂️", () => {
    const appParam = testParam();
    appParam.response_type = [ResponseTypeEnum.CODE, ResponseTypeEnum.IDTOKEN];
    appParam.nonce = "1234";
    const app = new AADApp(appParam);
    expect(app.authorizeUri).toBe(
      "https://login.microsoftonline.com/whdv.onmicrosoft.com/oauth2/v2.0/authorize?client_id=eff64ce9-b445-4657-ac0b-378544e9d0bd&nonce=1234&redirect_uri=https%3A%2F%2Fwatahani.github.io%2Faad-playapp%2F&response_type=code%20id_token&scope=openid"
    );
  });
});
