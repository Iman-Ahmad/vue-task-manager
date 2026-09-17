<script setup lang="ts">

const props = defineProps<{
    name: string
}>()

const emit = defineEmits<{
    addName: [name: string]
    'update:name': [name: string]
}>()


function handleAddNameRequest(name: string) {
    emit('addName', name)
}
</script>

<template>
    <input
    :value="props.name"
    @input="emit('update:name', ($event.target as HTMLInputElement).value)"
    placeholder="Write your name"/>

    <button @click="handleAddNameRequest(props.name)">
    Add your name
    </button>
</template>