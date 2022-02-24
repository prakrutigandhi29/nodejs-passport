const mysql=require('mysql');
const conn=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'password',
    database:'test'
});
conn.connect((err)=>{
    if(err){
        console.log("error");
    }
    else{
        console.log("connected");
    }
})
module.exports=conn;