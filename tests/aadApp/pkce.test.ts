import {
  CODE_CHALLENGE_METHOD,
  generateCodeChallenge
} from "../../src/aadApp/pkce";

describe("code challenge", () => {
  it("sha256 challenge", () => {
    expect(
      generateCodeChallenge(
        "dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk",
        CODE_CHALLENGE_METHOD.S256
      )
    ).toBe("E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM");
  });
});
