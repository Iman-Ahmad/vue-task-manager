<script setup lang="ts">

const props = defineProps<{
    title: string
}>()

const emit = defineEmits<{
    addTask: [task: string]
    'update:title': [title: string]
}>()


function handleAddTaskRequest(task: string) {
    emit('addTask', task)
}
</script>

<template>
    <input
    :value="props.title"
    @input="emit('update:title', ($event.target as HTMLInputElement).value)"
    placeholder="Write a new task"/>

    <button @click="handleAddTaskRequest(props.title)">
    Add
    </button>
</template>