<script setup lang="ts">

const props = defineProps<{
    title: string
}>()

const emit = defineEmits<{
    addName: [name: string]
    'update:title': [title: string]
}>()


function handleAddNameRequest(name: string) {
    emit('addName', name)
}
</script>

<template>
    <input
    :value="props.title"
    @input="emit('update:title', ($event.target as HTMLInputElement).value)"
    placeholder="Write your name"/>

    <button @click="handleAddNameRequest(props.title)">
    Add your name
    </button>
</template>