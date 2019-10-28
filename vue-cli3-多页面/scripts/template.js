module.exports = {
    vueTemplate: name => {
        return `<template>
    <div></div>
</template>
<script>
export default {
    components: {},
    data() {
      return {};
    },
    computed: {},
    created: function() {},
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
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="viewport"
        content="width=device-width, initial-scale=1.0,minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title></title>
    <script>
    !function (window) {
        var docWidth = 750; var doc = window.document, docEl = doc.documentElement, resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'; var recalc = (function refreshRem() { var clientWidth = docEl.getBoundingClientRect().width; docEl.style.fontSize = Math.max(Math.min(20 * (clientWidth / docWidth), 11.2), 8.55) * 5 + 'px'; return refreshRem; })(); docEl.setAttribute('data-dpr', window.navigator.appVersion.match(/iphone/gi) ? window.devicePixelRatio : 1); if (/iP(hone|od|ad)/.test(window.navigator.userAgent)) {
            doc.documentElement.classList.add('ios'); if (parseInt(window.navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/)[1], 10) >= 8)
                doc.documentElement.classList.add('hairline');
        }
        if (!doc.addEventListener) return; window.addEventListener(resizeEvt, recalc, false); doc.addEventListener('DOMContentLoaded', recalc, false);
    }(window);
    </script>
</head>
<body>
    <div id="app"></div>
    <!-- built files will be auto injected -->
</body>
</html>`,
    entryTemplate: name => {

        return `import Vue from 'vue'
import App from './${name}.vue'
import '../../assets/less/reset.less'

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
