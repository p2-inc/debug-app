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
	callOrgs();
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

async function callOrgs() {
  const url = keycloakUrl + "/realms/adminui/orgs";
  const resp = await fetch( url, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + keycloak.token
    },
    redirect: 'follow', // manual, *follow, error
  });
  console.log(resp.json()); // parses JSON response into native JavaScript objects
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

function show(id) {
  document.getElementById('welcome').style.display = 'none';
  document.getElementById('profile').style.display = 'none';
  document.getElementById('token').style.display = 'none';
  document.getElementById('idToken').style.display = 'none';
  document.getElementById(id).style.display = 'block';
}

