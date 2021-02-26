<template>
  <section class="todoapp">
    <TodoHeader
      @new-todo="handleNewTodo"
    />
    <!-- This section should be hidden by default and shown when there are todos -->
    <section class="main">
      <input v-model="toggleAll" id="toggle-all" class="toggle-all" type="checkbox" />
      <label for="toggle-all">Mark all as complete</label>
      <ul class="todo-list">
        <!-- These are here just to show the structure of the list items -->
        <!-- List items should get the class `editing` when editing and `completed` when marked as completed -->
        <li
          v-for="todo in filterTodos"
          :key="todo.id"
          :class="{
            completed: todo.done,
            editing: todo === editTodo
          }"
        >
          <div class="view">
            <input class="toggle" type="checkbox" v-model="todo.done" />
            <label
              @dblclick="handleShowEditing(todo)"
            >{{ todo.text }}</label>
            <button
              class="destroy"
              @click="handleDestroyTodo(todo)"
            ></button>
          </div>
          <input
            class="edit"
            :value="todo.text"
            @keyup.enter="handleEdit(todo, $event)"
            @blur="handleEdit(todo, $event)"
            @keyup.esc="handleCancelEdit"
          />
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
      <span class="todo-count"><strong>{{ remainingCount }}</strong> item left</span>
      <!-- Remove this if you don't implement routing -->
      <ul class="filters">
        <li>
          <a :class="{ selected: filterText === 'all' }" href="#/">All</a>
        </li>
        <li>
          <a :class="{ selected: filterText === 'active' }" href="#/active">Active</a>
        </li>
        <li>
          <a :class="{ selected: filterText === 'completed' }" href="#/completed">Completed</a>
        </li>
      </ul>
      <!-- Hidden if no completed items are left ↓ -->
      <button class="clear-completed" @click="handleClearCompleted">Clear completed</button>
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
      todos: JSON.parse(window.localStorage.getItem('todos') || '[]'),
      // todos: [
      //   {
      //     id: 1,
      //     text: 'eat',
      //     done: true
      //   },
      //   {
      //     id: 2,
      //     text: 'sleep',
      //     done: true
      //   },
      //   {
      //     id: 3,
      //     text: 'play',
      //     done: false
      //   }
      // ], // 任务列表
      // filterTodos: [], // 筛选的任务列表
      editTodo: null, // 当前编辑的任务
      // hash: '/',
      filterText: 'all'
    }
  },
  computed: {
    remainingCount () {
      return this.todos.filter(t => !t.done).length
    },
    toggleAll: {
      get () {
        return this.todos.every(t => t.done)
      },
      set (value) {
        this.todos.forEach(t => {
          t.done = value
        })
      }
    },
    filterTodos () {
      const { filterText, todos } = this
      if (filterText === 'active') {
        return todos.filter(t => !t.done)
      } else if (filterText === 'completed') {
        return todos.filter(t => t.done)
      } else {
        return todos
      }
    }
  },
  // watch: {
  //   todos: {
  //     deep: true,
  //     handler (value) {
  //       console.log('watch todos', value)
  //       window.localStorage.setItem('todos', JSON.stringify(value))
  //     }
  //   }
  // },
  created () {
    this.handleHashchange()
    // window.addEventListener('hashchange', () => {
    //   this.handleHashchange()
    // })
    window.onhashchange = this.handleHashchange.bind(this)
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
    },

    handleClearCompleted () {
      for (let i = 0; i < this.todos.length; i++) {
        const todo = this.todos[i]
        if (todo.done) {
          this.todos.splice(i, 1)
          i--
        }
      }
    },

    handleShowEditing (todo) {
      this.editTodo = todo
    },

    handleEdit (todo, e) {
      const text = e.target.value
      if (text.trim().length) {
        // 修改
        todo.text = text

        // 取消编辑状态
        this.editTodo = null
      } else {
        // 删除
        this.handleDestroyTodo(todo)
      }
    },

    handleCancelEdit () {
      this.editTodo = null
    },

    handleHashchange () {
      const href = window.location.hash.substring(1)
      switch (href) {
        case '/':
          this.filterText = 'all'
          break
        case '/active':
          this.filterText = 'active'
          break
        case '/completed':
          this.filterText = 'completed'
          break
        default:
          this.filterText = 'all'
          break
      }
    }
  }
}
</script>
