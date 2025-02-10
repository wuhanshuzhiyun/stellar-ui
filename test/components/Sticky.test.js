import { expect, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import Sticky from '../../uni_modules/stellar-ui/components/ste-sticky/ste-sticky.vue';
import { style2obj } from '../methods';

test('Sticky Comp', async () => {
  const wrapper = mount(Sticky, {
    propsData: {
      offsetTop: 120,
    },
  });
  await nextTick();

  const view = wrapper.find('.ste-sticky');
  const style = style2obj(view)
  expect(style.top).toBe('60px')
  expect(style.position).toBe('sticky')
  expect(wrapper.props().zIndex).toBe(98)


  const wrapper2 = mount(Sticky, {
    propsData: {
      disabled: true,
      zIndex: 999,
    },
  })
  await nextTick();

  const view2 = wrapper2.find('.ste-sticky');
  const style2 = style2obj(view2)
  expect(style2.position).toBeUndefined();
})