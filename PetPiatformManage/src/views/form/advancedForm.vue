<template>
	<div>
		<Global-PageHeader :headline="headline" :describe="describe"></Global-PageHeader>
		<a-locale-provider :locale="locale">
		<a-form id="components-form-demo-normal-login" :form="form" class="login-form">
	  	<a-card title="仓库管理" style="margin: 20px;">
		    <a-row :gutter="52">
		    	<!--仓库名-->
		    	<a-col :xl="8" :md="8" :xs="24">
		    		<a-form-item label="仓库名">     
			          <a-input
			          	 v-decorator="[ 
			          	 'warehouse',
			          	  { 
			          	  	rules: [{ required: true, message: '请输入您的仓库名称，此项不可为空！' }] 
			          	  }
			          	  ]" placeholder="请输入仓库名称"/>
			        </a-form-item>
		    	</a-col>
		    	<!--仓库域名-->
		    	<a-col :xl="8" :md="8" :xs="24">
		    		<a-form-item label="仓库域名">
			          <a-input style="margin-top: 2.5px;" addonBefore="Http://" addonAfter=".com" placeholder="请输入" />
			        </a-form-item>
		    	</a-col>
		    	<!--仓库管理人员-->
		    	<a-col :xl="8" :md="8" :xs="24">
		    		<a-form-item label="仓库管理员" >
			          <a-input-group compact>
					    <a-select style="width: 100%;margin-top: 2.5px;" placeholder="请选择仓库管理员">
					      <a-select-option value="jack">Jack</a-select-option>
					      <a-select-option value="tom">Tom</a-select-option>
					    </a-select>
					  </a-input-group>
			        </a-form-item>
		    	</a-col>
		    </a-row>
		    <a-row :gutter="52">
		    	<!--评审人-->
		    	<a-col :xl="8" :md="8" :xs="24">
		    		<a-form-item label="审批人"> 
			          <a-input-group compact>
					    <a-select style="width: 100%;margin-top: 2.5px;" placeholder="请选择审批人">
					      <a-select-option value="jack">Jack</a-select-option>
					      <a-select-option value="tom">Tom</a-select-option>
					    </a-select>
					  </a-input-group>
			        </a-form-item>
		    	</a-col>
		    	<!--有效期-->
		    	<a-col :xl="8" :md="8" :xs="24">
		    		<a-form-item label="生效日期"> 
			          	<a-range-picker
					      :disabledDate="disabledDate"
					      :disabledTime="disabledRangeTime"
					      :showTime="{
					        hideDisabledOptions: true, 
					        defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')]
					      }"
					      format="YYYY-MM-DD HH:mm:ss"
					      style="width: 100%;"
					    />
			        </a-form-item>
		    	</a-col>
		    	<!--仓库类型-->
		    	<a-col :xl="8" :md="8" :xs="24">
		    		<a-form-item label="仓库类型">
		    		  <a-input-group compact>
					    <a-select style="width: 100%;margin-top: 2.5px;" placeholder="请选择仓库">
					      <a-select-option value="特大仓">特大仓</a-select-option>
					      <a-select-option value="大仓">大仓</a-select-option>
					      <a-select-option value="中仓">中仓</a-select-option>
					      <a-select-option value="小仓">小仓</a-select-option>
					    </a-select>
					  </a-input-group>
		    		</a-form-item>
		    	</a-col>
		    </a-row>
		</a-card>
		
		<a-card title="任务管理" style="margin: 20px;">
			<a-row :gutter="52">
				<!--任务名称-->
				<a-col :xl="8" :md="8" :xs="24">
					<a-form-item label="任务名">
						<a-input placeholder="请输入任务名"/>
					</a-form-item>
				</a-col>
				<!--任务描述-->
				<a-col :xl="8" :md="8" :xs="24">
					<a-form-item label="任务描述">
						<a-input placeholder="请输入任务描述"/>
					</a-form-item>
				</a-col>
				<!--任务具体执行人-->
				<a-col :xl="8" :md="8" :xs="24">
					<a-form-item label="执行人">
						<a-input-group compact>
					    <a-select style="width: 100%;margin-top: 2.5px;" placeholder="请选择执行人">
					      <a-select-option value="曲丽丽">曲丽丽</a-select-option>
					      <a-select-option value="高明明">高明明</a-select-option>
					    </a-select>
					  </a-input-group>
					</a-form-item>
				</a-col>
			</a-row>
			
			<a-row :gutter="52">
				<!--任务责任人-->
				<a-col :xl="8" :md="8" :xs="24">
					<a-form-item label="责任人">
						<a-input-group compact>
							<a-select style="width: 100%;margin-top: 2.5px;" placeholder="请选择责任人">
						      <a-select-option value="曲丽丽">曲丽丽</a-select-option>
						      <a-select-option value="高明明">高明明</a-select-option>
						    </a-select>
						</a-input-group>
					</a-form-item>
				</a-col>
				<!--任务提醒-->
				<a-col :xl="8" :md="8" :xs="24">
					<a-form-item label="提醒时间">
						<a-date-picker
					      format="YYYY-MM-DD HH:mm:ss"
					      :disabledDate="disabledDate"
					      :disabledTime="disabledDateTime"
					      :showTime="{ defaultValue: moment('00:00:00', 'HH:mm:ss') }"
					      style="width: 100%;"
					    />
					</a-form-item>
				</a-col>
				<!--任务类型-->
				<a-col :xl="8" :md="8" :xs="24">
					<a-form-item label="任务类型">
						<a-input-group compact>
							<a-select style="width: 100%;margin-top: 2.5px;" placeholder="请选择任务类型">
						      <a-select-option value="定时任务">定时任务</a-select-option>
						      <a-select-option value="定期任务">定期任务</a-select-option>
						    </a-select>
						</a-input-group>
					</a-form-item>
				</a-col>
			</a-row>
		</a-card>
		</a-form>
		
		
		
	  	<a-card style="margin: 20px;">	 
		    <a-upload
		      action="//jsonplaceholder.typicode.com/posts/"
		      listType="picture-card"
		      :fileList="fileList"
		      :multiple="multiple"
		      @preview="handlePreview"
		      @change="handleChange"
		    >
		      <div v-if="fileList.length < 8">
		        <a-icon type="plus" />
		        <div class="ant-upload-text">Upload</div>
		      </div>
		    </a-upload>
		    <!-- 查看图片的遮罩层   -->
		    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
		      <img alt="example" style="width: 100%" :src="previewImage" />
		    </a-modal>
	    </a-card>	 
	   </a-locale-provider>
  	</div>
