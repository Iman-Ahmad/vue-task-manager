<script setup lang="ts">
const technologies = [
  'Vue 3',
  'TypeScript',
  'Pinia',
  'Vue Router',
  'REST API',
  'localStorage',
]
</script>

<template>
  <main class="about">
    <section class="about-card">
      <p class="eyebrow">Vue Learning Project</p>

      <h1>About Task Manager</h1>

      <p class="description">
        A task management application built with Vue 3 and TypeScript
        as a hands-on project for learning modern frontend development.
      </p>

      <h2>Technologies</h2>

      <div class="technologies">
        <span
          v-for="technology in technologies"
          :key="technology"
          class="technology"
        >
          {{ technology }}
        </span>
      </div>

      <p class="project-note">
        The project includes task management, filtering, routing,
        persistent local data, Pinia state management, and API integration.
      </p>

      <a
        href="https://github.com/Iman-Ahmad/vue-task-manager"
        target="_blank"
        rel="noopener noreferrer"
        class="github-link"
      >
        View project on GitHub
      </a>
    </section>
  </main>
</template>

<style scoped>
.about {
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  padding: 48px 24px;
  box-sizing: border-box;
}

.about-card {
  padding: 32px;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  text-align: center;
}

.eyebrow {
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 600;
  opacity: 0.65;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

h1 {
  margin-bottom: 16px;
}

.description {
  margin-bottom: 32px;
  line-height: 1.6;
  opacity: 0.8;
}

h2 {
  margin-bottom: 16px;
  font-size: 20px;
}

.technologies {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-bottom: 28px;
}

.technology {
  padding: 8px 12px;
  border: 1px solid var(--color-border);
  border-radius: 999px;
  font-size: 14px;
}

.project-note {
  margin-bottom: 24px;
  line-height: 1.6;
  opacity: 0.75;
}

.github-link {
  display: inline-block;
  font-weight: 600;
}
</style>