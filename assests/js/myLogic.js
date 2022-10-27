var keycloak = new Keycloak();

function initKeycloak() {
    keycloak.init({onLoad: 'login-required'}).then(function() {
        constructTableRows(keycloak.idTokenParsed);
        pasteToken(keycloak.token);
        getRoles(keycloak.realmAccess);
        console.log(keycloak);
        //alert(JSON.stringify(keycloak.tokenParsed)); 
    }).catch(function() {
        alert('failed to initialize');
    });
}

//Funcion creada para obtener los roles
function getRoles(keycloakRoles){
    console.log(keycloakRoles);
    //alert(keycloakRoles.roles[4]);
}

function constructTableRows(keycloakToken) {
    document.getElementById('row-username').innerHTML = keycloakToken.preferred_username;
    document.getElementById('row-firstName').innerHTML = keycloakToken.given_name;
    document.getElementById('row-lastName').innerHTML = keycloakToken.family_name;
    document.getElementById('row-name').innerHTML = keycloakToken.name;
    document.getElementById('row-email').innerHTML = keycloakToken.email;
    console.log(keycloakToken);
}

function pasteToken(token){
    document.getElementById('ta-token').value = token;
    document.getElementById('ta-refreshToken').value = keycloak.refreshToken;
}

var refreshToken = function() {
    keycloak.updateToken(-1)
    .then(function(){
        document.getElementById('ta-token').value = keycloak.token;
        document.getElementById('ta-refreshToken').value = keycloak.refreshToken;
    });
}

var logout = function() {
    keycloak.logout({"redirectUri":"http://localhost:80/keycloak/logout.html"});
}