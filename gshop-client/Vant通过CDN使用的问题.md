* vant中有一些组件不能直接使用，需要vant.xxx才能使用

```js
//使用vant图片懒加载
Vue.use(vant.Lazyload,{
	preLoad: 1.3,
	loading: './img/loading.gif',
	attempt: 1
});
//使用轻提示
vant.Toast('没有更多了');
```