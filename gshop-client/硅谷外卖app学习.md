
#硅谷外卖项目介绍

前后端分离的SPA应用，前台采用vue全家桶制作webapp，后台使用nodejs,mongoDB开发，后台是直接拿过来用的，我是做前端的，所以只学习前端这一块

[项目地址](https://github.com/ynzy/vue-project/tree/master/gshop)
### 前台技术选型

```
vue,vue-router,axios
vant,swiper,mint-ui
stylus
```
# day01
## 1、搭建项目结构
1. 静态资源导入
  1. --static--css--reset.css，在index.html页面引入即可
  2. 引入阿里图标库，在阿里图标库设计好自己需要用到的图标，生成在线代码直接在index.html引入
  3. 解决点击响应延时 0.3s 问题

```
  <link rel="stylesheet" href="/static//css/reset.css">
  <!-- 引入阿里图标库 -->
  <link rel="stylesheet" href="http://at.alicdn.com/t/font_1077199_3kjjxyuafdw.css">
  <!-- TODO: 解决点击响应延时 0.3s 问题 -->
  <script src="https://as.alipayobjects.com/g/component/fastclick/1.0.6/fastclick.js"></script>
  <script>
    if ('addEventListener' in document) {
      document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
      }, false);
    }
    if(!window.Promise) {
      document.writeln('<script src="https://as.alipayobjects.com/g/component/es6-promise/3.2.2/es6-promise.min.js"'+'>'+'<'+'/'+'script>');
    }
  </script>
```

## 2、vue-router的理解和使用
  * router-view/router-link/keep-alive
  * $router: 路由对象，包含一些操作路由的功能函数，来实现编程式导航(路由跳转)
  * $route： 当前路由对象，一些当前路由信息数据容器，path/meta/query/params
1. 路由拆分
  * 拆分路由，当拿到ui图或者静态页面时，要对路由进行布局拆分，知晓，每个页面跳转到哪里，会显示什么
  * 底部导航组件：FooterGuide
  * 此导航路由组件： Msite/Search/Order/Profile
* 路由结构：

```js
 routes: [
    {
      path: '/',
      redirect: '/msite'
    },
    {
      path: '/msite',
      name: 'msite',
      component: Msite,
      meta: {  //配置元数据确定是否显示footer
        showFooter: true
      }
    },
    {
      path: '/order',
      name: 'order',
      component: Order,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/search',
      name: 'search',
      component: Search,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
  ]
```  

```js
<template>
  <div>
    <van-tabbar v-model="active" active-color="#07c160">
      <van-tabbar-item to="/msite" icon="shop">外卖</van-tabbar-item>
      <van-tabbar-item to="/search" icon="search">搜索</van-tabbar-item>
      <van-tabbar-item to="/order" icon="column">订单</van-tabbar-item>
      <van-tabbar-item to="/profile" icon="manager">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0
    };
  },
  components: {},

  computed: {},

  methods: {},
  mounted() {
    //TODO: 监听路由路径，修改相对应的底部的菜单项
    let path = this.$route.path;
    if (path == "/msite") {
        this.active = 0;
      } else if (path == "/search") {
        this.active = 1;
      } else if (path == "/order") {
        this.active = 2;
      } else if (path == "/profile") {
        this.active = 3;
      }
  }
};
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
@import '../../common/stylus/mixins.styl';
</style>
```

* 使用vant的Tabbar组件实现底部导航，由于点击跳转页面，再次刷新页面时，路由页面与底部导航激活的部分不匹配，所以在每次加载页面时，监听当前路由，使底部激活部分与之匹配

2. 抽取组件
有些组件在很多页面都是一样的，只是显示的数据不一样，所有将其抽取出来放在--components公共组件中，通过solt插槽来实现组件通信标签结构，props获取父组件数据，实现多页面公用一个组件
* 头部组件: HeaderTop, 通过slot来实现组件通信标签结构
* 商家列表组件: ShopList
* 示例

```js
//HeaderTop公共组件
<template>
  <header class="header">
    <!-- 使用插槽获取内容 -->
    <slot name="left"></slot> 
    <span class="header_title">
      <span class="header_title_text ellipsis">{{title}}</span>
    </span>
    <slot name="right"></slot>
  </header>
</template>

<script>
export default {
  props: {
    title: String  //从父组件获取标题信息
  }

}
</script>
//Msite父组件
<template>
  <section class="msite">
    <!--首页头部-->
    <HeaderTop title="昌平区北七家宏福科技园(337省道北)">
      <span class="header_search" slot="left">
        <i class="iconfont icon-sousuo"></i>
      </span>
      <span class="header_login" slot="right">
        <span class="header_login_text">登录|注册</span>
      </span>
    </HeaderTop>
      </section>
</template>
<script>
import HeaderTop from "../../components/HeaderTop/HeaderTop.vue";
export default {
  data() {
    return {};
  },
 components: {
    HeaderTop,
    ShopList
  }
};
</script>
```

3. 登录路由组件
只有路由导航的四个页面需要显示底部菜单，登录组件是不需要显示底部导航的，所以，通过路由的meta属性，配置点击的路由组件显示为true
* 在app页面进行设置

```js
<template>
  <div id="app">
    <router-view/>
    <!-- TODO: 底部菜单组件是否要显示 -->
    <FooterGuide v-show="$route.meta.showFooter"></FooterGuide>
  </div>
</template>
```
## 6. 后台项目
    启动后台项目: 理解前后台分离
    测试后台接口: 使用postman
    修正接口文档

## 7、前后台交互
* ajax请求：axios
* ajax请求封装： axios + promise

```js
/**
 * ajax请求函数模块
 * 返回值： promise对象(异步返回的数据是: response.data)
 */
import axios from 'axios'
/**
 * @export
 * @param {*} url   //请求地址
 * @param {*} [data={}]  //请求数据对象
 * @param {string} [type='GET']  //请求方法
 */
export default function ajax(url, data = {}, type = 'GET') {
  return new Promise(function (resolve, reject) {
    // 执行异步ajax请求
    let promise
    if (type === 'GET') {
      // 准备url query参数数据
      let dataStr = '' //数据拼接字符串
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&'
      })
      if (dataStr !== '') {
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
        url = url + '?' + dataStr
      }
      // 发送get请求
      promise = axios.get(url)
    } else {
      // 发送post请求
      promise = axios.post(url, data)
    }
    promise.then(function (response) {
      // 成功了调用resolve()
      resolve(response.data)
    }).catch(function (error) {
      //失败了调用reject()
      reject(error)
    })
  })
}

```

* 接口请求函数封装: 每个后台接口

```js
/**
 * 包含n个接口请求函数的模块
 * 函数的返回值: promise对象
 */
import ajax from './ajax'
const BASE_URL = 'http://localhost:4000'
// const BASE_URL = '/api'

// 1、根据经纬度获取位置详情
export const reqAddress = function (geohash) {
    ajax(`${BASE_URL}/position/${geohash}`)
} 
// 2、获取食品分类列表
export const reqFoodCategorys = () => ajax(BASE_URL+'/index_category')
// 3、根据经纬度获取商铺列表
export const reqShops = (latitude,longitude) => ajax(BASE_URL+'/shops', {longitude, latitude})
// 4、根据经纬度和关键字搜索商铺列表
export const reqSearchShop = (geohash,keyword) => ajax(BASE_URL+'/shops', {geohash, keyword})
// 5、获取一次性验证码
export const reqCaptcha = () => ajax(BASE_URL+'/captcha')
// 6、用户名密码登陆
export const reqPwdLogin = ({name,pwd,captcha}) => ajax(BASE_URL+'/login_pwd',{name,pwd,captcha},'POST')
// 7、发送短信验证码
export const reqSendCode = (phone) => ajax(BASE_URL + '/sendcode', {phone})
// 8、手机号验证码登陆
export const reqSmsLogin = (phone,code) => ajax(BASE_URL + '/login_sms', {phone,code},'POST')
// 9、根据会话获取用户信息
export const reqUserInfo = () => ajax(BASE_URL + '/userinfo')
// 10、用户登出
export const reqLogout = () => ajax(BASE_URL + '/logout')
/**
 * 获取商家信息
 */
export const reqShopInfo = () => ajax('/info')
/**
 * 获取商家评价数组
 */
export const reqShopRatings = () => ajax('/ratings')
/**
 * 获取商家商品数组
 */
export const reqShopGoods = () => ajax('/goods')
```

* 调用

```js
mounted () {
   const result =  reqFoodCategorys()
  //  console.log(result)
  result.then(function(res) {
    console.log(res)
  })
  }
```

# day02
## 一、异步数据
#### 1、封装ajax：（第一天已写，这个很重要）
  * 要学会promise+axios封装ajax请求的函数
  * 要能封装每个接口对应的请求函数(根据接口定义ajax请求函数)
  * 解决ajax的跨域问题：配置代理，对代理的理解。
  * 配置--config--index.js

```js
proxyTable: {
  '/api': { // 匹配所有以 '/api'开头的请求路径
    target: 'http://localhost:3000', // 代理目标的基础路径
    changeOrigin: true, // 支持跨域
    pathRewrite: {// 重写路径: 去掉路径中开头的'/api'
      '^/api': ''
    }
  }
}
```

#### 2、vuex编码:
  1. 创建所有相关的模块: store/index|state|mutations|actions|getters|mutations-types
  2. 设计state：也就是从后台获取的数据存储在state中
      * 出现问题：对于暴露导入的理解

```js
const state = {}
export default state
import state from './xxx.js'
//暴露时没有加{},在import时也不需要加{}
const state = {}
export default {state}
//export default {} 导出的是对象，那么引入的时候就要 import {state} from './xxx.js'
```

  3. 实现actions，此文件是用来异步获取数据的
      * 定义异步action： async/await
      * 流程： 发送ajax获取数据，commit提交给mutation
  4. 实现mutation：给状态赋值，也就是更新state数据
  5. 实现index:创建store对象(固定的模式)
  6. main.js: 配置store
#### 3、组件异步显示数据
1. 异步获取数据
    * 在mounted()通过$store.dispatch('actionName')来异步获取后台数据到state中
    * mapActions(['getAddress'])以数组形式映射模块中的方法，在mounted中调用也可以异步获取后台数据

```js
import { mapActions } from "vuex";
methods: {
 //TODO: 方法2.以数组形式映射模块中的方法
 ...mapActions(['getAddress'])
},
mounted () {
 //TODO: 方法1.含有异步操作，例如向后台提交数据
 // this.$store.dispatch('getAddress')
 this.getAddress();
}
```

2. 读取数据
    * mapState(['...'])读取state中数据到组件中
3. 显示数据
    * 在模板中显示xxx数据
#### 4、模板中显示数据的来源
1. data：自身的数据(内部改变)
2. props:外部传入的数据(外部改变)
3. computed： 根据data/props/别的compute/state/getters(计算的数据)
#### 5、异步显示轮播图
1. 通过vuex获取foodCategorys数据(发请求，读取)
2. 对获取的数据进行整合计算(一维变特定的二维数据)

```js
  computed: {
    ...mapState(["categorys"]),
    /*
      根据categorys一维数组生成一个2维数组
      小数组中的元素个数最大是8
       */
    categorysArr() {
      //解构赋值
      const { categorys } = this;
      // 准备空的2维数组
      const arr = [];
      // 准备一个小数组(最大长度为8)
      let minArr = [];
      categorys.forEach(c => {
        // 如果当前小数组已经满了, 创建一个新的
        if (minArr.length === 8) {
          minArr = [];
        }
        // 如果minArr是空的, 将小数组保存到大数组中
        if (minArr.length === 0) {
          arr.push(minArr);
        }
        // 将当前分类保存到小数组中
        minArr.push(c);
      });
      return arr;
    }
  },
```

3. 通过双循环对二维数组进行遍历显示,如果没有数据时，显示预加载图片

```html
<nav class="msite_nav">
 <!-- 判断是否有数据 -->
 <div class="swiper-container" v-if="categorys.length">
   <div class="swiper-wrapper">
     <!-- 第一层遍历二维数组 -->
     <div class="swiper-slide" v-for="(categorys, index) in categorysArr" :key="index">
       <!-- 第二层遍历，对二维数组中的一维数组遍历 -->
       <a href="javascript:" class="link_to_food" v-for="(category, index) in categorys" :key="index">
         <div class="food_container">
           <img :src="baseImageUrl+category.image_url">
         </div>
         <span>{{category.title}}</span>
       </a>
     </div>

   </div>
   <!-- Add Pagination -->
   <div class="swiper-pagination"></div>
 </div>
 <!-- 没有数据时显示预加载svg -->
 <img src="./images/msite_back.svg" alt="back" v-else >
</nav>
```

4. 使用Swiper显示轮播图，如何在界面更新之后创建Swiper对象？
    * 使用watch+$nextTick(),监视显示的数据，如果数据有值立即更新

```js
  watch: {
    categorys(value) {
      // categorys数组中有数据了, 在异步更新界面之前执行
      // 使用setTimeout可以实现效果, 但不是太好
      /*setTimeout(() => {
       //创建一个Swiper实例对象，实现轮播
        new Swiper(".swiper-container", {
          loop: true, // 循环模式选项,可以循环轮播
          // 如果需要分页器
          pagination: {
            el: ".swiper-pagination"
          }
        });
      }, 100);*/
       // 界面更新就立即创建Swiper对象
        this.$nextTick(() => {// TODO: 一旦完成界面更新, 立即调用(此条语句要写在数据更新之后)
          // 创建一个Swiper实例对象, 来实现轮播
          new Swiper('.swiper-container', {
            loop: true, // 可以循环轮播
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
            },
          }) 
        })
    }
  }
```

## 二、登录/注册：界面相关效果
1. 切换登录方式
* 初始化一个boolean值(longinWay)，true为短信登录，false为密码登录
* 使用@click方法设置boolean值
* 定义一个class类绑定此布尔值控制表单显示选择
`loginWay: true  //true代表短信登陆, false代表密码`
![登录方式切换.png](https://upload-images.jianshu.io/upload_images/13505073-07a17e145f6da30b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![登录方式切换.gif](https://upload-images.jianshu.io/upload_images/13505073-78b784c1c53b2722.gif?imageMogr2/auto-orient/strip)
2. 手机号合法检查，发送验证码倒计时
* 通过计算属性验证输入的手机号是否正确，正确时可以点击发送获取验证码,`right_phone`类改变字的颜色

```html
 <section class="login_message">
  <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
  <!-- 计算属性验证输入的手机号是否正确，正确则能点击获取验证码，添加显示状态。 -->
  <!-- 表单里面的button默认行为是提交表单，要取消默认行为 -->
  <!-- 三目运算，模板字符串，如果时间大于0则显示当前秒数 -->
  <button
    :disabled="!rightPhone"
    class="get_verification"
    :class="{right_phone: rightPhone}"
    @click.prevent="getCode"
  >{{computeTime>0? `已发送(${computeTime}s)` :'获取验证码'}}</button>
</section>
```
```js
data() {
  return {
    phone: "", // 手机号
    computeTime: 0, //计时时间
  }
},
computed: {
    rightPhone() {
      //使用计算属性测试输入的手机号是否正确，正确则显示类名
      return /^1\d{10}$/.test(this.phone);
    }
  },
methods: {
  //异步获取验证码
  getCode() {
    //如果当时没有计时
    if (!this.computeTime) {
      //启动倒计时
      this.computeTime = 30;
      //TODO: 间歇调用
      const intervalId = setInterval(() => {
        this.computeTime--;
        if (this.computeTime <= 0) {
          clearInterval(intervalId);
        }
      }, 1000);
    }
  }
}
```
![手机号码检车，发送验证码倒计时.gif](https://upload-images.jianshu.io/upload_images/13505073-01bd15d53c5cefce.gif?imageMogr2/auto-orient/strip)
3. 切换显示或隐藏密码
* 通过两个输入框，一个按钮，改变密码的显示与隐藏状态

`showPwd: false, //是否显示密码`
```html
<section class="login_verification">
  <!-- 切换密码显示隐藏状态，改变按钮选择状态，默认为隐藏 -->
  <input type="text" maxlength="8" placeholder="密码" v-if="showPwd" v-model="pwd">
  <input type="password" maxlength="8" placeholder="密码" v-if="!showPwd" v-model="pwd">
  <!-- 点击改变类的状态和圆圈的移动 -->
  <div class="switch_button" :class="showPwd?'on': 'off'" @click="showPwd = !showPwd">
    <div class="switch_circle" :class="{right:showPwd}"></div>
    <span class="switch_text">{{showPwd?'abc':'...'}}</span>
  </div>
</section>
```
![密码显示和隐藏.gif](https://upload-images.jianshu.io/upload_images/13505073-0c36bbad3e5565b9.gif?imageMogr2/auto-orient/strip)
4. 前台验证提示
* 学会如何使用模板组件
* 调用--components-AlertTip-AlertTip.vue组件，使用提示框组件

```html
<!-- 提示模板组件 -->
<template>
  <div class="alert_container">
    <section class="tip_text_container">
      <div class="tip_icon">
        <span></span>
        <span></span>
      </div>
      <p class="tip_text">{{alertText}}</p>
      <div class="confrim" @click="closeTip">确认</div>
    </section>
  </div>
</template>

<script>
  export default {
    props: {
      alertText: String  //传入的参数
    },

    methods: {
      closeTip() {
        // 分发自定义事件(事件名: closeTip)
        this.$emit('closeTip')
      }
    }
  }
</script>
```
```html
<form @submit.prevent="login">
</form>
<!-- 调用组件，@closeTip自定义事件 -->
<AlertTip :alertText="alertText" v-show="alertShow" @closeTip="closeTip"/>
```
```js
import AlertTip from "../../components/AlertTip/AlertTip.vue";
data() {
  return {
      alertText: "", //提示文本
      alertShow: false //是否显示警告框
  }
}
methods: {
  //展示提示框
  showAlert(alertText) {
    this.alertShow = true;
    this.alertText = alertText;
  },
 //关闭警告框
  closeTip() {
    this.alertShow = false;
    this.alertText = '';
  },
  //异步登录
  login() {
    //前台表单验证
    if (this.loginWay) {
      //短信登录
      const { phone, code } = this;
      if (!this.rightPhone) {
        //手机号不正确
        this.showAlert("手机号不正确");
      } else if (!/^\d{6}$/.test(code)) {
        alert(this.code)
        //验证码必须是6位数字
        this.showAlert("验证码必须是6位数字");
      }
    } else {
      //密码登录
      const { name, pwd, captcha } = this;
      if (!this.name) {
        //用户名必须指定
        this.showAlert("用户名必须指定");
      } else if (!this.pwd) {
        //密码必须指定
        this.showAlert("密码必须指定");
      } else if (!this.captcha) {
        //图形验证码必须指定
        this.showAlert("图形验证码必须指定");
      }
    }
  }
}
```

## 三、前后台交互相关问题
1. 如何查看你的应用是否发送某个ajax请求？
    * 浏览器的network
![查看network](https://upload-images.jianshu.io/upload_images/13505073-f8431b542cc6969e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
2. 发ajax请求404怎么办
    * 查看请求路径的对错
    * 单利是否生效(配置和重启)
    * 服务器应用是否运行
3. 后台返回了数据，但页面没有显示？
    * vuex中是否有数据
    * 组件是否读取了数据

# day03
## 1、完成登录注册功能
1. 2种登录方式
   * 手机号/验证码登录
   * 用户名/密码/图片验证码登录
2. 登录的基本流程
   * 表单前台验证，如果不通过，提示
   * 发送ajax请求，得到返回的结果
3. 根据结果的标识(code)来判断登录请求是否成功
    * 1： 不成功，显示提示
    * 0： 成功，保存用户信息，跳转到个人中心路由
```js
async login() {
 let result
 //前台表单验证
 if (this.loginWay) {
   // 发送ajax请求，短信登录
   result = await reqSmsLogin(phone,code)

 } else {
   // 发送ajax请求，密码登录
   result = await reqPwdLogin({name,pwd,captcha})
 }
 //根据结果数据处理
   if(result.code === 0) {
     const user = result.data
     //将user保存到vuex的state中
     this.$store.dispatch('recordUser',user)
     //去个人中心界面
     this.$router.replace('/profile')
   } else {
     //显示新的图形验证码
     this.getCaptcha()
     //显示警告提示
     const msg = result.msg
     this.showAlert(msg)
   }
}

//action.js
  // TODO: 同步记录用户信息
  recordUser ({commit},userInfo) {
    commit(RECEIVE_USER_INFO,{userInfo})
  }
//mutations.js
  [RECEIVE_USER_INFO](state,{userInfo}) {
      state.userInfo = userInfo
  },
```

4. vue自定义事件
   * 监听事件： @eventName="fn"  function fn (data) {//处理}
   * 分发事件： this.$emit('eventName',data)

```html
<!-- AlertTip提示组件 -->
<template>
  <div class="alert_container">
    <section class="tip_text_container">
      <div class="tip_icon">
        <span></span>
        <span></span>
      </div>
      <p class="tip_text">{{alertText}}</p>
      <div class="confrim" @click="closeTip">确认</div>
    </section>
  </div>
</template>

<script>
  export default {
    props: {
      alertText: String
    },

    methods: {
      closeTip() {
        // 分发自定义事件(事件名: closeTip)
        this.$emit('closeTip')
      }
    }
  }
</script>

<!-- login组件调用AlertTip组件 -->
<AlertTip :alertText="alertText" v-show="alertShow" @closeTip="closeTip"/>

<script>
  import AlertTip from "../../components/AlertTip/AlertTip.vue";
  export default {
    methods: {
      //关闭警告框
      closeTip() {
        this.alertShow = false;
        this.alertText = '';
      },
    }
  }
</script>
```

4. 注意
   * 使用network查看请求(路径/参数/请求方式/响应数据)
   * 使用vue的chrome插件查看vuex中的state和组件中的数据
   * 使用debugger语句调试代码
   * 实参类型与形参类型的匹配问题

```js
//定义 
fun({a,b,c})  //{a,b,c}是一个对象
//调用
fun({a,b,c})  //也要传对象
```


## 2、自动登录，退出登录
1. 通过会话获取后台用户信息，后台处理session保持登录状态，刷新页面时登录存在

```js
// 根据会话获取用户信息
export const reqUserInfo = () => ajax(BASE_URL + '/userinfo')
  // 异步获取用户信息
  async getUserInfo({commit}) {
    const result = await reqUserInfo()
    if(result.code === 0) {
      const userInfo = result.data
      commit(RECEIVE_USER_INFO,{userInfo})
    }
  },
```

2. 点击退出登录，返回退出登录状态给后台，删除前台用户信息

```js
logout() {
   Dialog.confirm({
     title: "提示",
     message: "确认退出吗"
   })
   .then(() => {
     //请求退出
     this.$store.dispatch("logout");
     Toast('退出成功');
   })
   .catch(() => {
     console.log("点击了取消");
   });
}
//actions
  // 异步登出
  async logout ({commit}) {
    const result = await reqLogout()
    if(result.code === 0) {
      commit(RESET_USER_INFO)
    }
  }
```

## 3、搭建商家整体界面
1. 学会拆分界面路由，看出页面拆分成几个组件
![页面组件和路由拆分](https://upload-images.jianshu.io/upload_images/13505073-5594f277ebd5c5d7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
2. 路由的定义/配置|使用---父子路由，路由重定向

```js
{
   path: '/shop',
   component: Shop,
   children: [
     {
       path: '/shop/goods',
       component: ShopGoods
     },
     {
       path: '/shop/ratings',
       component: ShopRatings
     },
     {
       path: '/shop/info',
       component: ShopInfo
     },
     {
       path: '',
       redirect: '/shop/goods'
     },
   ]
},
```

## 4、模拟(mock)数据/接口
1. 前后台分离的理解
2. mock.js的理解和使用
3. json数据设计的理解
   * JSON分为json对象和json数组，
   * 结构：名称/数据类型
   * 结构 + value值，值可以变，结构不可以变

```js
//接口
//获取商家信息
export const reqShopInfo = () => ajax('/info')  //mock模拟数据不需要代理api
//获取商家评价数组
export const reqShopRatings = () => ajax('/ratings')
//获取商家商品数组
export const reqShopGoods = () => ajax('/goods')

/*mockServer.js*/
/*
使用mockjs提供mock数据接口
 */
 import Mock from 'mockjs'
 import data from './data.json'
// 返回goods的接口
Mock.mock('/goods',{code: 0, data: data.goods})
// 返回ratings的接口
Mock.mock('/ratings',{code: 0, data: data.ratings})
// 返回info的接口
Mock.mock('/info',{code: 0, data: data.info})
// export default ???  不需要向外暴露任何数据, 只需要保存能执行即可
```

## 5、ShopHeader组件
1. 异步显示数据效果的编码流程
  * ajax
    * ajax请求函数
    * 接口请求函数
  * vuex
    * state
    * mutation-types
    * actions
    * mutations
  * 组件
    * dispatch(): 异步获取后台数据到vuex的state
    * mapState(): 从vuex的state中读取对应的数据
    * 模板中显示
2. 初始化显示异常
   * 情况1：`Cannot read property 'xxx' of undefined"`
   * 原因： 初始值是空对象, 内部没有数据, 而模块中直接显示3层表达式
   * `a.b.xxx`,undefined表示b未定义
   * 解决： 使用v-if指令
   * 情况2: `Cannot read property 'xxx' of null"`
   * 原因： 数据定义时使用了`a=null`
   * 解决： 直接使用`a=[]或a={}`定义空对象空数组
3. vue transition动画


# day04

## 一、ShopGoods组件
#### 1、动态展现列表数据
* 使用mock.js模拟商品数据，实现列表数据展现
#### 2、实现基本列表滑动
* 使用better-scroll
1. 功能：
   * 实现两个列表滑动
   * 凸显当前分类
   * 当滑动右侧列表时，更新当前分类
   * 点击某个分类项，右侧列表滑动到对应的位置
2. 分析：
   * 类名：current类样式标识当前分类
   * 设计一个计算属性：currentIndex，当分类项到此节点，显示current样式
   * 根据哪些数据计算？
     * scrollY：右侧活动的Y坐标轴(滑动过程是实时变化的)
     * tops： 所有右侧分类li的top组成的数组（列表第一次显示后就不再变化）
3. 编码：
   * 在滑动过程中，实时收集scrollY
   * 在列表第一次显示后，收集tops
   * 实现currentIndex的计算逻辑 

```html
<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul ref="menusUl">
          <!-- current -->
          <li
            class="menu-item"
            v-for="(good, index) in goods"
            :key="index"
            :class="{current: index===currentIndex}"
            @click="clickMenuItem(index)"
          >
            <span class="text bottom-border-1px">
              <img class="icon" :src="good.icon" v-if="good.icon">
              {{good.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul ref="foodsUl">
          <li class="food-list-hook" v-for="(good, index) in goods" :key="index">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li
                class="food-item bottom-border-1px"
                v-for="(food, index) in good.foods"
                :key="index"
                @click="showFood(food)"
              >
                <div class="icon">
                  <img width="57" height="57" :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售 {{food.sellCount}} 份</span>
                    <span>好评率 {{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food"></CartControl>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <ShopCart />
    </div>
    <Food :food="food" ref="food"></Food>
  </div>
</template>
```

##### (1)实现列表滑动

```js
import BScroll from "better-scroll"
mounted() {
    this.$store.dispatch("getShopGoods", () => {
      //数据更新后执行
      this.$nextTick(() => {
        this._initScroll();
        this._initTops();
      });
    });
  },
methods: {
    //TODO: methods里放事件相关的函数，加‘_’是为了与事件函数区分开
    //初始化滚动
    _initScroll() {
      //列表显示之后创建
      this.menuScroll = new BScroll(".menu-wrapper", {
        click: true
      });
      this.foodsScroll = new BScroll(".foods-wrapper", {
        probeType: 2, // 因为惯性滑动不会触发
        click: true
      });
      // 给右侧列表绑定scroll监听
      this.foodsScroll.on("scroll", ({ x, y }) => {
        // console.log(x, y);
        //绝对值
        this.scrollY = Math.abs(y);
      });
      // 给右侧列表绑定scroll结束的监听
      this.foodsScroll.on("scrollEnd", ({ x, y }) => {
        // console.log("scrollEnd", x, y);
        this.scrollY = Math.abs(y);
      });
    }

  }
```

##### (2)凸显当前分类，当滑动右侧列表时，更新当前分类
* 当右侧滑动的每个导航在客户区高度顶部时，左侧的菜单栏同步高亮

```html
<li
 class="menu-item"
 v-for="(good, index) in goods"
 :key="index"
 :class="{current: index===currentIndex}"
 @click="clickMenuItem(index)"
>
<script>
   data() {
    return {
      scrollY: 0, // 右侧滑动的Y轴坐标 (滑动过程时实时变化)
      tops: [], // 所有右侧分类li的top组成的数组  (列表第一次显示后就不再变化)
      food: {}, // 需要显示的food
      leftTops: [],
      leftScrollY: 0,
    };
  },
  computed: {
    ...mapState(["goods"]),
    //计算得到当前分类的下标
    currentIndex() {
      // 得到条件数据
      const { scrollY, tops } = this;
      // 根据条件计算产生一个结果
      //TODO: findIndex: 方法返回传入一个测试条件（函数）符合条件的数组第一个元素位置
      const index = tops.findIndex((top, index) => {
        // scrollY>=当前top && scrollY<下一个top
        return scrollY >= top && scrollY < tops[index + 1];
      });
      //计算左侧菜单条滑动位置
      if (index > 7) {
        const leftScrollY = this.leftTops[index - 7];
        this.leftScrollY = leftScrollY;
        this.menuScroll.scrollTo(0, -leftScrollY, 300);
      }
      // 返回结果
      return index;
    }
  },
  methods: {
    //初始化tops
    _initTops() {
      //1. 初始化tops
      const tops = [];
      let top = 0;
      tops.push(top);
      //2. 收集top值
      //找到所有分类li
      const lis = this.$refs.foodsUl.getElementsByClassName("food-list-hook");
      /**
       * 首先 这是创建了一个类数组lis（就是没有具体数据的数组），使用Array.prototype把类数组转换为原型数组，prototype是原型的意思
        为什么要转换为原型数组呢？因为类数组是没有slice()方法的，需要把类数组转换为原型数组才能调用slice()这个方法

        然后 解释 slice()和call()方法
        slice() 方法可从已有的数组中返回选定的元素。 语法 arrayObject.slice(start,end)，在本句中的意思是要去遍历数组
        call() 方法定义：调用一个对象的方法，以另一个对象替换当前对象，在这里的意思大概就是调用原型数组的方法，用原型数组代替当前对象（类数组），
        所以Array.prototype.slice.call(lis)数组就完全变成真正的数组啦！
       */
      Array.prototype.slice.call(lis).forEach(li => {
        top += li.clientHeight; //客户区高度
        tops.push(top);
      });
      //3. 更新数据
      this.tops = tops;
      // console.log(tops);

      //初始化左侧滑动高度
      const leftTops = [];
      let leftTop = 0;
      leftTops.push(leftTop);
      const leftTopLi = this.$refs.menusUl.getElementsByClassName("menu-item");
      Array.prototype.slice.call(leftTopLi).forEach(li => {
        leftTop += li.clientHeight; //客户区高度
        leftTops.push(leftTop);
      });
      this.leftTops = leftTops;
      // console.log(leftTops);
    },
  }
</script>
```

##### (3)点击某个分类项，右侧列表滑动到对应的位置

```js
<script>
methods: {
      clickMenuItem(index) {
      //使用右侧列表滑动到对应的位置
      // 得到目标位置的scrollY
      const scrollY = this.tops[index];
      // 立即更新scrollY(让点击的分类项成为当前分类)
      this.scrollY = scrollY;
      // 平滑滑动右侧列表
      this.foodsScroll.scrollTo(0, -scrollY, 300);
    },
}
</script>
```

## 二、CartControl组件，商品加减组件

```html
<template>
  <div class="cartcontrol">
    <transition name="move">
      <!-- TODO: .stop阻止事件冒泡，点击加减号不再弹出food组件 -->
      <div class="iconfont icon-remove1" v-if="food.count" @click.stop="updateFoodCount(false)"></div>
    </transition>
    <div class="cart-count" v-if="food.count">{{food.count}}</div>
    <div class="iconfont icon-addcontacts" @click.stop="updateFoodCount(true)"></div>
  </div>
</template>

<script>
export default {
  props: {
    food: Object
  },
  computed: {},

  methods: {
    updateFoodCount(isAdd) {
      this.$store.dispatch("updateFoodCount", { isAdd, food: this.food });
    }
  },
  components: {}
};

// actions
  updateFoodCount ({commit}, {isAdd, food}) {
    if(isAdd) {
      commit(INCREMENT_FOOD_COUNT, {food})
    } else {
      commit(DECREMENT_FOOD_COUNT, {food})
    }
  },
// mutations
    [INCREMENT_FOOD_COUNT](state,{food}) {
      if(!food.count) { //第一次增加
      // food.count = 1  // 新增属性(没有数据绑定)

      //TODO: 在已绑定的数据中添加新的数据进行绑定
      Vue.set(food, 'count', 1)  //让新增的属性也有数据绑定
      // 将food添加到cartFoods中
      state.cartFoods.push(food)
      } else {
          food.count++
      }
      /** 
       * p65
       * 1.通过两个引用变量指向同一个对象，通过一个引用变量改变变量内部数据，另外一个引用变量能看见
       * 2.两个引用变量指向同一个对象，让一个引用变量指向另外一个对象，而原来的引用变量的另一个引用变量还是指向原来的对象
      */
  },
</script>
```

1. 问题：更新状态数据, 对应的界面不变化
* 原因： 一般方法给一个已有绑定的对象中添加一个新的属性, 这个属性没有数据绑定
* 解决:
  * Vue.set(obj, 'xxx', value)才有数据绑定
  * this.$set(obj, 'xxx', value)才有数据绑定
## 三、ShopCart组件，购物车组件
1. 使用vuex管理购物项数据: cartFoods
2. 解决几个功能性bug
    * 是什么时候显示和关闭购物车列表
    * 如何计算需要多少元起送
```html
<template>
  <div>
    <div class="shopcart">
      <div class="content">
        <div class="content-left" @click="toggleShow">
          <div class="logo-wrapper">
            <!-- 显示总数量 -->
            <div class="logo" :class="{highlight:totalCount}">
              <i class="iconfont icon-shopping" :class="{highlight:totalCount}"></i>
            </div>
            <div class="num" v-if="totalCount">{{totalCount}}</div>
          </div>
          <div class="price" :class="{highlight:totalCount}">￥{{totalPrice}}</div>
          <div class="desc">另需配送费￥{{info.minPrice}} 元</div>
        </div>
        <!-- 通过计算属性计算总价格和是否需要的配送费的关系 -->
        <div class="content-right">
          <div class="pay" :class="payClass">{{payText}}</div>
        </div>
      </div>
      <div class="shopcart-list" v-show="listShow">
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <span class="empty" @click="clearCart">清空</span>
        </div>
        <div class="list-content">
          <ul>
            <li class="food" v-for="(food, index) in cartFoods" :key="index">
              <span class="name">{{food.name}}</span>
              <div class="price">
                <span>￥{{food.price}}</span>
              </div>
              <div class="cartcontrol-wrapper">
                <CartControl :food="food"/>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="list-mask" v-show="listShow" @click="toggleShow"></div>
  </div>
</template>

<script>
import { Dialog } from 'vant';
import BScroll from "better-scroll";
import { mapState, mapGetters } from "vuex";
import CartControl from "../CartControl/CartControl.vue";

export default {
  data() {
    return {
      isShow: false
    };
  },
  computed: {
    ...mapState(["cartFoods", "info"]),
    ...mapGetters(["totalCount", "totalPrice"]),
    payClass() {
      const { totalPrice } = this;
      const { minPrice } = this.info;
      return totalPrice >= minPrice ? "enough" : "not-enough";
    },
    payText() {
      const { totalPrice } = this;
      const { minPrice } = this.info;
      if (totalPrice === 0) {
        return `￥${minPrice}元起送`;
      } else if (totalPrice < minPrice) {
        return `还差￥${minPrice - totalPrice}元起送`;
      } else {
        return "结算";
      }
    },
    //显示购物车列表项
    listShow() {
      // 如果总数量为0, 直接不显示
      if (this.totalCount === 0) {
        this.isShow = false;
        return false;
      }
      if (this.isShow) {
        this.$nextTick(() => {
          // 实现BScroll的实例是一个单例
          if (!this.scroll) {
            this.scroll = new BScroll(".list-content", {
              click: true
            });
          } else {
            this.scroll.refresh(); // 让滚动条刷新一下: 重新统计内容的高度
          }
        });
      }
      return this.isShow;
    }
  },

  methods: {
    toggleShow() {
      // 只有当总数量大于0时切换
      if (this.totalCount > 0) {
        this.isShow = !this.isShow;
      }
    },
    clearCart() {
      Dialog.confirm({
        title: "提示",
        message: "确定清空购物车？"
      })
        .then(() => {
          this.$store.dispatch('clearCart')
        })
        .catch(() => {
          // on cancel
        });
    }
  },
  components: {
    CartControl
  }
};
</script>
```

## 四、Food组件，食物详情组件
1. 父子组件：
   * 子组件调用父组件的方法: 通过props将方法传递给子组件
   * 父组件调用子组件的方法: 通过ref找到子组件标签对象

```html
<template>
  <div class="food" v-if="isShow">
    <div class="food-content">
      <div class="image-header">
        <img
          :src="food.image"
        >
        <p class="foodpanel-desc">{{food.info}}</p>
        <div class="back" @click="toggleShow">
          <i class="iconfont icon-xiazai6" style="color:#fff"></i>
        </div>
      </div>
      <div class="content">
        <h1 class="title">{{food.name}}</h1>
        <div class="detail">
          <span class="sell-count">月售 {{food.sellCount}} 份</span>
          <span class="rating">好评率 {{food.rating}}%</span>
        </div>
        <div class="price">
          <span class="now">￥{{food.price}}</span>
          <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
        </div>
        <div class="cartcontrol-wrapper">
            <CartControl :food="food"></CartControl>
        </div>
      </div>
    </div>
    <div class="food-cover" @click="toggleShow"></div>
  </div>
</template>

<script>
  import CartControl from '../../components/CartControl/CartControl.vue'
export default {
  props: {
    food: Object
  },
  data () {
    return {
      isShow: false
    }
  },
  computed: {},

  methods: {
    toggleShow () {
      this.isShow = !this.isShow
    }
  },
  components: {
    CartControl
  }
};
</script>

<!-- 调用组件 -->
 <Food :food="food" ref="food"></Food>
 <script>
 //显示点击的food
    showFood(food) {
      //设置food
      this.food = food;
      //显示food组件(在父组件中调用子组件对象的方法)
      console.log(this.$refs.food);
      this.$refs.food.toggleShow();
    }
 </script>
```

# day05
## 一、ShopRatings组件
#### 1、计算满意度
* 计算全部，满意，不满意评价数量

```html
<!-- rating.length为评价总数，设计计算属性positiveSize计算满意的评价,总数-满意=不满意 -->
<div class="rating-type border-1px">
  <span class="block positive " :class="{active:selectType==2 }">
    全部
    <span class="count">{{ratings.length}}</span>
  </span>
  <span class="block positive" :class="{active:selectType==0 }">
    满意
    <span class="count">{{positiveSize}}</span>
  </span>
  <span class="block negative" :class="{active:selectType==1 }">
    不满意
    <span class="count">{{ratings.length - positiveSize}}</span>
  </span>
</div>
<script>
//getters
  //计算满意度，看rateType的值是否为1，是则加一，0则不加
positiveSize(state) {
  return state.ratings.reduce((preTotal, rating) => preTotal + (rating.rateType===0?1:0) ,0)
}
  //js
data() {
  return {
    selectType: 2 // 选择的评价类型: 0满意, 1不满意, 2全部
  }
},
computed: {
  ...mapGetters(['positiveSize']),
}

</script>
```

#### 2、列表的过滤显示
* 查看全部/满意/不满意的评价 && 是否只有内容的评价
* 通过点击按钮改变当前显示状态，设计过滤新数组，判断符合条件的评价显示在页面上

```html
 <div class="ratingselect">
  <div class="rating-type border-1px">
    <!-- 点击改变评价类型值 -->
    <span class="block positive " :class="{active:selectType==2 }"  @click="setSelectType(2)">
      全部
      <span class="count">{{ratings.length}}</span>
    </span>
    <span class="block positive" :class="{active:selectType==0 }"  @click="setSelectType(0)">
      满意
      <span class="count">{{positiveSize}}</span>
    </span>
    <span class="block negative" :class="{active:selectType==1 }" @click="setSelectType(1)">
      不满意
      <span class="count">{{ratings.length - positiveSize}}</span>
    </span>
  </div>
  <!-- 点击改变是否显示有文本的状态 -->
  <div class="switch" :class="{on: onlyShowText}" @click="toggleOnlyShowText">
    <span class="iconfont icon-check"></span>
    <span class="text">只看有内容的评价</span>
  </div>
</div>
<script>
  data() {
    return {
      onlyShowText: true, // 是否只显示有文本的
      selectType: 2 // 选择的评价类型: 0满意, 1不满意, 2全部
    };
  },
  computed: {
    ...mapState(["info", "ratings"]),
    fillterRatings() {
      //1.影响的数据有哪些
      const { ratings, onlyShowText, selectType } = this;
      //产生一个过滤新数组
      return ratings.filter(rating => {
        const {rateType, text} = rating
        /*
         条件1：
          评价类型和评价满意度参数，如果selectType=2，则显示全部，如果selectType和rateType相等，显示当前满意度的评价（满意或者不满意）
          selectType：0/1/2
          rateType： 0/1
          selectType===2 || selectType===rateType
         条件2：
          如果不显示文本，则不用判断text有没有值，选择不显示。如果onlyShowText为true，要看text的值是否大于零进行显示
          onlyShowText： true/false
          text: 有值、没有值
          !onlyShowText取反，为true时不需要判断text有没有值
          !onlyShowText || text.length>0
         */
        return (selectType===2 || selectType===rateType) && (!onlyShowText || text.length>0)
      })
    }
  },
  methods: {
    setSelectType(selectType) {
      this.selectType = selectType;
    },
    toggleOnlyShowText () {
      this.onlyShowText = !this.onlyShowText
    }
  },
</script>
```

## 二、ShopInfo组件
* 实现上下左右滑动，动态计算ul总宽度
* 总宽度=(li宽度+边距宽度)*图片数量-最后一个边距宽度
* 通过watch监视数据更新，数据刷新之后创建滑动对象，

```html
<section class="section">
  <h3 class="section-title">活动与服务</h3>
  <div class="activity">
    <!-- 设计数组，动态计算颜色类 -->
    <div
      class="activity-item"
      :class="supportClasses[support.type]"
      v-for="(support, index) in info.supports"
      :key="index"
    >
      <span class="content-tag">
        <span class="mini-tag">{{support.name}}</span>
      </span>
      <span class="activity-content">{{support.content}}</span>
    </div>
  </div>
</section>
<section class="section">
  <h3 class="section-title">商家实景</h3>
  <div class="pic-wrapper">
    <ul class="pic-list" ref="picUl">
      <li class="pic-item" v-for="(pic, index) in info.pics" :key="index">
        <img width="120" height="90" :src="pic">
      </li>
    </ul>
  </div>
</section>
<script>
data() {
  return {
    supportClasses: ["activity-green", "activity-red", "activity-orange"]
  };
},
methods: {
  _initScroll() {
    //默认上下滑动
    new BSscroll(".shop-info");
    //计算ul宽度，执行水平滑动
    const ul = this.$refs.picUl;
    const liWidth = 120; //li宽度
    const space = 6; //右边距宽度
    const count = this.info.pics.length; //图片数量
    ul.style.width = (liWidth + space) * count - space + "px";
    new BSscroll(".pic-wrapper", {
      scrollX: true // 水平滑动
    });
  }
},
watch: {
  info() {
    // 刷新流程--> 更新数据
    this.$nextTick(() => {
      this._initScroll();
    });
  }
},
mounted() {
  // 如果数据还没有, 直接结束
  if (!this.info.pics) {
    return;
  }
  // 数据有了, 可以创建BScroll对象形成滑动
  this._initScroll();
}
</script>
```

## 三、Search组件
* 根据关键字异步搜索显示匹配的商家列表
* 实现如果没有搜索结果的提示显示，v-if，v-else进行判断
* router-link 通过tag属性改变显示的标签

```html
<template>
  <section class="search">
    <HeaderTop title="搜索"/>
    <form class="search_form" @submit.prevent="search">
      <input
        type="search"
        name="search"
        placeholder="请输入商家或美食名称"
        class="search_input"
        v-model="keyword"
      >
      <input type="submit" name="submit" class="search_submit">
    </form>
    <!-- 定义noSearchShops属性，判断搜索结果是否有数据，有数据则显示，没有数据则显示提示 -->
    <section class="list" v-if="!noSearchShops">
      <ul class="list_container">
        <!--:to="'/shop?id='+item.id"-->
        <!-- tag属性<a>标签将会成为真实的链接 (并且可以获取到正确的跳转)，但是激活的类将会被应用在外部的<li>标签上。
          a标签替换为li标签 -->
        <router-link to="{path:'/shop', query:{id:item.id}}" tag="li"
        v-for="item in searchShops" :key="item.id" class="list_li">
          <section class="item_left">
            <img :src="imgBaseUrl + item.image_path" class="restaurant_img">
          </section>
          <section class="item_right">
            <div class="item_right_text">
              <p>
                <span>{{item.name}}</span>
              </p>
              <p>月售 {{item.month_sales||item.recent_order_num}} 单</p>
              <p>{{item.delivery_fee||item.float_minimum_order_amount}} 元起送 / 距离 {{item.distance}} 公里</p>
            </div>
          </section>
        </router-link>
      </ul>
    </section>
    <div class="search_none" v-else>很抱歉！无搜索结果</div>
  </section>
</template>

<script>
import { mapState } from "vuex";
import HeaderTop from "../../components/HeaderTop/HeaderTop.vue";
export default {
  data() {
    return {
      keyword: '',
      imgBaseUrl: 'http://cangdu.org:8001/img/',
      noSearchShops: false
    };
  },
  computed: {
    ...mapState(['searchShops'])
  },
  watch: {
    searchShops (value) {
      if(!value.length) {  //如果没有数据
        this.noSearchShops = true
      } else {  //如果有数据
        this.noSearchShops = false
      }
    }
  },
  methods: {
    search() {
      //得到搜索关键字,去除字符串的头尾空格
      const keyword = this.keyword.trim()
      //进行搜索
      if (keyword) {
        this.$store.dispatch('searchShops',keyword)
      }
    }
  },
  components: {
    HeaderTop
  }
};
</script>
```

## 四、项目优化
#### 1、缓存路由组件对象
* 通过keep-alive标签，缓存商家信息路由组件中的数据

```html
<template>
  <div>
    <ShopHeader></ShopHeader>
    <div class="tab">
      <div class="tab-item">
        <!-- 是否使用replace模式实现路由跳转 -->
        <router-link to="/shop/goods" replace>点餐</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/shop/ratings" replace>评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/shop/info" replace>商家</router-link>
      </div>
    </div>
    <!-- 缓存路由组件对象 -->
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>
```

#### 2、路由组件懒加载
* 使用函数的形式调用组件，实现进入组件时才进行加载，没有进入不加载
* 返回路由组件的函数, 只有执行此函数才会加载路由组件, 这个函数在请求对应的路由路径时才会执行

```js
// import Msite from '@/pages/Msite/Msite'
// import Order from '@/pages/Order/Order'
// import Profile from '@/pages/Profile/Profile'
// import Search from '@/pages/Search/Search'
/**
 * 路由组件懒加载
 * 拆分路由文件，按需加载需要的js
 */
const Msite = () => import('../pages/Msite/Msite.vue')
const Search = () => import('../pages/Search/Search.vue')
const Order = () => import('../pages/Order/Order.vue')
const Profile = () => import('../pages/Profile/Profile.vue')
```

#### 3、图片懒加载
1. 第一种：引入vue-lazyload插件

```js
import loading from './common/imgs/loading.gif'  //引入加载中图片
/**引入图片懒加载 */
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {  //内部自定义一个指令lazy
  loading
})
//使用
<img v-lazy="img">
```

2. 调用vant封装的图片懒加载模块

```js
import loading from './common/imgs/loading.gif'  //引入加载中图片
/**引入vant图片懒加载 */
import { Lazyload } from 'vant';
Vue.use(Lazyload, {
  loading
});

//使用
<img v-lazy="img">
```

#### 4、分析项目打包并优化
* 使用`npm run build --report`生成可视化页面，查看加载包的大小，对其进行优化
* 日期过滤器
  * 使用moment插件格式化日期格式，在build之后发现插件使用少，占用内存多，换用date-fns插件对项目进行优化

![优化前](https://upload-images.jianshu.io/upload_images/13505073-6322ea2083d1b4f2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![优化后](https://upload-images.jianshu.io/upload_images/13505073-a95e9b6fabba232f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

```js
import Vue from 'vue'
// import moment from 'moment'
import format from 'date-fns/format'
//自定义过滤器,格式化日期格式
Vue.filter('date-format', function (value, formatStr='YYYY-MM-DD HH:mm:ss') {
    if (!value) return ''
    // return moment(value).format(formatStr)
    return format(value, formatStr)
})

//使用
<div class="time">{{rating.rateTime | date-format}}</div>
```