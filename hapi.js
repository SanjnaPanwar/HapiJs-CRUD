const Hapi = require("@hapi/hapi");
const Joi = require("joi");

const server = new Hapi.Server({ host: "localhost", port: 3000 });
server.route({
    method: "GET",
    path: "/",
    handler: (request, h) => {
       return h.response("Hello World");
    }
});

server.route({
    method:'GET',
    path:'/data/{userName}',
    handler:(request,h)=>{
        var account={}
        if (request.params.userName=="sanjna") {
            account={
                userName:"sanjna",
                password:"@Sanju@123",
                insta:"_sanjna_panwar_",
                intrest:"Riding"
            }            
        }
        // console.log(account);
        return h.response(account)
    }
});


// server.route({
//     method:'POST',
//     path:'/account',
//     options:{
//         payload:{
//             output:"stream",
//             parse:true,
//             allow:"multipart/Body"
//         }
//     },
//     handler:(request,h)=>{
//         const userName=request.payload.userName;
//         console.log(userName);
//         return h.response(userName);
//     }
// });   


// server.route({
// 	method: 'POST',
// 	path: '/api/note',
// 	handler: async (request, h) => {
// 		let info = request.payload;
// 		console.log(info);
// 		let newInfo = new Note(info);
// 		await newInfo.save((err, task) => {
// 			if (err) return console.log(err);
// 		})
// 		return h.response("Success");
// 	}
// });


server.route({
    method: 'POST',
    path: '/post',
    handler: (request, h) => {
        const userName=request.payload.userName;
        console.log(userName);
        return h.response(userName)
    },
    options: {
        validate: {
            payload: Joi.object({
                userName: Joi.string().max(100)
            })
        }
    }
});


server.route({
    method: "PUT",
    path: "/account/{username}",
    handler: (request, h) => {
       return h.response(request.payload);
    }
});

server.start(error => {
    if(error) {
        throw error;
    }
});
console.log("Listening at " + server.info.uri);
