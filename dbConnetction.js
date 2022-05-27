
const mysql = require("mysql");
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '@Laddu123',
    database: 'Hapi'
});

conn.connect((err)=>{
    if(err){
        console.log('[mysql error]'+ err.stack);
        return;
    }
    console.log("database connected..");
});

module.exports=conn;