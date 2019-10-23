<template>
	<a-card :bordered="false" style="margin-bottom: 10px;">
		<!-- 组件头部部分  -->
		<div style="color: rgba(0, 0, 0, .45);">
			<span>{{CardTitle}}</span>
			<span class="chart-card-action">
	        <slot name="card-action"></slot>
	    </span>
		</div>
		<!-- 组件内容部分 -->
		<div class="total"><span>{{ total }}</span></div>
		<div class="chart-card-content">
			<div class="content-fix">
				<slot name="card-content"></slot>
			</div>
		</div>
		<!-- 组件底部 -->
		<div class="chart-card-footer">
			<div class="field">
				<slot name="card-footer"></slot>
			</div>
		</div>
	</a-card>
</template>

<script>
	export default {
		name: 'card',
		data() {
			return {

			}
		},
		props: {
			CardTitle: {
				type: String,
				default: ''
			},
			total: {
				type: String,
				default: ''
			}
		}
	}
</script>

<style>
	.chart-card-action {
		cursor: pointer;
		position: absolute;
		/*top: 0;*/
		right: 30px;
		
	}
	
	.total {
		overflow: hidden;
		text-overflow: ellipsis;
		word-break: break-all;
		white-space: nowrap;
		color: #000;
		margin-top: 4px;
		margin-bottom: 0;
		font-size: 30px;
		line-height: 38px;
		height: 38px;
	}
	
	.chart-card-content {
		margin-bottom: 12px;
		position: relative;
		height: 46px;
		width: 100%;
	}
	
	.content-fix {
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
	}
	
	.chart-card-footer {
		border-top: 1px solid #e8e8e8;
		padding-top: 9px;
		margin-top: 8px;
	}
	
	.field {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		margin: 0;
	}
</style>