<template>
 <div class="header clearfix">
     <router-link :to="{name:'root'}">
     <img src="https://o4j806krb.qnssl.com/public/images/cnodejs_light.svg" alt="">
     </router-link>
     <ul>
        <li><a href="#">首页</a></li>
        <li><a href="#">入门</a></li>
        <li><a href="#">API</a></li>
        <li><a href="#">关于</a></li>
        <li><a href="#">注册</a></li>
        <li><a href="#">登录</a></li>
     </ul>
 </div>
</template>

<script>
export default {

}

</script>

<style scoped>

.header{
    background-color:rgb(68,68,68);
    height:50px;
}

img{
    margin-left:50px;
    margin-top:10px;
    max-width:120px;
}
ul{
    display: flex;
    flex-direction: row;
    float:right;
    margin:4px 50px 4px 4px;
}
li{
    padding:10px 15px;
}
a{
    color:#ccc;
    font-size:14px;
}
</style>