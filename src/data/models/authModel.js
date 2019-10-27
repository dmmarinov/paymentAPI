// Model for OAuth2
const config = {
    clients: [{
        id: 'application',
        clientId: 'clientIdExample',
        clientSecret: 'clientSecretExample',
        grants: [
            'password',
            'refresh_token'
        ]
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
export const dump = () => {
    console.log('clients', config.clients);
    console.log('confidentialClients', config.confidentialClients);
    console.log('tokens', config.tokens);
    console.log('users', config.users);
};

/*
 * Methods used by all grant types.
 */
export const getAccessToken = (token) => {
    const tokens = config.tokens.filter(savedToken => (savedToken.accessToken === token));

    return tokens[0];
};

/*
 * Client getter for OAuth2
 */
export const getClient = (clientId, clientSecret) => {
    const clients = config.clients.filter(client => (client.clientId === clientId && client.clientSecret === clientSecret));
    const confidentialClients = config.confidentialClients.filter(client => {
        return client.clientId === clientId && client.clientSecret === clientSecret;
    });

    return clients[0] || confidentialClients[0];
};

/*
 * Push token to config method
 */
export const saveToken = (token, client, user) => {
    token.client = { id: client.clientId };
    token.user = { username: user.username };

    config.tokens.push(token);

    return token;
};

/*
 * Method used only by password grant type.
 */
export const getUser = (username, password) => {
    const users = config.users.filter(user => ((user.username === username) && (user.password === password)));

    return users[0];
};