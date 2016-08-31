document.addEventListener('deviceready',function() {
    var lock = new Auth0Lock(AUTH0_CLIENT_ID, AUTH0_DOMAIN, {
      auth: {
        params: { scope: 'openid email' } //Details: https://auth0.com/docs/scopes
      }
    });

    var userProfile;

    $('.btn-login').click(function(e) {
      e.preventDefault();
      lock.show();
    });

    lock.on("authenticated", function(authResult) {
      lock.getProfile(authResult.idToken, function(error, profile) {
        if (error) {
          // Handle error
            console.log("There was an error");
            alert("There was an error logging in");
            return;
        }
            // Success calback

            // Save the JWT token.
            localStorage.setItem('userToken', token);

            // Save the profile
            userProfile = profile;

            $('.login-box').hide();
            $('.logged-in-box').show();
            $('.nickname').text(profile.nickname);
            $('.nickname').text(profile.name);
            $('.avatar').attr('src', profile.picture);
      });
    });

    $.ajaxSetup({
      'beforeSend': function(xhr) {
        if (localStorage.getItem('userToken')) {
          xhr.setRequestHeader('Authorization',
                'Bearer ' + localStorage.getItem('userToken'));
        }
      }
    });

    $('.btn-api').click(function(e) {
      // Just call your API here. The header will be sent
      $.ajax({
        url: 'http://auth0-nodejsapi-sample.herokuapp.com/secured/ping',
        method: 'GET'
      }).then(function(data, textStatus, jqXHR) {
        alert("The request to the secured enpoint was successfull");
      }, function() {
        alert("You need to download the server seed and start it to call this API");
      });
    });


}, false);
