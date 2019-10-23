<template>
	<div>
		<Global-PageHeader  :headline="headline" :describe="describe"></Global-PageHeader>
		<div style="margin: 20px;">
			<a-card>
	  			<a-steps :current="current" style="max-width: 750px;margin: 10px auto;">
			      <a-step title="填写转账信息" />
			      <a-step title="确认转账信息"/>
			      <a-step title="完成"/>
			    </a-steps>
			    <step1 v-if="current===0" @nextStep="nextStep"></step1>
			    <step2 v-if="current===1" @nextStep="nextStep" @prevStep="prevStep"></step2>
			    <step3 v-if="current===2" @nextStep="nextStep" @finish="finish"></step3>
	  		</a-card>
		</div>
	</div>
</template>

<script>

import GlobalPageHeader from '@/components/pages/GlobalPageHeader'
import step1 from '@/views/form/step/step1'
import step2 from '@/views/form/step/step2'
import step3 from '@/views/form/step/step3'

export default {
  data (){
    return {
      current:0,
      headline:'转账表单',
      describe:'认真确认转账信息，避免误操作，以免造成不必要损失！'
    };
  },
  methods: {
     nextStep () {
        if (this.current < 2) {
          this.current += 1
        }
     },
    prevStep () {
        if (this.current > 0) {
          this.current -= 1
        }
    },
    finish () {
        this.current = 0
    }
  },
  components:{
  	GlobalPageHeader,
  	step1,
  	step2,
  	step3
  }
};
</script>

<style scoped>
	.steps-content {
    margin-top: 16px;
    border: 1px dashed #e9e9e9;
    border-radius: 6px;
    background-color: #fafafa;
    min-height: 200px;
    text-align: center;
    padding-top: 80px;
  }

  .steps-action {
    margin-top: 24px;
  }
</style>