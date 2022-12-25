
async function getConnection(){
    if(global.connection && global.connection.state == "disconnected"){
        return global.connection;
    }
    const mysql = require("mysql2/promise");
    const con = await mysql.createConnection('mysql://root:Legolas@localhost:3306/agendactt');
    global.connection = con;
    return global.connection;
}

module.exports = {getConnection};