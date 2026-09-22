<script setup lang="ts">
import {RouterLink, RouterView} from 'vue-router'
</script>

<template>
  <header class="app-header">
    <nav>
      <RouterLink to="/">Tasks</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped>
  .app-header {
    padding: 16px 24px;
    border-bottom: 1px solid var(--color-border);
  }

  nav {
    display: flex;
    gap: 16px;
  }

  nav a {
    text-decoration: none;
  }

  nav a.router-link-active {
    font-weight: 700;
  }
</style>