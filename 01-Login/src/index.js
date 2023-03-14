const { auth0 } = require('./auth0');
var App = require('./App');

// In a real world app, you should replace this with React
// or Angular or jQuery.
function main() {
  var app = new App();

  auth0.checkSession({
    authorizationParams: { redirect_uri: window.location.origin },
  })
  .finally(() => app.run('#app'));

  window.handleOpenURL = url => {
    if (url.includes('state') && (url.includes('code') || url.includes('error'))) {
      auth0.handleRedirectCallback(url).finally(() => app.resumeApp());
    }
    SafariViewController.hide();
  };
}

document.addEventListener('deviceready', main);
