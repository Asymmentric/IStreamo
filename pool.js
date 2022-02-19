const mysql=require('mysql');

let pool=mysql.createPool({
    connectionLimit:100,
    host:'localhost',
    user:'root',
    password:'1234',
    database:'testooo'
})

module.exports=pool;