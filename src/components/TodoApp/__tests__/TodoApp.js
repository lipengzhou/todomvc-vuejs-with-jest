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
      done: true
    },
    {
      id: 2,
      text: 'sleep',
      done: true
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

test('删除单个任务正常', async () => {
  const list = wrapper.find('.todo-list').findAll('li')
  await list.at(0).find('button[class="destroy"]').trigger('click')
  expect(wrapper.vm.todos.length).toBe(2)
})

test('删除所有已完成任务正常', async () => {
  await wrapper.find('button[class="clear-completed"]').trigger('click')
  expect(wrapper.vm.todos).toEqual([
    {
      id: 3,
      text: 'play',
      done: false
    }
  ])
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

test('展示所有任务完成状态正常', async () => {
  // 所有任务已完成则 toggleAll 是选中状态
  const list = wrapper.findAll('input[class="toggle"]')
  const toggleAll = wrapper.find('input[class="toggle-all"]')
  for (let i = 0; i < list.length; i++) {
    list.at(i).setChecked(true)
  }
  await Vue.nextTick()
  expect(toggleAll.element.checked).toBeTruthy()

  // 只要有1个任务没有完成，则 toggleAll 是未选中状态
  await list.at(0).setChecked(false)
  expect(toggleAll.element.checked).toBeFalsy()
})

test('切换所有任务完成状态正常', async () => {
  const toggleAll = wrapper.find('input[class="toggle-all"]')
  const list = wrapper.findAll('input[class="toggle"]')

  // 全部完成
  await toggleAll.setChecked(true)
  for (let i = 0; i < list.length; i++) {
    expect(list.at(i).element.checked).toBeTruthy()
  }

  // 全部未完成
  await toggleAll.setChecked(false)
  for (let i = 0; i < list.length; i++) {
    expect(list.at(i).element.checked).toBeFalsy()
  }
})

test('展示所有未完成任务数量正常', () => {
  const count = wrapper.vm.todos.filter(t => !t.done).length
  const showCount = wrapper.find('span[class="todo-count"]').find('strong').element.innerHTML
  expect(showCount - 0).toBe(count)
})

describe('编辑任务', () => {
  test('双击任务获得编辑状态正常', async () => {
    const list = wrapper.find('.todo-list').findAll('li')
    for (let i = 0; i < list.length; i++) {
      await list.at(i).find('label').trigger('dblclick')
      expect(list.at(i).classes()).toContain('editing')
    }
  })

  test('编辑文本框展示正常', () => {
    const list = wrapper.find('.todo-list').findAll('li')
    for (let i = 0; i < list.length; i++) {
      const editInput = list.at(i).find('input[class="edit"]')
      const label = list.at(i).find('label')
      expect(editInput.element.value).toBe(label.element.innerHTML)
    }
  })

  test('取消编辑正常', async () => {
    const list = wrapper.find('.todo-list').findAll('li')
    for (let i = 0; i < list.length; i++) {
      await list.at(i).find('label').trigger('dblclick') // 获得编辑状态
      const text = `text${i}`
      const editInput = list.at(i).find('input[class="edit"]')
      const originText = editInput.element.value
      await editInput.setValue(text)
      await editInput.trigger('keyup.esc') // 必须是编辑显示状态才可以触发键盘事件
      const label = list.at(i).find('label')
      expect(label.element.innerHTML).toBe(originText)
    }
  })

  test('确认编辑正常', async () => {
    const list = wrapper.find('.todo-list').findAll('li')
    for (let i = 0; i < list.length; i++) {
      await list.at(i).find('label').trigger('dblclick')
      const text = `text${i}`
      const editInput = list.at(i).find('input[class="edit"]')
      await editInput.setValue(text)
      await editInput.trigger('keyup.enter') // 必须是编辑显示状态才可以触发键盘事件
      const label = list.at(i).find('label')
      expect(label.element.innerHTML).toBe(text)
    }
  })
})

test.only('筛选展示所有未完成任务列表正常', async () => {
  // console.log(jest.jsdom)
  // delete window.location
  // window.location = {
  //   ...window.location
  // }
  // document.location.href = 'xxx'
  // Object.defineProperty(window.location, 'href', {
  //   writable: true,
  //   value: 'https://www.somthing.com/test.html?query=true'
  // })
  // Object
  // jest.
  // console.log(window.location.hash)
  // window.location.hash = '#/active'
  // window.location.href = '/#/active'
  // window.location.foo = 'bar'
  // Object.defineProperty(window, 'location', {
  //   value: {
  //     hash: 'abc'
  //   },
  //   writable: true
  // })
  // console.log(123)
  // await Promise.resolve(r => r())
  // jest.useFakeTimers()
  // const fn = jest.fn(() => {

  // })

  // await wrapper.vm.handleHashchange()
  // await Vue.nextTick()
  // expect(wrapper.find('.todo-list').findAll('li').length).toBe(1)
  // 视图中的任务列表是对的
  // a 链接样式正确
})

test('筛选展示所有已完成任务列表正常', () => {
  window.location.hash = '#/completed'
  console.log('正常')
})
