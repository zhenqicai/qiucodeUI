import Tag from './src/qiu-tag.vue';

Tag.install = function (Vue) {
  Vue.component(Tag.name, Tag);
};

export default Tag;