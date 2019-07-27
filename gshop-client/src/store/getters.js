/*
包含多个基于state的getter计算属性的对象
 */

const getters = {
    //计算总数量，reduce()函数进行累加
  totalCount(state) {  
    return state.cartFoods.reduce((preTotal, food) => preTotal + food.count, 0)
  },
  //计算总价格
  totalPrice(state) {
    return state.cartFoods.reduce((preTotal, food) => preTotal + food.count * food.price, 0)
  },
  //计算满意度，看rateType的值是否为1，是则加一，0则不加
  positiveSize(state) {
    return state.ratings.reduce((preTotal, rating) => preTotal + (rating.rateType===0?1:0) ,0)
  }
}

export default getters
