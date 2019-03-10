<template>
    <button class="qiu_btn" 
            @click="handleClick" 
            :disabled="disabled" 
            :class="['qiu_btn--'+type,
                   {'is-plain':plain,'is-disabled':disabled,'is-radius':round},
                   'qiu_btn--size-'+size]">
            <i class="iconfont" :class="icon" v-if="icon"></i>
            <slot></slot>      
    </button>
</template>
<script>
export default {
    name: 'QiuButton',
    props:{
      type:{//按钮类型 
        type:String,
        default:'default'
      },
      size:{//按钮大小
        type:String,
        default:'default'
      },
      icon:{//按钮图标
        type:String,
        default:''
      },
      loading:{//是否处于加载中
        type:Boolean,
        default:false
      },
      plain: Boolean,
      disabled: Boolean,
      round: Boolean
    },
    methods:{
      handleClick (event) {
        if (this.disabled) return
        this.$emit('click', event)// 传播方法名为click，你也可以自定义其他名字
      }
    }
}
</script>




