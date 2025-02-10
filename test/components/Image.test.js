import { expect, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import Image from '../../uni_modules/stellar-ui/components/ste-image/ste-image.vue';
import { style2obj } from '../methods';

test('Image Comp', async () => {

  const wrapper = mount(Image, {
    propsData: {
      width: 120,
      src: "https://image.whzb.com/chain/StellarUI/%E6%94%AF%E4%BB%98%E5%AE%9D.png",
    },
  });
  await nextTick();

  const view = wrapper.find('.ste-image-root');
  const style = style2obj(view)
  expect(style["--image-root-width"]).toEqual("60px");
  const img = wrapper.find('.content');
  const imgStyle = style2obj(img)
  expect(imgStyle["opacity"]).toEqual("1");
})