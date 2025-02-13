import Vue from "vue";
export function style2obj(el) {
  const style = {}
  el.attributes().style.split(";").forEach(item => {
    const [key, value] = item.split(":");
    if (key && value) {
      style[key.trim()] = value.trim();
    }
  })
  Object.assign(style, window.getComputedStyle(el.element))
  return style;
}
let id = 0;

const createElm = function () {
  const elm = document.createElement('div');

  elm.id = 'app' + ++id;
  document.body.appendChild(elm);

  return elm;
};
/**
 * 创建一个 Vue 的实例对象
 * @param  {Object|String}  Compo   组件配置，可直接传 template
 * @param  {Boolean=false} mounted 是否添加到 DOM 上
 * @return {Object} vm
 */
export function createVue(Compo, mounted = false) {
  if (Object.prototype.toString.call(Compo) === '[object String]') {
    Compo = { template: Compo };
  }
  return new Vue(Compo).$mount(mounted === false ? null : createElm());
};