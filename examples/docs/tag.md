<script>
  export default{
    data(){
      return{
         tags:[0,1]  //标签默认数量
      }
    },
    methods:{
      addTag(){
        if(this.tags.length){
          this.tags.push(this.tags[this.tags.length-1]+1);
        }else{
          this.tags.push(0);
        }
      },
      closeTag(event,name){
        const index=this.tags.indexOf(name);
        this.tags.splice(index,1);
      }
    }
  }
</script>


# QiuTag 标签

----
### 基础使用
标签的默认样式与可关闭的标签，添加```closable```可关闭标签

<div class="demo-block">
  <qiu-tag>标签一</qiu-tag>
  <qiu-tag closable>标签二</qiu-tag>
</div>

::: demo
```html
  <qiu-tag>标签一</qiu-tag>
  <qiu-tag closable>标签二</qiu-tag>
```
:::

### 标签颜色定义
可使用```color```属性定义不同的标签颜色样式
<div class="demo-block">
  <qiu-tag color="primary">标签一</qiu-tag>
  <qiu-tag color="success">标签二</qiu-tag>
  <qiu-tag color="warning">标签三</qiu-tag>
  <qiu-tag color="error">标签四</qiu-tag>
  <br><br>
  <qiu-tag color="blue">标签五</qiu-tag>
  <qiu-tag color="green">标签六</qiu-tag>
  <qiu-tag color="yellow">标签七</qiu-tag>
  <qiu-tag color="red">标签八</qiu-tag>
  <br>
  <qiu-tag closable type="border" color="primary">标签10</qiu-tag>
  <qiu-tag closable type="border" color="success">标签11</qiu-tag>
  <qiu-tag closable type="border" color="warning">标签12</qiu-tag>
  <qiu-tag closable type="border" color="error">标签13</qiu-tag>
</div>

::: demo
```html
  <qiu-tag color="primary">标签一</qiu-tag>
  <qiu-tag color="success">标签二</qiu-tag>
  <qiu-tag color="warning">标签三</qiu-tag>
  <qiu-tag color="error">标签四</qiu-tag>
  <qiu-tag color="blue">标签五</qiu-tag>
  <qiu-tag color="green">标签六</qiu-tag>
  <qiu-tag color="yellow">标签七</qiu-tag>
  <qiu-tag color="red">标签八</qiu-tag>
  <qiu-tag closable type="border" color="primary">标签10</qiu-tag>
  <qiu-tag closable type="border" color="success">标签11</qiu-tag>
  <qiu-tag closable type="border" color="warning">标签12</qiu-tag>
  <qiu-tag closable type="border" color="error">标签13</qiu-tag>
```
:::
### 添加多个标签
<div class="demo-block">
  <qiu-tag v-for="tag in tags" :key="tag" :name="tag" closable @on-close="closeTag">标签{{tag+1}}</qiu-tag>
  <qiu-button icon="icon-plus" size="small" @click="addTag">添加标签</qiu-button>
</div>

::: demo
```html
<template>
  <qiu-tag v-for="tag in tags" :key="tag" :name="tag" closable on-close="closeTag">标签{{tag+1}}</qiu-tag>
  <qiu-button icon="icon-plus" size="small" @click="addTag">添加标签</qiu-button>
</template>
<script>
  export default{
    data(){
      return{
         tags:[0,1]  //标签默认数量
      }
    },
    methods:{
      addTag(){
        if(this.tags.length){
          this.tags.push(this.tags[this.tags.length-1]+1);
        }else{
          this.tags.push(0);
        }
      },
      closeTag(event,name){
        const index=this.tags.indexOf(name);
        this.tags.splice(index,1);
      }
    }
  }
</script>
```
:::


## API
#### qiu-tag属性
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| size     | 尺寸，标签的大小   | string/Number  |   —    |    —     |
| color | 颜色，16进制颜色值或其他都可以| String  |  —  |  —  |
| type  | 样式，暂时只支持```border``` | string   |  —  |  —  |
| closable  | 是否可关闭 | Boolean   |  —  |  false  |
| name  | 标签名称，对```v-for```时有用，用于关闭标签 | string   |  —  |  —  |

#### qiu-tag事件
| 事件名      | 说明    | 返回值   |
|---------- |-------- |---------- |
| on-close     | 标签关闭时触发   | event,name |


