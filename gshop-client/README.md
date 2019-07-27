# gshop

## npm 安装
* npm install --save swiper 安装swiper
* npm i vant -S 安装vant
* npm install -S axios 安装axios
* npm install vuex --save 安装vuex
* npm install mockjs   安装mockjs
* npm install better-scroll  滚动插件  
* npm i vue-lazyload -S   图片懒加载
* npm i moment -S 引入日期格式化
* npm i date-fns -S 轻量级格式化日期代替moment
## 讲解你的项目
1. 项目描述
* 是哪一方面的项目：前后端分离的SPA应用，外卖app
* 有哪些功能模块：
* 主要用到的技术：
* 项目的开发模式：模块化，组件化，工程化
2. 技术选型，技术架构(主要用到了哪些技术)
* vue技术栈(vue全家桶)
* 使用axios库发送ajax请求
* 有postman接口测试，模拟数据mockjs
* 基于promise使用async、await
* ES6模块，babel
* 项目构建，组件化webpack
* 工程化使用脚手架，使用eslint检查代码
* css预编译器，stylus

## 什么是API接口
* url，请求方式，请求参数的格式，响应数据的格式
* 测接口： postman测试通不通，对比文档是否一致，
* 调接口
* 对接口

## 你能从项目中学习到什么
* 开发方式、模式
* 学习到一些插件，库
* 页面布局

## vuex 
1. 调用action
2. 读取state数据
3. 模板显示数据

## 轮播图

## ajax异步加载
* 异步显示数据，先显示初始数据，再显示获取的数据

## JSON
* JSON分为json对象和json数组，
* 结构：名称/数据类型
* 结构 + value值，值可以变，结构不可以变

## 商品列表滑动功能
1. 功能：
   * 实现两个列表滑动
   * 凸显当前分类
   * 当滑动右侧列表时，更新当前分类
   * 点击某个分类项，右侧列表滑动到对应位置
2. 分析
   * 类名：current 标识当前分类
   * 设计一个计算属性： currentIndex
   * 根据哪些数据计算？
     * scrollY： 右侧活动的Y坐标轴（滑动过程是实时变化的）
     * tops： 所有右侧分类li的top组成的数组（列表第一次显示后就不再变化）
3. 编码
   * 在滑动过程中，实时收集scrollY
   * 在列表第一次显示后，收集tops
   * 实现currentIndex的计算逻辑

## 
* 界面的展现是根据数据进行展现的
* 