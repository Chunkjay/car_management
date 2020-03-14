var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var postUserListRouter = require('./routes/sys/user');
var addUserRouter = require('./routes/sys/user_sys/add');
var updataUserRouter = require('./routes/sys/user_sys/update');
var delUserRouter = require('./routes/sys/user_sys/del')
var postGoodsListRouter = require('./routes/sys/product');
var addGoodsRouter = require('./routes/sys/product_sys/add');
var updataGoodsRouter = require('./routes/sys/product_sys/update');
var delGoodsRouter = require('./routes/sys/product_sys/del')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/register',registerRouter);
app.use('/postUserList',postUserListRouter);//获取用户列表
app.use('/addUser',addUserRouter);//添加用户
app.use('/updataUser',updataUserRouter);//修改用户信息
app.use('/delUser',delUserRouter)
app.use('/postGoodsList',postGoodsListRouter);//获取商品列表
app.use('/addGoods',addGoodsRouter);//添加商品
app.use('/updataGoods',updataGoodsRouter);//修改商品信息
app.use('/delGoods',delGoodsRouter)
app.get('/ok',function(req,res){res.send('')})//解决报错，无意义

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
