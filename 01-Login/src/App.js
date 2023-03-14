var env = require('../env');
const { auth0, callbackUrl } = require('./auth0');

function getBySelector(arg) {
  return document.querySelector(arg);
}

function getById(id) {
  return document.getElementById(id);
}

function openInBrowser(url) {
  SafariViewController.isAvailable(function (available) {
    if (available) {
      SafariViewController.show({
        url: url
      },
      function(result) {},
      function(msg) {
        console.log("KO: " + JSON.stringify(msg));
      });
    } else {
      window.open(url, '_system');
    }
  })
}

function App() {
  this.login = this.login.bind(this);
  this.logout = this.logout.bind(this);
}

App.prototype.state = {
  accessToken: false,
  currentRoute: '/',
  routes: {
    '/': {
      id: 'loading',
      onMount: function(page) {
        auth0.isAuthenticated().then(isLoggedIn => {
          if (isLoggedIn) return this.redirectTo('/home');

          return this.redirectTo('/login');
        });
      }
    },
    '/login': {
      id: 'login',
      onMount: function(page) {
        auth0.isAuthenticated().then(isLoggedIn => {
          if (isLoggedIn) return this.redirectTo('/home');

          var loginButton = page.querySelector('.btn-login');
          loginButton.addEventListener('click', this.login);
        });
      }
    },
    '/home': {
      id: 'profile',
      onMount: function(page) {
        auth0.isAuthenticated().then(isLoggedIn => {
          if (!isLoggedIn) return this.redirectTo('/login');

          var logoutButton = page.querySelector('.btn-logout');
          var avatar = page.querySelector('#avatar');
          var profileCodeContainer = page.querySelector('.profile-json');
          logoutButton.addEventListener('click', this.logout);
          this.loadProfile(function(err, profile) {
            if (err) {
              profileCodeContainer.textContent = 'Error ' + err.message;
              return;
            }
            profileCodeContainer.textContent = JSON.stringify(profile, null, 4);
            avatar.src = profile.picture;
          });
        });
      }
    }
  }
};

App.prototype.run = function(id) {
  this.container = getBySelector(id);
  this.resumeApp();
};

App.prototype.loadProfile = function(cb) {
  auth0.getUser()
    .then(user => cb(undefined, user))
    .catch(err => cb(err));
};

App.prototype.login = function(e) {
  e.target.disabled = true;
  auth0.loginWithRedirect({
    openUrl: url => {
      try {
        openInBrowser(url);
      } catch (err) {
        console.log(err);
        SafariViewController.hide();
      } finally {
        e.target.disabled = false;
      }
    }
  });
};

App.prototype.logout = function(e) {
  auth0.logout({
    logoutParams: { returnTo: callbackUrl },
    openUrl: openInBrowser
  })
  .then(() => this.state.accessToken = null)
  .finally(() => this.render());
};

App.prototype.redirectTo = function(route) {
  if (!this.state.routes[route]) {
    throw new Error('Unknown route ' + route + '.');
  }
  this.state.currentRoute = route;
  this.render();
};

App.prototype.resumeApp = function() {
  auth0.isAuthenticated().then((isLoggedIn) => {
    if (!isLoggedIn) return;

    return auth0.getTokenSilently({
      authorizationParams: { redirect_uri: window.location.origin },
    })
    .then(accessToken => this.state.accessToken = accessToken);
  })
  .finally(() => this.render());
};

App.prototype.render = function() {
  var currRoute = this.state.routes[this.state.currentRoute];
  var currRouteEl = getById(currRoute.id);
  var element = document.importNode(currRouteEl.content, true);
  this.container.innerHTML = '';
  this.container.appendChild(element);
  currRoute.onMount.call(this, this.container);
};

module.exports = App;