</template>
<script>
	
import GlobalPageHeader from '@/components/pages/GlobalPageHeader';
import moment from 'moment';
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';
export default {
  data () {
    return {
      locale: zhCN,
      multiple:true,
      previewVisible: false,
      previewImage: '',
      fileList: [{
        uid: '1',
        name: 'xxx.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      }],
      headline:'高级表单',
      describe:'高级表单常见于一次性输入和提交大批量数据的场景。'
    }
  },
  methods: {
  	moment,
    handleCancel () {
      this.previewVisible = false
    },
    handlePreview (file) {
      console.log(file)
      this.previewImage = file.url || file.thumbUrl
      this.previewVisible = true
    },
    handleChange ({ fileList }) {
      this.fileList = fileList
    },
    
    /**
     * 时间控件支持的方法
     */
    range(start, end) {
      const result = [];
      for (let i = start; i < end; i++) {
        result.push(i);
      }
      return result;
    },
    disabledDate(current) {
      // Can not select days before today and today
      return current && current < moment().endOf('day');
    },
    disabledDateTime() {
      return {
        disabledHours: () => this.range(0, 24).splice(4, 20),
        disabledMinutes: () => this.range(30, 60),
        disabledSeconds: () => [55, 56],
      };
    },
    disabledRangeTime(_, type) {
      if (type === 'start') {
        return {
          disabledHours: () => this.range(0, 60).splice(4, 20),
          disabledMinutes: () => this.range(30, 60),
          disabledSeconds: () => [55, 56],
        };
      }
      return {
        disabledHours: () => this.range(0, 60).splice(20, 4),
        disabledMinutes: () => this.range(0, 31),
        disabledSeconds: () => [55, 56],
      };
    },
  },
  beforeCreate () {
    this.form = this.$form.createForm(this);
  },
  watch:{
  	fileList(value){
  		console.log(value)
  	}
  },
  components:{
  	GlobalPageHeader
  }
}
</script>
<style>
  /* you can make up upload button and sample style by using stylesheets */
  .ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
  }

  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }
</style>
