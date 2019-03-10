/**
 * @author monkeywang
 * Date: 17/11/9
 */
//require('../../qiu-style/button.css');
import Button from './src/qiu-button.vue';

Button.install = function (Vue) {
  Vue.component(Button.name, Button);
};

export default Button;
