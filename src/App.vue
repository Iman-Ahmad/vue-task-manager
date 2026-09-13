<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import {ref} from 'vue'

const name = ref('')
const names = ref(['Iman', 'Meera', 'Jamila', 'Reem'])

function addName() {
  if (name.value) {
  names.value.push(name.value)
  }
}
</script>

<template>
  <h1>Hello {{name}}!</h1>

  <input v-model="name" placeholder="Write your name"/>

  <button @click="addName">Add a name</button>

  <ul>
    <li v-for="person in names" :key="person">
    {{ person}}
    </li>
  </ul>

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
