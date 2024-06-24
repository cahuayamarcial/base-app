<template>
    <div>
        <button @click="toggleDarkMode">
            Dark Mode
        </button>
    </div>
</template>
  
<script>
import DarkModeToggle from '@/Components/DarkModeToggle.vue';
export default {
    methods: {
        toggleDarkMode() {
            if (document.documentElement.classList.contains('dark')) {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('theme', 'light');
            } else {
                document.documentElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            }
        },
    },
    mounted() {
        if ( localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    },
};
</script>
  