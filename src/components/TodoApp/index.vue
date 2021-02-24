<template>
  <section class="todoapp">
    <TodoHeader
      @new-todo="handleNewTodo"
    />
    <!-- This section should be hidden by default and shown when there are todos -->
    <section class="main">
      <input id="toggle-all" class="toggle-all" type="checkbox" />
      <label for="toggle-all">Mark all as complete</label>
      <ul class="todo-list">
        <!-- These are here just to show the structure of the list items -->
        <!-- List items should get the class `editing` when editing and `completed` when marked as completed -->
        <li
          v-for="todo in todos"
          :key="todo.id"
          :class="{
            completed: todo.done
          }"
        >
          <div class="view">
            <input class="toggle" type="checkbox" v-model="todo.done" />
            <label>{{ todo.text }}</label>
            <button
              class="destroy"
              @click="handleDestroyTodo(todo)"
            ></button>
          </div>
          <input class="edit" value="Create a TodoMVC template" />
        </li>
        <!-- <li>
          <div class="view">
            <input class="toggle" type="checkbox" />
            <label>Buy a unicorn</label>
            <button class="destroy"></button>
          </div>
          <input class="edit" value="Rule the web" />
        </li> -->
      </ul>
    </section>
    <!-- This footer should be hidden by default and shown when there are todos -->
    <footer class="footer">
      <!-- This should be `0 items left` by default -->
      <span class="todo-count"><strong>0</strong> item left</span>
      <!-- Remove this if you don't implement routing -->
      <ul class="filters">
        <li>
          <a class="selected" href="#/">All</a>
        </li>
        <li>
          <a href="#/active">Active</a>
        </li>
        <li>
          <a href="#/completed">Completed</a>
        </li>
      </ul>
      <!-- Hidden if no completed items are left ↓ -->
      <button class="clear-completed">Clear completed</button>
    </footer>
  </section>
</template>

<script>
import TodoHeader from './TodoHeader'

export default {
  name: 'TodoApp',
  components: {
    TodoHeader
  },
  data () {
    return {
      todos: [] // 任务列表
    }
  },
  methods: {
    handleNewTodo (text) {
      if (text && text.trim().length) {
        const id = this.todos.length ? this.todos[this.todos.length - 1].id + 1 : 1
        this.todos.push({
          id,
          text,
          done: false
        })
      }
    },

    handleDestroyTodo (todo) {
      if (todo && todo.id) {
        const index = this.todos.findIndex(t => t.id === todo.id)
        if (index !== -1) {
          this.todos.splice(index, 1)
        }
      }
    }
  }
}
</script>
