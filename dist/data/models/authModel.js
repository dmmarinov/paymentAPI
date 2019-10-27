"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUser = exports.saveToken = exports.getClient = exports.getAccessToken = exports.dump = void 0;
// Model for OAuth2
var config = {
  clients: [{
    id: 'application',
    clientId: 'clientIdExample',
    clientSecret: 'clientSecretExample',
    grants: ['password', 'refresh_token']
  }],
  confidentialClients: [{
    clientId: 'clientIdExample',
    clientSecret: 'clientSecretExample'
  }],
  tokens: [],
  users: [{
    username: 'serious_business',
    password: 'suchPassw0rdSecure'
  }]
};
/*
 * Dump the memory storage content (for debug).
 */

var dump = function dump() {
  console.log('clients', config.clients);
  console.log('confidentialClients', config.confidentialClients);
  console.log('tokens', config.tokens);
  console.log('users', config.users);
};
/*
 * Methods used by all grant types.
 */


exports.dump = dump;

var getAccessToken = function getAccessToken(token) {
  var tokens = config.tokens.filter(function (savedToken) {
    return savedToken.accessToken === token;
  });
  return tokens[0];
};
/*
 * Client getter for OAuth2
 */


exports.getAccessToken = getAccessToken;

var getClient = function getClient(clientId, clientSecret) {
  var clients = config.clients.filter(function (client) {
    return client.clientId === clientId && client.clientSecret === clientSecret;
  });
  var confidentialClients = config.confidentialClients.filter(function (client) {
    return client.clientId === clientId && client.clientSecret === clientSecret;
  });
  return clients[0] || confidentialClients[0];
};
/*
 * Push token to config method
 */


exports.getClient = getClient;

var saveToken = function saveToken(token, client, user) {
  token.client = {
    id: client.clientId
  };
  token.user = {
    username: user.username
  };
  config.tokens.push(token);
  return token;
};
/*
 * Method used only by password grant type.
 */


exports.saveToken = saveToken;

var getUser = function getUser(username, password) {
  var users = config.users.filter(function (user) {
    return user.username === username && user.password === password;
  });
  return users[0];
};

exports.getUser = getUser;