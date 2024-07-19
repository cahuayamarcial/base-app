<script setup>
import { ref, onMounted } from 'vue';
import { Head, Link, router } from '@inertiajs/vue3';
import ApplicationMark from '@/Components/ApplicationMark.vue';
import Banner from '@/Components/Banner.vue';
import Dropdown from '@/Components/Dropdown.vue';
import DropdownLink from '@/Components/DropdownLink.vue';
import NavLink from '@/Components/NavLink.vue';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink.vue';
import MenuSidebar from '@/Components/MenuSidebar.vue';

defineProps({
  title: String,
});

const logout = () => {
  router.post(route('logout'));
};

const animate = ref(false);

onMounted(() => {
  animate.value = true;
});
</script>

<template>
<Head :title="title" />
  <div class="mb__layout mb__has-sidebar mb__fixed-sidebar mb__fixed-header">
    <MenuSidebar />
    <div id="overlay" class="mb__overlay"></div>
	
    <div class="mb__layout">
      <!-- Page Heading -->
      <header v-if="$slots.header" class="bg-white dark:bg-gray-800 shadow">
        <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <slot name="header" />
        </div>
        <a id="btn-toggle" href="#" class="mb__sidebar-toggler mb__break-point-sm">
          <i class="ri-menu-line ri-xl"></i>
        </a>
      </header>
      <main class="mb__content">
        <div>
          <!-- Page Content -->
          <transition name="slide-fade">
            <div v-if="animate">
              <slot />
            </div>
          </transition>
        </div>
        <footer class="mb__footer">
          <small style="margin-bottom: 20px; display: inline-block">
            © 2024 made with
            <span style="color: red; font-size: 18px">&#10084;</span> by -
            <a target="_blank" href="https://marbot.bo">Marbot</a>
          </small>
        </footer>
      </main>
      <div class="mb__overlay"></div>
    </div>
  </div>
</template>

<style>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
