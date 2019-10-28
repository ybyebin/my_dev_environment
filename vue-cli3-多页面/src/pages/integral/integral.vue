<template>
  <div>
    <yd-tab>
      <yd-tab-panel label="积分明细">积分明细</yd-tab-panel>
      <yd-tab-panel label="积分规则">积分规则</yd-tab-panel>
    </yd-tab>
  </div>
</template>
<script>
import Vue from "vue";
import { Tab, TabPanel } from "vue-ydui/dist/lib.rem/tab";

Vue.component(Tab.name, Tab);
Vue.component(TabPanel.name, TabPanel);
export default {
  components: {},
  data() {
    return {};
  },
  computed: {},
  created: function() {},
  mounted: function() {},
  methods: {}
};
</script>
<style lang="less" scoped>
</style>
