export function style2obj(el) {
  const style = {}
  el.attributes().style.split(";").forEach(item => {
    const [key, value] = item.split(":");
    if (key && value) {
      style[key.trim()] = value.trim();
    }
  })
  return style;
}