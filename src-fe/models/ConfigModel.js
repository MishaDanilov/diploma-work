let customConfig = {
    server: 'localhost',
    authentication: {
        type: 'default',
        options: {
            userName: 'userName',
            password: 'password'
        }
    },
    options: {
        port: 1433,
        database: 'construction_company',
        trustServerCertificate: true,
        rowCollectionOnDone: true,
        rowCollectionOnRequestCompletion: true
    }
};

let adminConfig = {
    server: 'localhost',
    authentication: {
        type: 'default',
        options: {
            userName: 'sa',
            password: 'root'
        }
    },
    options: {
        port: 1433,
        database: 'construction_company',
        trustServerCertificate: true,
        rowCollectionOnDone: true,
        rowCollectionOnRequestCompletion: true
    }
};
module.exports.customConfig = customConfig
module.exports.adminConfig = adminConfig