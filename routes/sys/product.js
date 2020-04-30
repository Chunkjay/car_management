var express = require('express');
var router = express.Router();
var { getStoreDB } = require('../resouce/mongo')
var ObjectId = require('mongodb').ObjectID//与数据库默认的 _id 进行匹配

router.post('/',function(req,res,next){//此接口作用，判断传入的 username 和 userid 以及 cur 进行数据库查询，返回查到的十条数据和总页数。
  var username = req.body.username
  var userid = req.body.userid
  var cur = req.body.cur
  // console.log(username,userid)
  if(!username&& !userid){
    getStoreDB(function(store){
      store.collection('goods').find({}).toArray(function(err,result){
        // console.log(result)
        if(err){//数据库查询出错
          res.send({
            status:10001,
            msg:'查询数据库出错，请联系管理员！！！'
          })
          return
        }
        if(result.length === 0){//未查到
          res.send({
            status:10002,
            msg:'未查到用户信息！！'
          })
          return
        }else{
          var n = Math.floor(result.length/10)
            var y = result.length%10
            if(y !== 0){
              n = n+1
              // console.log(n)
            }
            res.send({
              status:10000,
              data:{
                n:n,
                userList:result.slice((cur-1)*10,cur*10)
              }
            })
        }
      })
    })
  }else if(!username && userid){
    try {
      getStoreDB(function(store){
        store.collection('goods').find({_id:new ObjectId(userid)}).toArray(function(err,result){
          // console.log(result)
          if(err){//数据库查询出错
            res.send({
              status:10001,
              msg:'查询数据库出错，请联系管理员！！！'
            })
            return
          }
          if(result.length === 0){//未查到
            res.send({
              status:10002,
              msg:'未查到用户信息！！'
            })
            return
          }else{
            var n = Math.floor(result.length/10)
              var y = result.length%10
              if(y !== 0){
                n = n+1
                // console.log(n)
              }
              res.send({
                status:10000,
                data:{
                  n:n,
                  userList:result.slice((cur-1)*10,cur*10)
                }
              })
          }
        })
      })
    } catch (error) {
      res.send({
        status:10002,
        msg:'未查到用户信息！！'
      })
      return
    }
    
  }else if(username && !userid){
    getStoreDB(function(store){
      store.collection('goods').find({goodsname:username}).toArray(function(err,result){
        // console.log(result)
        if(err){//数据库查询出错
          res.send({
            status:10001,
            msg:'查询数据库出错，请联系管理员！！！'
          })
          return
        }
        if(result.length === 0){//未查到
          res.send({
            status:10002,
            msg:'未查到用户信息！！'
          })
          return
        }else{
          var n = Math.floor(result.length/10)
            var y = result.length%10
            if(y !== 0){
              n = n+1
              // console.log(n)
            }
            res.send({
              status:10000,
              data:{
                n:n,
                userList:result.slice((cur-1)*10,cur*10)
              }
            })
        }
      })
    })
  }else{
    try {
      getStoreDB(function(store){
        store.collection('goods').find({goodsname:username,_id:new ObjectId(userid)}).toArray(function(err,result){
          // console.log(result)
          if(err){//数据库查询出错
            res.send({
              status:10001,
              msg:'查询数据库出错，请联系管理员！！！'
            })
            return
          }
          if(result.length === 0){//未查到
            res.send({
              status:10002,
              msg:'未查到用户信息！！'
            })
            return
          }else{
            var n = Math.floor(result.length/10)
              var y = result.length%10
              if(y !== 0){
                n = n+1
                // console.log(n)
              }
              res.send({
                status:10000,
                data:{
                  n:n,
                  userList:result.slice((cur-1)*10,cur*10)
                }
              })
          }
        })
      })
    } catch (error) {
      res.send({
        status:10002,
        msg:'未查到用户信息！！'
      })
      return
    }
    
  }
})



module.exports = router;