<h1>Vue.js实现CNODE社区</h1>

<p>学习了Vue的知识，然后做了一个CNODE社区。</p>
<a href="https://zhuanlan.zhihu.com/p/39766800">博客地址</a>
<img src="https://i.loli.net/2018/07/15/5b4a29ebe1ac0.png" alt="">

<p><strong>关键词：</strong>vue-cli 、vue-router、vue-resource、filters、computed、组件通信、生命周期，MVVM，webpack。</p>
<p><strong>描述：</strong>使用vue-cli作为脚手架，使用vue-router进行前端路由的切换及传参，使用watch监听路由的变化，使用axios获取数据，JSON格式化工具对数据整理，webpack打包。</p>

<p><strong>源码链接：</strong>本页</p>
<p><strong>预览链接：</strong><a href="https://yuyunzhi.github.io/vue-cnode-social/dist/index.html#/">点这里查看</a></p>

<h2>一、准备工作</h2>
<h3>1、vue-cli、axios安装</h3>
<p>安装vue-cli</p>

```
//第一步全局安装，安装过后就不用安装了
npm install -g cnpm --registry=https://registry.npm.taobao.org
//第二步全局安装vue-cli,安装过后就不用安装了
cnpm install -g vue-cli
//第三步 初始化项目，需要router就选y
vue init webpack my-project
//第四步进入项目
cd my-project
//第五步安装依赖
npm install
//第六步启动项目
npm run dev
```
<p>安装axios</p>

```
npm install axios
```

<p>在main.js文件引入axios</p>

```
import Vue from 'vue'
import Axios from 'axios'
Vue.prototype.$http=Axios
```

<h3>2、组件通信</h3>

<p>查看我的这篇文章：<a href="https://zhuanlan.zhihu.com/p/38355450">Vue组件间是如何通信的？</a></p>

<h3>3、本地运行，打包，github预览</h3>

<p>本地运行</p>

```
npm run dev
```

<p>打包</p>

```
npm run build
//自动生成dist文件，入口为dist/index.html
```

<p>github预览</p>

```
直接把打包的内容上传到github上，是无法预览的
先在本地找到config/index.js，
把build里的 assetsPublicPath改为"./"（不是dev，不是dev，不是dev）
运行npm run build
找到.gitignore，把/dist/删掉
重新上传到github
在https://……/仓库名/dist/index.html可以预览了
```

<h2>二、用到vue的知识点</h2>

<h3>1、vue-router</h3>

<p>router-view 可以进行命名，指定对应的路由</p>

```
<div class="main">
    <router-view name="main"></router-view>
    <router-view name="SliderBar"></router-view>
</div>
```

<p>router/index.js</p>

```
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
```

<p>上述路由切换表示，当路由为'/'的时候，走main:PostList这个组件的路径；当路由为'/topic/:id&author=:name'的时候，同时走main:Article,SliderBar:SliderBar这两个组件的路径；</p>

<p>router-link 传参</p>

```
<router-link :to="{
    name:'post_content',
    params:{
      id:list.id,
      name:list.author.loginname
    }
    }">
      {{list.title}}
</router-link>
```
<img src="https://pic2.zhimg.com/v2-5dc5e05607856b8e9eb4a6888553640f_r.jpg" alt="">

<p>router-link 获取参数</p>

```
this.$route.params.id
this.$route.params.name
```

<p>有一种情况，路由虽然变了，但页面不跳转</p>
<p>有一种情况，路由虽然变了，但页面不跳转</p>
<p>有一种情况，路由虽然变了，但页面不跳转</p>

```
<img src="https://pic3.zhimg.com/v2-57fb803ef445c0e6939986bd82829135_r.jpg" alt="">
<img src="https://pic2.zhimg.com/v2-c5190a085c6dbef14ce683c5df690374_r.jpg" alt="">
<p>路径为topic，参数为id 和 name</p>
```

<p>如果在A页面点击两个链接都是跳转到B页面（只是参数不一样），那么B页面是无法监听到路由的变化，所以解决办法是使用watch在B页面监听路由。</p>

<p>watch监听路由变化</p>

```
watch:{
    '$route'(to,from){
    this.getArticleData()
    }
```

<p>to和from两个参数可以打印出来，当route发生变化的时候，就执行函数内容，比如发送请求。</p>

