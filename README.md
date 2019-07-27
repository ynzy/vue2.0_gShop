# 项目介绍
* gshop-client  硅谷外卖前台
* gshop-server  硅谷外卖后台
* gshop-client_pages  硅谷外卖切图

## 技术参考
### 前台
* axios
* better-scroll
* date-fns
* mint-ui
* mockjs
* moment
* node-static
* swiper
* vant
* vue2.5
* vue-lazyload
* vue-router
* vuex
### 后台
* node
* mongoose
* express
* js-base64
* svg-captcha

## 项目运行
1. 前后台安装相应依赖
```js
npm install
```
2. 安装mongoDB数据库并成功启动

* windows安装包,百度链接：[https://pan.baidu.com/s/1M7HhtTRW8fE1Oknb0o4TgA](https://pan.baidu.com/s/1M7HhtTRW8fE1Oknb0o4TgA) 提取码：kz8x
* [win版MongoDB安装教程](http://baijiahao.baidu.com/s?id=1601512248926547477&wfr=spider&for=pc)
* MongoDB配置环境变量里面写的不清楚，我在这里重写下，
```js
MONGO_HOME = C:\Program Files\MongoDB\Server\3.4\bin
Path = %MONGO_HOME%
```
* 推荐使用可视化工具管理数据库，清晰明了，我现找了一个，全是英文看不懂，但也能凑活用了，如果有更好的希望推荐下。教程网址[Robo 3T,mongoDB可视化工具](https://www.jianshu.com/p/1194de9859d0)

3. 启动后台项目
* 启动前查看本地MongoDB地址并进行更改
```js
//  --db/models.js
mongoose.connect('mongodb://localhost:27017/guigu_zhipin')
```
* 修改发送短信验证SID
短信验证官网:[容联云通讯](https://www.yuntongxun.com/?ly=sem-baidu&qd=pc-dasou&cp=ppc&xl=null&kw=10236399&bd_vid=10788411988454829498)
* 注册登录以后,控制台首页有开发者主账号,复制四条秘钥进行修改
```js
// --util/sms_util.js
var ACCOUNT_SID = '填入你的SID';
var AUTH_TOKEN = '填入你的TOKEN';
var Rest_URL = 'https://app.cloopen.com:8883';
var AppID = '8aaf0708697b6beb016985281c8103f4';
```
* 启动
```js
PS M:\个人做过的项目\学习项目\vue项目\硅谷外卖\gshop\gshop-server> npm start

> gshop_server@0.0.0 start M:\个人做过的项目\学习项目\vue项目\硅谷外卖\gshop\gshop-server
> nodemon ./bin/www

[nodemon] 1.17.1
[nodemon] to restart at any time, enter `rs`
[nodemon] watching: *.*
[nodemon] starting `node ./bin/www`
server running on port 3000
数据库连接成功!
```
数据库连接成功,启动成功,端口号3000

修改默认端口号在bin/www文件
```js
// --bin/www
var port = normalizePort(process.env.PORT || '3000');
```
4. 启动前台项目
```js
npm start
```
前台登录注册功能是一起的,也就是登录时后台判断是否有此账号,没有进行注册再登录,返回登录成功信息

