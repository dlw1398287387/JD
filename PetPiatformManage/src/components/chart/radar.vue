<template>
<div>
  <v-chart force-fit="true" height="400" :padding="padding" :data="data" :scale="scale">
    <v-tooltip />
    <v-axis :dataKey="axis1Opts.dataKey" :line="axis1Opts.line" :tickLine="axis1Opts.tickLine" :grid="axis1Opts.grid" />
    <v-axis :dataKey="axis2Opts.dataKey" :line="axis2Opts.line" :tickLine="axis2Opts.tickLine" :grid="axis2Opts.grid" />
    <v-legend dataKey="user" marker="circle" :offset="30" />
    <v-coord type="polar" :radius="0.8" />
    <v-line position="item*score" color="user" :size="2" />
    <v-point position="item*score" color="user" :size="4" shape="circle" />
    <v-area position="item*score" color="user" />
  </v-chart>
</div>
</template>

<script>
const DataSet = require('@antv/data-set');

const sourceData = [
  { item: '狗粮', 上月: 70, 本月: 50 ,今日:31},
  { item: '猫粮', 上月: 60, 本月: 70 ,今日:25},
  { item: '追踪器', 上月: 50, 本月: 60 ,今日:42},
  { item: '补食机', 上月: 40, 本月: 50 ,今日:30},
  { item: 'app下载', 上月: 60, 本月: 70 ,今日:53},
  
];

const dv = new DataSet.View().source(sourceData);
dv.transform({
  type: 'fold',
  fields: ['上月', '本月','今日'],
  key: 'user',
  value: 'score',
});
const data = dv.rows;

const scale = [{
  dataKey: 'score',
  min: 0,
  max: 80,
}];

const axis1Opts = {
  dataKey: 'item',
  line: null,
  tickLine: null,
  grid: {
    lineStyle: {
      lineDash: null
    },
    hideFirstLine: false,
  }
};
const axis2Opts = {
  dataKey: 'score',
  line: null,
  tickLine: null,
  grid: {
    type: 'polygon',
    lineStyle: {
      lineDash: null,
    },
  },
};

export default {
  data() {
    return {
      data,
      scale,
      padding: [20, 20, 95, 20],
      axis1Opts,
      axis2Opts,
    };
  }
};
</script>
