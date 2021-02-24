<template>
  <header class="header">
    <h1>todos</h1>
    <input
      v-model="inputValue"
      class="new-todo"
      placeholder="What needs to be done?"
      @keyup.enter="handleNewTodo"
    />
  </header>
</template>

<script>
export default {
  name: 'TodoHeader',
  data () {
    return {
      inputValue: ''
    }
  },
  methods: {
    handleNewTodo () {
      if (this.inputValue.trim().length) {
        this.$emit('new-todo', this.inputValue)

        // 清空文本框
        this.inputValue = ''
      }
    }
  }
}
</script>
