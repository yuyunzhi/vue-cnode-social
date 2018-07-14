import Vue from 'vue'
import Router from 'vue-router'
import PostList from '../components/PostList'
import Article from '../components/Article'
import UserInfo from '../components/UserInfo'
import SliderBar from '../components/SliderBar'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      components: {
        main:PostList
      }
    },
    {
      path: '/topic/:id&author=:name',
      name: 'post_content',
      components:{
        main:Article,
        SliderBar:SliderBar
      } 
    },
    {
      path: '/user_info/:name',
      name: 'user_info',
      components: {
        main:UserInfo
      }
    }
  ]
})
