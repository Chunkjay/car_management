var express = require('express');
var router = express.Router();
var { getStoreDB } = require('../resouce/mongo')
var ObjectId = require('mongodb').ObjectID//与数据库默认的 _id 进行匹配

router.post('/',function(req,res,next){//此接口作用，判断传入的 username 和 userid 以及 cur 进行数据库查询，返回查到的十条数据和总页数。
  var announcename = req.body.username
  var announceid = req.body.userid
  var cur = req.body.cur
  // console.log(username,userid)
  if(!announcename&& !announceid){
    getStoreDB(function(store){
      store.collection('announce').find({}).toArray(function(err,result){
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
            msg:'未查到公告信息！！'
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
  }else if(!announcename && announceid){
    try {
      getStoreDB(function(store){
        store.collection('announce').find({_id:new ObjectId(announceid)}).toArray(function(err,result){
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
              msg:'未查到公告信息！！'
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
        msg:'未查到公告信息！！'
      })
      return
    }
    
  }else if(announcename && !announceid){
    getStoreDB(function(store){
      store.collection('announce').find({announcename:announcename}).toArray(function(err,result){
        console.log(result)
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
            msg:'未查到公告信息！！'
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
        store.collection('announce').find({announcename:announcename,_id:new ObjectId(announceid)}).toArray(function(err,result){
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
              msg:'未查到公告信息！！'
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
        msg:'未查到公告信息！！'
      })
      return
    }
    
  }
})

//删除公告
router.post('/del',function(req,res,next){
  var announceid = req.body.announceid
  getStoreDB(function(store){
    store.collection('announce').remove({_id:new ObjectId(announceid)},err => {
      if(err){
        res.send({
          status:10001,
          msg:'查询数据库出错，请联系管理员！！！'
        })
        return
      }
      res.send({
        status:10000,
        msg:'ok'
      })
    })
  })
})


//添加公告
router.post('/add',function(req,res,next){
  var user = req.body.user
  // console.log(user)
  getStoreDB(function(store){
    store.collection('announce').insertOne(user,function(err,result){
      if(err){
        res.send({
          status:10001,
          msg:`${err.message}`+'用户请求已成功，插入数据库失败，请联系管理员进行处理！！！'
        })
        return
      }
      //此时请求已经成功
      res.send({
        status:10000,
        msg:'ok',
        data:{
          announceid:result.insertedId
        }
      })
    })
  })
})

//修改公告
router.post('/updata',function(req,res,next){
  var user = req.body.user
  // console.log(user)
  getStoreDB(function(store){
    store.collection('announce').updateOne({_id:new ObjectId(user._id)},{$set:{announcename:user.announcename,content:user.content}},err => {
      // console.log(err)
      if(err){
        res.send({
          status:10001,
          msg:'查询数据库出错，请联系管理员！！！'
        })
        return
      }
      res.send({
        status:10000,
        msg:'ok'
      })
    })
  })
})


module.exports = router;