<h3>2、组件化及组件的引用</h3>

<p>组件化</p>
<img src="https://pic2.zhimg.com/80/v2-47ce10580047988f653a31034cfdf316_hd.jpg" alt="">

<p>组件引用</p>

```
//举例Pagination组件插入到PostList组件里
//在PostList组件里的script标签里引入
import Pagination from './Pagination'
//并在components里注入Pagination
  components:{
    Pagination
  }
//直接在PostList的<templete>使用
<Pagination></Pagination>
```

<h3>3、使用axios发送请求，拿到data</h3>

<p>先引入axios,上文已经写过了</p>
<p>在methods中使用</p>

```
getData(){
    this.$http.get('https://cnodejs.org/api/v1/topics',{
           params:{
             page:1,
             limit:20,
           }
         }).then((response)=>{
            //执行的内容
         }).catch((error)=>{
           console.log(ereror)
         })
       },
```

<p>get请求的url是后端的接口，用params传参。传参属性（如page,limit）也是由后端提供的post有两种传递参数的格式，在axios，post接受参数必须是form-data形式：</p>

```
form-data    ？page=1&limit=20
x-www-form-urlencoded    {page:1，limit=20}
```

<p>所以用qs.stringify（{}）来将x-www-form-urlencoded转化为form-data形式</p>

<p>安装qs：</p>

```
npm install qs
```

<p>使用方式：</p>

<img src="https://pic1.zhimg.com/80/v2-ae67d0a232d51bb518b6295a9223b407_hd.jpg" alt="">

<h2>三、再说说pagination分页器如何做的</h2>

<img src="https://pic4.zhimg.com/80/v2-82615f34de059f18ea38d57d5a193e0b_hd.jpg" alt="">

<p>html：</p>

```
<div class="pagination">
    <button @click="changeBtn('first')">首页</button>
    <button @click="changeBtn('pre')">上一页</button>
    <button v-if="jduge" class="pagebtn">......</button>
    <button v-for="btn in pagebtns"
    @click="changeBtn(btn)"
    :class="[{currentPage:btn == currentPage},'pagebtn']">
        {{btn}}
    </button>
    <button v-if="jduge" class="pagebtn">......</button>
    <button @click="changeBtn('next')">下一页</button>
</div>
```
<p>方法（就不用代码显示了），直接说思路</p>

<p>1、v-for渲染数组</p>

```
pagebtns:[1,2,3,4,5]
```

<p>2、鼠标点击pagebtns[4]出现pagebtns[4]+1，同时出现省略号</p>

<p>这句话的意思，当鼠标点击分页5（6,7,8,9……）的时候，出现分页6(7,8,9,10……)，同时出现省略号</p>

```
if(page == this.pagebtns[4] ){
    this.pagebtns.shift();//移除第一个元素
    this.pagebtns.splice(4,0,this.pagebtns[3]+1);//添加最后一个
}else if(page == this.pagebtns[0] && page !=1){
    //先在第一个位置加一个
    this.pagebtns.unshift(this.pagebtns[0]-1);
    //移除最后一个数字
    this.pagebtns.splice(5,1);
}
```

<p>3、点击首页，点击上一页，点击前一页</p>

```
if(page=="first"){
    this.currentPage=1
    this.jduge=false
    this.pagebtns=[1,2,3,4,5]
  }else if(page=='pre'){    
     page=this.currentPage//前一张，
     if(page<=1){
        page=2
        this.currentPage=1
     }else{
           if(page == this.pagebtns[0] && page !=1){
              if(page<=2){
                 this.jduge=false 
               } 
              //先在第一个位置加一个
              this.pagebtns.unshift(this.pagebtns[0]-1);
              //移除最后一个数字
              this.pagebtns.splice(5,1);
             }
      }
         this.currentPage=page-1
  
    }else if(page=='next'){
         page=this.currentPage//前一张，
         if(page == this.pagebtns[4] ){
              this.jduge=true
              this.pagebtns.shift();//移除第一个元素
              this.pagebtns.splice(4,0,this.pagebtns[3]+1);//添加最后一个
    }
              this.currentPage = page+1//下一张
  }
```

<p>4、发送请求，更新页面</p>

```
this.$emit('changePage',this.currentPage)
```
