import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import TestCommP from './theme/components/TestCommP.vue'
import AtricleVisit from './theme/components/AtricleVisit.vue'



export default ({ Vue, options, router, siteData }) => {
  Vue.use(Element);
  Vue.component('TestCommP', TestCommP)
  Vue.component('AtricleVisit', AtricleVisit)
};