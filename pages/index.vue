<template>
    <div>
        Home Page
    </div>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(()=>{
    navigateTo('/dashboard')
})
</script>