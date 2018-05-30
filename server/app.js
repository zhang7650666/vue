var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ejs = require('ejs')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var goodsRouter = require("./routes/goods")

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine(".html", ejs.__express)
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next){
    //cookie存在 说明已经登录过了，接着往下走
    if(req.cookies.userId){
        next();
    }else{
        //如果操作的是登录、登出的操作的话，接着往下走, 否则的话拦截
        if(req.originalUrl == "/users/login" || req.originalUrl == "/users/logout" || req.path == '/goods/list'){
            next();
        }else{
            res.json({
                "status":"1001",
                "Msg":"未登录",
                result:[],
            })
        }
    }
})
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/goods", goodsRouter)

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