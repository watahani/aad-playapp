import testParam from "./aadApp/testParam";
import { PlayApp } from "@/PlayApp";
import { AADApp } from "@/aadApp/AadApp";
import { CODE_CHALLENGE_METHOD } from "@/aadApp/pkce";

describe("aad play app", () => {
  it("code params", () => {
    const appParam = testParam();
    const aadApp = new PlayApp([new AADApp(appParam)]);
    const params = aadApp.tokenRequestParam([
      "code=code_here",
      "session_state=session_state_here"
    ]);
    console.debug(params);
    expect(params["code"]).toBe("code_here");
    expect(params["session_state"]).toBe("session_state_here");
    expect(params["grant_type"]).toContain("authorization_code");
  });

  it("code params", () => {
    const appParam = testParam();
    const aadApp = new PlayApp([new AADApp(appParam)]);
    const params = aadApp.tokenRequestParam([
      "code=code_here",
      "session_state=session_state_here"
    ]);
    expect(params["code"]).toBe("code_here");
    expect(params["session_state"]).toBe("session_state_here");
    expect(params["grant_type"]).toContain("authorization_code");
  });

  it("code challenge", () => {
    const appParam = testParam();
    appParam.authorizeRequestParams.code_verifier =
      "dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk";
    appParam.authorizeRequestParams.code_challenge_method =
      CODE_CHALLENGE_METHOD.S256;
    const app1 = new AADApp(appParam);
    const aadApp = new PlayApp([app1]);

    expect(app1.authorizeUri).toBe(
      "https://login.microsoftonline.com/whdv.onmicrosoft.com/oauth2/v2.0/authorize?client_id=eff64ce9-b445-4657-ac0b-378544e9d0bd&code_challenge=E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM&code_challenge_method=S256&redirect_uri=https%3A%2F%2Fwatahani.github.io%2Faad-playapp%2F&response_type=code&scope=openid"
    );
    const params = aadApp.tokenRequestParam([
      "code=code_here",
      "session_state=session_state_here",
      "code_challenge=E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM"
    ]);
    expect(params["code"]).toBe("code_here");
    expect(params["session_state"]).toBe("session_state_here");
    expect(params["grant_type"]).toContain("authorization_code");
    expect(params["code_verifier"]).toBe(
      "dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk"
    );
    //code_challenge should be removed
    expect(params["code_challenge"]).toBeUndefined();
  });
});
