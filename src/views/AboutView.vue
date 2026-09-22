<script setup lang="ts">
import {useRoute} from 'vue-router'

const currentRoute = useRoute()
</script>

<template>
  <div class="about">
    <h1>About Task Manager</h1>

    <p>Current path: {{ currentRoute.path }} </p>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
