import TodoHeader from '../TodoHeader.vue'
import { shallowMount } from '@vue/test-utils'

/** @type {import('@vue/test-utils').Wrapper} */
let wrapper = null
let input = null

beforeEach(() => {
  wrapper = shallowMount(TodoHeader)
  input = wrapper.find('.new-todo')
})

test('TodoHeader 组件外观正常', () => {
  // 这里会使用 jest-serializer-vue 序列化 Vue 组件快照内容
  expect(wrapper.element).toMatchSnapshot()
})

// test('TodoHeader 组件需要包含 input 文本框', () => {
//   const wrapper = shallowMount(TodoHeader)
//   const input = wrapper.find('.new-todo')
//   expect(input.exists()).toBeTruthy()
// })

// test('input value 初始为空', () => {
//   expect(input.element.value).toBe('')
// })

// test('input value 双向数据绑定正常', async () => {
//   // 数据影响视图
//   wrapper.vm.inputValue = 'hello'
//   await wrapper.vm.$nextTick()
//   expect(input.element.value).toBe('hello')

//   // 视图影响数据
//   input.setValue('world')
//   expect(wrapper.vm.inputValue).toBe('world')
// })

test('input 回车事件无内容什么也不做', async () => {
  input.setValue('')
  await input.trigger('keyup.enter')
  expect(wrapper.emitted()['new-todo']).toBeFalsy()
})

test('input 回车事件有内容发布 new-todo 事件', async () => {
  // 有内容，发布 new-todo 事件
  const text = 'eat'
  input.setValue(text)
  await input.trigger('keyup.enter')
  expect(wrapper.emitted()['new-todo']).toBeTruthy()
  expect(wrapper.emitted()['new-todo'][0][0]).toBe(text)
  expect(wrapper.vm.inputValue).toBe('')
})
