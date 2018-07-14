<template>
 <div class="UserInfo">
     <div class="background"></div>
 <!--在数据未返回的时候，显示这个正在加载的gif-->
  <div class="loading" v-if="isLoading">
    <img src="../assets/loading.gif" >
  </div>
  <div class="userInfomation" v-else>
    <section class="mainPage">
        <router-link :to="{
          name:'root'
          }">
        <div>主页 / </div>
        </router-link>
      <img :src="userinfo.avatar_url" >
      <span>{{userinfo.loginname}}</span>
      <p>
        {{userinfo.score}}积分
      </p>
      <p>
        注册时间：{{userinfo.create_at | formatDate}}
      </p>
    </section>
    <div class="replies" v-if="hasReplies">
      <p>回复的主题</p>
      <ul>
        <li v-for="item in userinfo.recent_replies">
          <router-link :to="{
          name:'post_content',
          params:{
            id:item.id
          }
          }">
            {{item.title}}
          </router-link>
        </li>
      </ul>
    </div>
    <div class="topics"v-if="hasTopics">
      <p>创建的主题</p>
      <ul>
        <li v-for="item in userinfo.recent_topics">
          <router-link :to="{
          name:'post_content',
          params:{
            id:item.id
          }
          }">
            {{item.title}}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
 </div>
</template>

<script>
export default {
 name: "UserInfo",
    data(){
        return {
        isLoading:false,
        userinfo:{},
        hasReplies:true,
        hasTopics:true,
        }
    },
    methods:{
        getData(){
            this.$http.get(`https://cnodejs.org/api/v1/user/${this.$route.params.name}`)
            .then(res=>{
                this.isLoading = false; //加载成功，去除动画
                this.userinfo = res.data.data;
                if(this.userinfo.recent_replies.length<=0){
                    this.hasReplies=false
                }
                if(this.userinfo.recent_topics<=0){
                     this.hasTopics=false
                }
            })
            .catch(function (err) {
                //处理返回失败后的问题
                console.log(err)
            })
        }
    },
    beforeMount(){
        this.isLoading = true;//加载成功之前显示加载动画
        this.getData();//在页面加载之前获取数据
    }  
}

</script>

<style scoped>
.UserInfo{
      background-color: #e1e1e1;
      width:100%;
}
.background{
  width:100%;
  height:15px;
  background-color: #e1e1e1;
}
 .userInfomation {
    background: white;
    width: 80%;
    margin: 10px auto;
  }
  .userInfomation section {
    padding: 12px;
  }
  .userInfomation img {
    width: 30px;
  }
  .userInfomation li {
    list-style:none;
  }
  .userInfomation .replies,
  .userInfomation .topics {
    font-size: 0.72rem;
    border-top: 10px #DDDDDD solid;
  }
  .userInfomation > div > p {
    padding: 12px 0 12px 12px;
    background-color: rgba(212, 205, 205, 0.17);
    font-size: 0.75rem;
    margin: 0;
  }
  .userInfomation > div >ul > li {
    padding: 4px 0 4px 12px;
    white-space: nowrap;
    font-size: 0.72rem;
    text-overflow: ellipsis;
    overflow: hidden;
    line-height: 30px;
    vertical-align: middle;
  }
  .userInfomation > div >ul > li > a {
    color: #094E99;
    text-decoration: none;
  }
</style>