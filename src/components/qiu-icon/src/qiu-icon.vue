<template>
	<i :class="classes" :style="styles" @click="handleClick"></i>
</template>

<script>
   const prefixaClss='iconfont'
	export default{
		
		name: 'QiuIcon',
		props:{
			type:{ //图标类别
				type:String,
				default:''
			},
			size:[String,Number],//图标大小
			color:String //图标颜色
		},
		computed:{
			classes(){
				return [`${prefixaClss}`,
				   {
				   	 [`${this.type}`]:this.type!=''
				   }
				];
			},
			styles(){
				let style={};
				if(this.size){
					style['font-size']=`${this.size}px`;
				}
				if(this.color){
					style.color=this.color;
				}
				return style;
			}
		},
		methods:{
			handleClick(event){
				this.$emit('click',event);
			}
		}

	}
</script>