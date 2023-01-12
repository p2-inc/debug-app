let keycloakUrl = "https://app.phasetwo.io/auth"

var script = document.createElement('script');
script.type = 'text/javascript';
script.src = keycloakUrl+"/js/keycloak.js";

document.getElementsByTagName('head')[0].appendChild(script);

window.onload = function () {

  window.keycloak = new Keycloak();

  keycloak.init({onLoad: 'login-required', scope:'openid email profile', checkLoginIframe: false, checkLoginIframeInterval: 1, pkceMethod: 'S256'})
    .success(function () {

      if (keycloak.authenticated) {
        showProfile();
      } else {
        welcome();
      }

      document.body.style.display = 'block';
    });

  keycloak.onAuthLogout = welcome;
};

function welcome() {
  show('welcome');
}

function callBackend() {
  var req = new XMLHttpRequest();
  req.open('GET', 'http://localhost:3002/secured', true);
  req.setRequestHeader('Accept', 'application/json');
  req.setRequestHeader('Authorization', 'Bearer ' + keycloak.token);
  req.onreadystatechange = function() {
    if (req.readyState === 4) {
      alert(req.responseText);
    }
  }
  req.send();
}

function showProfile() {

  if (keycloak.tokenParsed['given_name']) {
    document.getElementById('firstName').innerHTML = keycloak.tokenParsed['given_name'];
  }
  if (keycloak.tokenParsed['family_name']) {
    document.getElementById('lastName').innerHTML = keycloak.tokenParsed['family_name'];
  }
  if (keycloak.tokenParsed['preferred_username']) {
    document.getElementById('username').innerHTML = keycloak.tokenParsed['preferred_username'];
  }
  if (keycloak.tokenParsed['email']) {
    document.getElementById('email').innerHTML = keycloak.tokenParsed['email'];
  }

  show('profile');
}

function showToken() {
  console.log(keycloak.token)
  document.getElementById('token-content').innerHTML = JSON.stringify(keycloak.tokenParsed, null, '    ');
  show('token');
}

function showIdToken() {
  console.log(keycloak.token)
  document.getElementById('token-content').innerHTML = JSON.stringify(keycloak.idTokenParsed, null, '    ');
  show('token');
}

function showUserinfo() {
  keycloak.loadUserInfo()
    .then(function(profile) {
      document.getElementById('token-content').innerHTML = JSON.stringify(profile, null, '    ');
      show('token');
    }).catch(function() {
      alert('Failed to load user profile');
    });
}

function show(id) {
  document.getElementById('welcome').style.display = 'none';
  document.getElementById('profile').style.display = 'none';
  document.getElementById('token').style.display = 'none';
  document.getElementById(id).style.display = 'block';
}

