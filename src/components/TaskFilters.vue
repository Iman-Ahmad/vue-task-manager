<script setup lang="ts">
import type { TaskFilter } from '../types'

defineProps<{
    selectedFilter: TaskFilter
}>()

const emit = defineEmits<{
    updateFilter: [filter: TaskFilter]
}>()
</script>

<template>
    <div class="filters">
        <button @click="emit('updateFilter', 'all')">
            All
        </button>

        <button @click="emit('updateFilter', 'active')">
            Active
        </button>

        <button @click="emit('updateFilter', 'completed')">
            Completed
        </button>
    </div>
</template>

<style scoped>
    .filters {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-bottom: 20px;
    }

    .filters button {
        padding: 8px 14px;
    }

    .filte button.active {
        font-weight: 700;
    }
</style>