const express =require('express')
const pool=require('./pool')
const dotenv=require('dotenv')

dotenv.config()
const app=express();
app.use(express.urlencoded({extended:false}))

app.post('/create',(req,res)=>{
    let stat={}
    let userDetails=JSON.parse(JSON.stringify(req.body))

    if (Object.values(userDetails).length===2) {

        if (req.body.username && req.body.mobile) {
            console.log(userDetails);
           
            if(!RegExp(/^[6-9]{1}[0-9]{9}$/).test(req.body.mobile)){
                stat.error="Error. Mobile invalid"
                res.send(stat);
                return;
            }
            
            pool.getConnection((err1,conn)=>{
                if(err1){
                    stat.error="Error. Try again"
                    res.send(stat)
                    throw err;
                }
                conn.query(`select name from istreamo where name=?`,req.body.username,(err2,results)=>{
                    // conn.release();
                    if(err2){
                        stat.error="Error. Could not register"
                        res.send(stat)
                        throw err2;
                    }
                    if (results.length!=0) {
                        stat.error="Error. User Already Exists"
                        res.send(stat)
                        return;
                    }else{
                        let sql=`insert into ${process.env.table} (${process.env.Col1},${process.env.Col2}) values (?,?)`;
                        conn.query(sql,[req.body.username,req.body.mobile],(error)=>{
                            conn.release()
                            if(error){
                                stat.error="Error. Could not register"
                                res.send(stat)
                                throw error;
                            }else{
                                stat.msg=`User ${req.body.username} registered.`
                                res.send(stat)
                            }
                        })
                    }
                    
                })
            })
        } else {
            res.send({stat:"Error. Invalid arguments"})
        }

    } else if(!req.body.username || !req.body.mobile){
        res.send({stat:"Error. Expected 2 args. Recieved "+Object.values(userDetails).length})

    }else{
        res.send({stat:"Error. Invalid arguments"})
    }
    
    
})

app.get('/users',(req,res)=>{
    let stat={}
    pool.getConnection((err1,conn)=>{
        if(err1){
            stat.error="Error. Try again"
            res.send(stat)
            throw err;
        }
        conn.query(`select ${process.env.Col1} from ${process.env.table}`,(err2,results)=>{
            conn.release();
            if(err2){
                stat.error="Error. Try again"
                res.send(stat)
                throw err;
            }
            res.send(JSON.parse(JSON.stringify(results)))
            
            
        })
    })
})

app.listen(5655,()=>{
    console.log("running on 5655");
})

