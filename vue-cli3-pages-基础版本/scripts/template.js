module.exports = {
    vueTemplate: name => {
        return `<template>
    <div></div>
</template>
<script>
export default {
  data() {
    return {}
  },
  created:{},
  components: {},
  computed:{},
  mounted: function() {},
  methods: {}
}
</script>
<style lang="less" scoped>

</style>
`
    },
    htmlTemplate: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
      
</head>
<body>
    <div id="app"></div>
    <!-- built files will be auto injected -->
</body>
</html>`,
    entryTemplate: name => {
       
        return `import Vue from 'vue'
import App from './${name}.vue'
import 'iview/dist/styles/iview.css'
Vue.config.productionTip = false
            
new Vue({
    render: h => h(App)
}).$mount('#app')`
    },
    componentTemplate: name => {
        return `<template>
    <div></div>
</template>
<script>
export default {
  name: "${name}",
  props: {},
  data() {
    return {}
  },
  watch:{},
  created:{},
  components: {},
  computed:{},
  mounted: function() {},
  methods: {}
}
</script>
<style lang="less" scoped>

</style>
`
    },

}
