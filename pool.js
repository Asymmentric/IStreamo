const mysql=require('mysql');
const dotenv=require('dotenv')

dotenv.config()
let pool=mysql.createPool({
    connectionLimit:10,
    host:'process.env.DB_HOST',
    user:'process.env.DB_USER',
    password:'process.env.DB_PWD',
    database:'process.env.DB_NAME'
})

module.exports=pool;
