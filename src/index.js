/**
 * @author monkeywang
 * Date: 17/11/9
 */
//require('./qiu-style/index.css');
//require('./qiu-style/button.css');
//require('./qiu-style/iconfont.css');
import './qiu-style/index.scss'

import MetaInfo from './components/meta-info/index'

import WLoadingBar from './components/loading-bar/index'
import Skeleton from './components/skeleton/index'

import QiuButton from './components/qiu-button/index';
import QiuIcon from './components/qiu-icon/index';
import QiuTag from './components/qiu-tag/index';

const components = [
  Skeleton,
  QiuButton,
  QiuIcon,
  QiuTag
]

const install = function(Vue) {
  if (install.installed) return
  components.map(component => Vue.component(component.name, component))
  MetaInfo.install(Vue)
  Vue.prototype.$loading = WLoadingBar
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  QiuButton
}
