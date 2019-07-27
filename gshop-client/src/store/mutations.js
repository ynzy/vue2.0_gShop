/*
直接更新state的多个方法的对象
 */
import Vue from 'vue'
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RESET_USER_INFO,
  RECEIVE_INFO,
  RECEIVE_RATINGS,
  RECEIVE_GOODS,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT,
  CLEAR_CART,
  RECEIVE_SEARCH_SHOPS
} from './mutation-types'

const mutations = {
    [RECEIVE_ADDRESS](state,{address}) {
        state.address = address
    },

    [RECEIVE_CATEGORYS](state,{categorys}) {
        state.categorys = categorys
    },

    [RECEIVE_SHOPS](state,{shops}) {
        state.shops = shops
    },
    [RECEIVE_USER_INFO](state,{userInfo}) {
        state.userInfo = userInfo
    },
    [RESET_USER_INFO](state) {
        state.userInfo = {}
    },

    [RECEIVE_INFO](state,{info}) {
        state.info = info
    },
    [RECEIVE_RATINGS](state,{ratings}) {
        state.ratings = ratings
    },
    [RECEIVE_GOODS](state,{goods}) {
        state.goods = goods
    },

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
    [DECREMENT_FOOD_COUNT](state,{food}) {
        if(food.count) {  //只有有值大于0才减
          food.count--
          if(food.count===0) {
            //将food从cartFoods中移除
            state.cartFoods.splice(state.cartFoods.indexOf(food), 1)
          }
        }
    },

    [CLEAR_CART](state) {
      //清除food中的count
      state.cartFoods.forEach(food => food.count = 0);
      //移除购物车中所有购物项
      state.cartFoods = []
    },

    [RECEIVE_SEARCH_SHOPS](state, {searchShops}) {
        state.searchShops = searchShops
    },
}

export default  mutations
