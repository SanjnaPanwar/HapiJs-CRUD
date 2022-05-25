const Hapi = require("hapi");
const server = new Hapi.Server({
    host: 'localhost',
    port: 4010
});

server.route({
    method: 'GET',
    path: '/hello',
    handler: function (req, rep) {
        return ("Hello from Sanjna :)")
    }
});

server.start();
console.log('Server is runnig at :', server.info.uri);



// const Hapi = require('hapi');

// const init = async () => {

//     const server = Hapi.Server({
//         port: 3000,
//         host: 'localhost'
//     });
//     server.route({
//             method:'GET',
//             path:'/hello',
//             handler:function(request,reply){
//                 return("Hello from Sanjna :)");
//             }
//         });
//     await server.start();
//     console.log('Server running on %s', server.info.uri);
// };

// process.on('unhandledRejection', (err) => {

//     console.log(err);
//     process.exit(1);
// });

// init();