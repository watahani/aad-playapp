const crypto = require("crypto");

enum CODE_CHALLENGE_METHOD {
  PLAIN = "plain",
  S256 = "S256"
}

const generateCodeChallenge = (
  codeVerifier: string,
  codeChallengeMethod: CODE_CHALLENGE_METHOD
) => {
  switch (codeChallengeMethod) {
    case CODE_CHALLENGE_METHOD.PLAIN:
      return codeVerifier;
    case CODE_CHALLENGE_METHOD.S256:
      return crypto
        .createHash("sha256")
        .update(codeVerifier, "ascii")
        .digest("base64")
        .replace("=", "")
        .replace("+", "-")
        .replace("/", "_");
    default:
      return codeVerifier;
  }
};
export { CODE_CHALLENGE_METHOD, generateCodeChallenge };
