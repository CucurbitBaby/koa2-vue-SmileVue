const mongoose = require('mongoose')
const db = "mongodb://localhost/smail-vue"
const glob = require('glob')
const {resolve} = require('path')



exports.initSchemas = ()=>{
    glob.sync(resolve(__dirname,'./schema','**/*.js')).forEach(require)
}

exports.connect = ()=>{
    //连接数据库
    mongoose.connect(db)
    let maxConnectTimes = 0;

    return new Promise((resolve,reject)=>{

        //增加数据库监听事件
        mongoose.connection.on('disconnected',()=>{
            console.log('***************数据库断开***************')
            if(maxConnectTimes<=3){
                maxConnectTimes++
                mongoose.connect(db)
            }else{
                reject()
                throw new Error('数据库异常,程序无法搞定,请人为处理..')
            }
            
        })
        mongoose.connection.on('error',(err)=>{
            console.log('***************数据库错误')
            if(maxConnectTimes<=3){
                maxConnectTimes++
                mongoose.connect(db)
            }else{
                reject(err)
                throw new Error('数据库异常,程序无法搞定,请人为处理..')
            }
        })
        //链接打开时
        mongoose.connection.on('open',()=>{
            console.log('MongoDB connected successfully')
            resolve()
        })
        

    })


}