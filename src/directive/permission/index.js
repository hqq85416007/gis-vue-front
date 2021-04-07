import hasRole from './hasRole'

const install = function(Vue) {
  Vue.directive('hasRole', hasRole)
}

if (window.Vue) {
  window['hasRole'] = hasRole
  Vue.use(install); // eslint-disable-line
}

hasRole.install = install
export default hasRole
