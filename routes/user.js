var express = require('express');
var router = express.Router();

//获取数据库
const { getStoreDB } = require('./resouce/mongo')

var ObjectId = require('mongodb').ObjectID//与数据库默认的 _id 进行匹配

//登录
router.post('/login',function(req,res,next){
  var user = req.body.user
  var nuser = {}
  nuser.username = user.name
  nuser.password = user.password
  getStoreDB(function(storeDB){
    storeDB.collection('user').find(nuser).toArray(function(err,result){
      if(err){
        res.send({
          status:10001,
          msg:'查询数据库出错，请联系管理员'
        })
        return
      }
      if(result.length !== 0){
        res.send({
          status:10000,
          username:result[0].username
        })
        return
      }else{
        res.send({
          status:10002,
          msg:'请输入正确的用户名和密码后重新登录！！！'
        })
        return
      }
    })
  })
 
  
})

//购物车添加
router.post('/gwc/add',function(req,res,next){
  var gwc = req.body.ngwc
  getStoreDB(storeDB => {
    storeDB.collection('gwcs').insertOne(gwc,function(err,result){
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
          gwcid:result.insertedId
        }
      })
    })
  })
})

//获取购物车数据
router.post('/gwc/get',function(req,res,next){
  var username = req.body.username
  getStoreDB(storeDB => {
    storeDB.collection('gwcs').find({name:username}).toArray((err,result) => {
      if(err){
        res.send({
          status:10001,
          msg:'查询数据库出错，请联系管理员'
        })
        return
      }
      if(result.length !== 0){
        res.send({
          status:10000,
          gwcList:result
        })
        return
      }else{
        res.send({
          status:10002,
          msg:'没找到您要的信息'
        })
        return
      }
    })
  })
})

//删除购物车数据
router.post('/gwc/del',function(req,res,next){
  var id = req.body.id
  getStoreDB(function(store){
    store.collection('gwcs').remove({_id:new ObjectId(id)},err => {
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


//购物车。removeone
router.post('/gwc/removeone',function(req,res,next){
  var id = req.body.id
  getStoreDB(function(store){
    store.collection('gwcs').remove({_id:new ObjectId(id)},err => {
      // console.log(err)
      if(err){
        res.send({
          status:10001,
          msg:'查询数据库出错，请联系管理员！！！'
        })
      }
    })
  })
})

//添加订单
router.post('/order/add',function(req,res,next){
  var order = req.body.order
  getStoreDB(storeDB => {
    storeDB.collection('order').insertOne(order,function(err,result){
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
          orderid:result.insertedId,
          i:req.body.i
        }
      })
    })
  })
})


//修改支付状态
router.post('/order/update',function(req,res,next){
  var id = req.body.id
  // console.log(user)
  getStoreDB(function(store){
    store.collection('order').updateOne({_id:new ObjectId(id)},{$set:{status:'已支付'}},err => {
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

//修改logID
router.post('/order/updateLogid',function(req,res,next){
  var orderid = req.body.orderid
  var logid = req.body.logid
  // console.log(user)
  getStoreDB(function(store){
    store.collection('order').updateOne({_id:new ObjectId(orderid)},{$set:{logID:logid}},err => {
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


//修改
router.post('/logistic/updateLogid',function(req,res,next){
  var log_id = req.body.log_id
  var logid = req.body.logid
  // console.log(user)
  getStoreDB(function(store){
    store.collection('logistics').updateOne({_id:new ObjectId(log_id)},{$set:{logID:logid}},err => {
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


//获取公告
router.get('/gg',function(req,res,next){
  getStoreDB(storeDB => {
    storeDB.collection('announce').find({}).toArray((err,result) => {
      if(err){
        res.send({
          status:10001,
          msg:'查询数据库出错，请联系管理员'
        })
        return
      }
      if(result.length !== 0){
        res.send({
          status:10000,
          ggList:result
        })
        return
      }else{
        res.send({
          status:10002,
          msg:'没找到您要的信息'
        })
        return
      }
    })
  })
})

//获取订单列表，传入一个username参数
router.post('/order/get',function(req,res,next){
  var username = req.body.username
  getStoreDB(storeDB => {
    storeDB.collection('order').find({}).toArray((err,result) => {
      if(err){
        res.send({
          status:10001,
          msg:'查询数据库出错，请联系管理员'
        })
        return
      }
      if(result.length !== 0){
        orderList = result.filter(item => {
          if(item.goods[0].name==username){
            return item
          }
        })
        res.send({
          status:10000,
          orderList:result
        })
        return
      }else{
        res.send({
          status:10002,
          msg:'没找到您要的信息'
        })
        return
      }
    })
  })
})

//获取商品列表
router.post('/goods/get',function(req,res,next){//此接口作用，判断传入的 username 和 userid 以及 cur 进行数据库查询，返回查到的十条数据和总页数。
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
                userList:result
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
                  userList:result
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
                userList:result
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
                  userList:result
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

//改变库存
router.post('/product/updatenum/mai',function(req,res,next){
  var goodsname = req.body.goodsname
  var num = req.body.num

  getStoreDB(storeDB => {
    storeDB.collection('goods').find({goodsname:goodsname}).toArray((err,result) => {
      if(err){
        res.send({
          status:10001,
          msg:'查询数据库出错，请联系管理员'
        })
        return
      }
      if(result.length !== 0){
        var passnum = Number(result[0].passnum)+Number(num)
        var number = Number(result[0].number)-Number(num)
        getStoreDB(function(store){
          store.collection('goods').updateOne({goodsname:goodsname},{$set:{passnum:passnum,number:number}},err => {
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
      }else{
        res.send({
          status:10002,
          msg:'没找到您要的信息'
        })
        return
      }
    })
  })

  // console.log(user)
  
})


///product/updatenum/tui
router.post('/product/updatenum/tui',function(req,res,next){
  var goodsname = req.body.goodsname
  var num = req.body.num

  getStoreDB(storeDB => {
    storeDB.collection('goods').find({goodsname:goodsname}).toArray((err,result) => {
      if(err){
        res.send({
          status:10001,
          msg:'查询数据库出错，请联系管理员'
        })
        return
      }
      if(result.length !== 0){
        var passnum = Number(result[0].passnum)-Number(num)
        var number = Number(result[0].number)+Number(num)
        getStoreDB(function(store){
          store.collection('goods').updateOne({goodsname:goodsname},{$set:{passnum:passnum,number:number}},err => {
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
      }else{
        res.send({
          status:10002,
          msg:'没找到您要的信息'
        })
        return
      }
    })
  })
})



module.exports = router;
