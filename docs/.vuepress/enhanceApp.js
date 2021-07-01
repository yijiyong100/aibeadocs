import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import TestCommP from './theme/components/TestCommP.vue'



export default ({ Vue, options, router, siteData }) => {
  Vue.use(Element);
  Vue.component('TestCommP', TestCommP)
};