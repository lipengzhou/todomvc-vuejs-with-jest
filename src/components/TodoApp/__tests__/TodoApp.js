import Vue from 'vue'
import TodoApp from '..'
import { shallowMount } from '@vue/test-utils'

/** @type {import('@vue/test-utils').Wrapper} */
let wrapper = null

beforeEach(async () => {
  wrapper = shallowMount(TodoApp)
  wrapper.vm.todos = [
    {
      id: 1,
      text: 'eat',
      done: false
    },
    {
      id: 2,
      text: 'sleep',
      done: false
    },
    {
      id: 3,
      text: 'play',
      done: false
    }
  ]
  await Vue.nextTick()
})

test('添加任务正常', async () => {
  wrapper.vm.handleNewTodo('test')
  await Vue.nextTick()
  expect(wrapper.find('.todo-list').findAll('li').length).toBe(4)
})

test('展示所有任务列表正常', async () => {
  expect(wrapper.find('.todo-list').findAll('li').length).toBe(wrapper.vm.todos.length)
})

// test('删除单个任务正常', async () => {
//   const list = wrapper.find('.todo-list').findAll('li')
//   for (let i = 0; i < list.length; i++) {
//     const li = list.at(i)
//     await li.find('button[class="destroy"]').trigger('click')
//     // 确认 list 中确实没有 button 那个 li 了
//   }
//   await wrapper.find('button[class="destroy"]').trigger('click')
//   expect(wrapper.find('.todo-list').find('li').exists()).toBeFalsy()
// })

test('删除所有已完成任务正常', () => {
  console.log('正常')
})

test('切换单个任务完成状态正常', async () => {
  const list = wrapper.find('.todo-list').findAll('li')
  for (let i = 0; i < list.length; i++) {
    const li = list.at(i) // !! at 是个函数
    const toggleInput = li.find('input[class="toggle"]')

    await toggleInput.setChecked(true)
    expect(li.classes()).toContain('completed')

    await toggleInput.setChecked(false)
    expect(li.classes()).not.toContain('completed')
  }
})

test('切换所有任务完成状态正常', () => {
  console.log('正常')
})

test('展示未完成任务数量正常', () => {
  console.log('正常')
})

test('双击任务获得编辑状态正常', () => {
  console.log('正常')
})

test('编辑任务正常', () => {
  console.log('正常')
})

test('筛选展示所有未完成任务列表正常', () => {
  console.log('筛选展示所有未完成任务列表正常')
})

test('筛选展示所有已完成任务列表正常', () => {
  console.log('正常')
})
