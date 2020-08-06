import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    favorCourseList: []
  },
  mutations: {
    addFavorCourse(state, payload) {
      let existCourseObj = state.favorCourseList[0] || null
   
      existCourseObj = state.favorCourseList.find(item => {
        // 這裡絕對不能直接用對象比較，因為跳轉換面的時候vue會刷新一次，導致第二次傳進來的payload雖然長得一模一樣，但是對象是新創造的所以不一樣
        return item.course === payload.course
      });
      if (!!existCourseObj) {
        return 
      } else {
        state.favorCourseList.push(payload)
      }
    },
    delFavorCourse(state, payload) {
      state.favorCourseList = state.favorCourseList.filter(item => {
        return item.course != payload
      })
    }
  },
  actions: {
  },
  modules: {
  }
})
