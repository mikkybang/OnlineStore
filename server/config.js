/**
 * This file contains the configuration for the SimpleOnlineStoreServer
 */

let config = {};

switch (process.env.NODE_ENV.trim()) {
    case 'production':
        config = {
            port: process.env.PORT,
            key: process.env.KEY
        };
        break;
    case 'test':
        console.log('test');
        config = {
            port: 5000,
            database_uri: 'mongodb://localhost:27017/SimpleOnlineStore',
            key: 'jpjk;lokjda221'
        };
        break;
}

module.exports = config;