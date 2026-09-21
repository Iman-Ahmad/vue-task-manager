<script setup lang="ts">
    import {computed, ref, watch} from 'vue'
    import NameList from './components/NameList.vue'
    import type {Task} from './types'
    import NameForm from './components/NameForm.vue'

    const name = ref('')

    function loadSavedNames(): Task[] {
      const savedNames = localStorage.getItem('names')

      if (!savedNames) {
        return [
          {id: 1, title: 'Iman', completed: false},
          {id: 2, title: 'Meera', completed: false},
          {id: 3, title: 'Jamila', completed: false},
          {id: 4, title: 'Reem', completed: false}
        ]
      }

      return JSON.parse(savedNames)
    }

    const names = ref<Task[]>(loadSavedNames())

    let nextPersonId = names.value.length
      ? Math.max(...names.value.map(person => person.id)) + 1
      : 1

    watch(
      names,
      (newNames) => {
        localStorage.setItem('names', JSON.stringify(newNames))
      },
      { deep: true }
    )

    const totalNames = computed (() => names.value.length)
    const namesStartingWithI = computed (() => names.value.filter(person => person.title.startsWith('I')))


    function handleDeleteName(id: number){
      names.value= names.value.filter(task => task.id !== id)
    }

    function handleToggleCompleted(id: number) {
      const task= names.value.find(task => task.id === id)

      if (!task) {
        return
      }

      task.completed = !task.completed
    }

    function handleAddName(name: string) {
      if (!name.trim()){
        return
      }

      if (!/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/.test(name)){
        return
      }

      names.value.push({
        id: nextPersonId,
        title: name,
        completed: false
      })
      nextPersonId++
    }
</script>

<template>
  <h1>Hello {{name}}!</h1>

  <NameForm  
  v-model:title="name"
  @addName="handleAddName"
  />

  <NameList
  :names="names"
  @deleteName="handleDeleteName"
  @toggleCompleted= "handleToggleCompleted"
  />

  <p>Names starting with I:</p>

  <ul>
    <li v-for="person in namesStartingWithI" :key="person.id">
      {{person.title}}
    </li>
  </ul>

  
  <p>Total names: {{names.length}}</p>
  <p>Total computed names: {{totalNames}}</p>
  <p v-if="name">Welcome {{name}}</p>

  <p v-else>Type your name 🚀</p>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
