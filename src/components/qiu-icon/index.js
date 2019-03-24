import Icon from './src/qiu-icon.vue';

Icon.install = function (Vue) {
  Vue.component(Icon.name, Icon);
};

export default Icon;