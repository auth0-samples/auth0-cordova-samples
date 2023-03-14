const { Auth0Client } = require('@auth0/auth0-spa-js');

const env = require('../env');

const callbackUrl = `${env.PACKAGE_ID}://${env.AUTH0_DOMAIN}/cordova/${env.PACKAGE_ID}/callback`;
const auth0 = new Auth0Client({
    domain: env.AUTH0_DOMAIN,
    clientId: env.AUTH0_CLIENT_ID,
    useRefreshTokens: true,
    cacheLocation: 'localstorage',
    authorizationParams: {
      redirect_uri: callbackUrl
    }
  });

module.exports = { auth0, callbackUrl };
