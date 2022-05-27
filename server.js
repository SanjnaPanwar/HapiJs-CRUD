const conn = require("./dbConnetction");
const Hapi = require("@hapi/hapi");
const Joi = require("@hapi/joi")
const server = new Hapi.Server({
    host: 'localhost',
    port: 4010
});

// GET API
server.route({
    method: 'GET',
    path: '/get/users',
    handler: (request, h) => {
        const promise = new Promise((resolve, reject) => {
            conn.query('SELECT * FROM People', function (err, results, fields) {
                if (err) {
                    reject(err);
                } else {
                    const response = h.response(results)
                    resolve(response);
                }
            });
        });
        return promise;
    }
});

// GET by ID
server.route({
    method: 'GET',
    path: '/user/{Id}',
    handler: (request, h) => {
        const promise = new Promise((resolve, reject) => {
            var sql='SELECT * FROM People WHERE Id ="'+request.params.Id+'"';
            conn.query(sql, function (err, results, fields) {
                if (err) {
                    reject(err);
                } else {
                    const response = h.response(results)
                    resolve(response);
                }
            });
        });
        return promise;
    }
});


// POST API
server.route({
    method: 'POST',
    path: '/signup',
    handler: (request, h) => {
        const Name = request.payload.Name;
        const Email = request.payload.Email;
        const Password = request.payload.Password;
        const promise = new Promise((resolve, reject) => {
            conn.query('INSERT INTO People (Name,Email,Password) VALUES("' + Name + '","' + Email + '","' + Password + '")', (err, results, fields) => {
                if (err) {
                    return reject(err);
                } else {
                    const response = h.response(results)
                    resolve(response);
                }
            })
        });
        return promise;
    }
});


//  PUT API
server.route({
    method: 'PUT',
    path: '/update/{Id}',
    handler: (request, h) => {
        const promise = new Promise((resolve, reject) => {
            var sql="UPDATE People SET Name='"+request.payload.Name+"',Email='"+request.payload.Email+"',Password='"+request.payload.Password+"' WHERE Id = '"+request.params.Id+"'";
            conn.query(sql,(err, results, fields) => {
                if (err) {
                    return reject(err);
                } else {
                    const response = h.response(results)
                    resolve(response);
                }
            })
        });
        return promise;
    }
});

// DELETE API
server.route({
    method: 'DELETE',
    path: '/delete/{Email}',
    handler: (request, h) => {
        const promise = new Promise((resolve, reject) => {
            var sql="DELETE FROM People WHERE Email = '"+request.params.Email+"'";
            conn.query(sql,(err, results, fields) => {
                if (err) {
                    return reject(err);
                } else {
                    const response = h.response(results)
                    resolve(response);
                }
            })
        });
        return promise;
    }
});

server.start();
console.log('Server is runnig at :', server.info.uri);
