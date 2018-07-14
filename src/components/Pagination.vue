<template>
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
</template>

<script>

export default {
    name: "Pagination",
    data(){
        return {
            pagebtns:[1,2,3,4,5],
            currentPage:1,
            jduge:false,

        }
    },
    methods:{       
        changeBtn(page){
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
            }else{
                this.currentPage = page
                if(page>4){
                    this.jduge = true;
                }else{
                    this.jduge = false;
                }
                if(page == this.pagebtns[4] ){
                    this.pagebtns.shift();//移除第一个元素
                    this.pagebtns.splice(4,0,this.pagebtns[3]+1);//添加最后一个
                }else if(page == this.pagebtns[0] && page !=1){
                //先在第一个位置加一个
                    this.pagebtns.unshift(this.pagebtns[0]-1);
                        //移除最后一个数字
                    this.pagebtns.splice(5,1);
                }
            }
            this.$emit('changePage',this.currentPage)
        }

    }
 
}

</script>

<style scoped>
.pagination {
    margin-top: 5px;
    margin-bottom: 20px;
    background-color: white;
    padding: 6px 20px;
    border-radius: 5px;
    /*box-shadow: 0px 2px 9px #888888;*/
    border: 1px solid #888888;
  }

  button {
    background-color: #fff;
    border: 1px solid #ddd;
    color: #778087;
    border-radius: 3px;
    outline: none;
    height: 21px;
    cursor: pointer;
    padding: 0 2px;
    width: 55px;
    height: 29px;
  }

  .pagebtn {
    position: relative;
    bottom: 1px;
    width: 40px;
    margin: 0 4px;
  }

  .currentPage {
    color: white;
    background-color: #1f1b1b;
  }

</style>