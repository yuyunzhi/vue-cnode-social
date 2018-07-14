<template>
  <div  class="app"id="app clearfix">

    <Header></Header>
    <div class="main">
     <router-view name="main"></router-view>
     <router-view name="SliderBar"></router-view>
    </div>
  </div>
</template>

<script>
import Header from './components/Header'
import PostList from './components/PostList'

export default {
  name: 'App',
  components:{
    Header,PostList
  }
}
</script>

<style>

*{
  margin:0;
  padding:0;
}
ul,li,input,a{
  list-style:none;
  outline: none;
  text-decoration:none;
}

.clearfix{
  content:'';
  clear: both;
  display: block;
}

[v-cloak]{
  display: none;
}

.main{
  width:85%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
}

.app{
  background-color:#e1e1e1;
}
</style>
