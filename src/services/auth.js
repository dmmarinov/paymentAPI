import OAuth2Server from "oauth2-server";
import { UnauthorizeError, TokenExpiredError } from '../services/errorHandler'

const oauth2 = new OAuth2Server({
    model: require("../data/models/authModel"),
    accessTokenLifetime: 3600,
    allowBearerTokensInQueryString: true
});

const generateToken = async(req, res, next) => {
  try {
    req.body.client_id      = "clientIdExample";
    req.body.client_secret  = "clientSecretExample";
    req.body.grant_type     = "password";

    const [request, response] = [new OAuth2Server.Request(req), new OAuth2Server.Response(res)];

    return await oauth2.token(request, response);
  } catch(err) {
    next(new UnauthorizeError());
  }
};

async function authenticateToken(req, res, next) {
  try {
    if (!req.headers['authorization']) {
      next(new UnauthorizeError());
      return;
    }

    const [request, response] = [new OAuth2Server.Request(req), new OAuth2Server.Response(res)];
    const token = await oauth2.authenticate(request, response);

    next();

  } catch (err) {
    next(new TokenExpiredError());
  }
}

export const auth = {
  generateToken,
  authenticateToken
};