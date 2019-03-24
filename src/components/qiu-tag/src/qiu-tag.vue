<template>
    <transition name="fade">
        <div :class="classes" v-if="show">
        	<span ><slot></slot></span>
        	<QiuIcon v-if="closable" type="icon-close" @click="handlerClick"></QiuIcon>
        </div>
    </transition>

</template>

<script>

import QiuIcon from '../../qiu-icon/src/qiu-icon' 
const preCls='qiu-tag'
	export default{
		name:'QiuTag',
		components:{QiuIcon},
		props:{
			name:{//当前标签的名称
				type:[String,Number]
			},
			closable:{//标签是否可关闭
				type:Boolean,
				default:false
			},
			color:{//标签颜色
				type:String,
				default:''
			},
			size:{//标签大小
				type:[String,Number],
				default:''
			},
			type:{//标签样式   暂时只有border
				type:String,
				default:''
			}
		},
		data(){
			return {
				show:true //是否显示标签  可关闭标签时控制
			}
		},
		computed:{
			classes(){
				return [
				  `${preCls}`,
				  {
				  	[`${preCls}-${this.color}`]: !!this.color,
				  	[`${preCls}-${this.type}`] : !!this.type
				  }
				];
			}
		},
		methods:{
			handlerClick(event){
				this.show=false;
				this.$emit('on-close',event);
			}
		}
	}
</script>