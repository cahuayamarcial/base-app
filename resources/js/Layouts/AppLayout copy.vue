<template>
    <div class="flex" @click="handleClickOutside">
      <div :class="['bg-dark-main h-screen p-5 pt-8', open ? 'w-72' : 'w-20', 'relative duration-300']">
        <span class="absolute -right-3 top-9 cursor-pointer" @click="toggleOpen">
          <i :class="['ki-duotone ki-black-left bg-mb-success text-dark-main rounded-full text-3xl', !open && 'rotate-180']"></i>
        </span>
        <div class="inline-flex items-center justify-center">
          <span class="cursor-pointer block float-left mr-2">
            <i :class="['ki-duotone ki-purchase text-mb-success text-4xl rounded duration-500', !open && 'rotate-[360deg]']">
              <span class="path1 text-mb-success"></span>
              <span class="path2"></span>
            </i>
          </span>
          <h1 :class="['text-white origin-left font-bold text-2xl duration-300', !open && 'scale-0']">Flexivent</h1>
        </div>
        <div :class="['flex items-center py-2', open ? 'mt-10 px-3 border border-gray-800 rounded' : 'mt-8 justify-center']">
          <div class="flex items-center justify-center min-w-9 h-9 bg-mb-success-100 text-mb-success rounded">
            <span class="text-lg">M</span>
          </div>
          <div :class="['ml-4 duration-200', !open && 'hidden ml-0']">
            <h2 class="text-white text-md font-semibold whitespace-nowrap">Marcial Cahuaya</h2>
            <p class="text-gray-400 text-sm">CEO</p>
          </div>
        </div>
  
        <ul class="pt-2">
          <template v-for="(menu, index) in menus" :key="index">
            <li
              :class="[
                'relative text-gray-300 text-sm flex items-center cursor-pointer p-2 hover:bg-dark-second rounded-md',
                menu.spacing ? 'mt-9' : 'mt-2',
                open ? 'gap-x-3' : 'justify-center',
              ]"
              @click.stop="toggleSubmenu(index)"
            >
              <span :class="['flex items-center', open ? 'w-auto' : 'w-full justify-center']">
                <i :class="['ki-duotone', menu.icon ? menu.icon : 'ki-element-11', 'text-lg', 'm-0']">
                  <span class="path1"></span>
                  <span class="path2"></span>
                  <span class="path3"></span>
                  <span class="path4"></span>
                </i>
              </span>
              <span :class="['text-base font-medium flex-1 duration-200', !open && 'hidden']">{{ menu.title }}</span>
              <span class="flex" v-if="menu.submenu && open">
                <i :class="['ki-duotone ki-down', submenuOpen === index && 'rotate-180']"></i>
              </span>
  
              <!-- Submenu desplegable flotante -->
              <ul v-if="menu.submenu && submenuOpen === index && !open" class="absolute left-full top-0 mt-0 ml-6 w-48 bg-dark-second rounded-md shadow-lg z-10"
                  @click.stop
              >
                <li
                  v-for="(submenuItem, subIndex) in menu.submenuItems"
                  :key="subIndex"
                  class="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-3 pl-4 hover:bg-dark-main rounded-md"
                >
                  {{ submenuItem.title }}
                </li>
              </ul>
            </li>
  
            <ul v-if="menu.submenu && submenuOpen === index && open">
              <li
                v-for="(submenuItem, subIndex) in menu.submenuItems"
                @click.stop
                :key="subIndex"
                class="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 px-8 hover:bg-dark-second rounded-md"
              >
                {{ submenuItem.title }}
              </li>
            </ul>
          </template>
        </ul>
      </div>
      <div class="p-7">
        <h1 class="text-2xl font-semibold">Home Page</h1>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  
  const open = ref(true);
  const submenuOpen = ref(null);
  const menus = ref([
    { title: 'Dashboard' },
    { title: 'Pages', icon: 'ki-chrome' },
    { title: 'Media', spacing: true, icon: 'ki-picture' },
    {
      title: 'Projects',
      submenu: true,
      submenuItems: [
        { title: 'Submenu 1' },
        { title: 'Submenu 2' },
        { title: 'Submenu 3' },
      ],
      icon: 'ki-document',
    },
    { title: 'Analytics', icon: 'ki-chart-simple-3' },
    { title: 'Inbox', icon: 'ki-message-notif' },
    { title: 'Profile', spacing: true, icon: 'ki-user' },
    { title: 'Setting', icon: 'ki-setting-2' },
    { title: 'Logout' },
  ]);
  
  const toggleOpen = () => {
    open.value = !open.value;
  };
  
  const toggleSubmenu = (index) => {
    submenuOpen.value = submenuOpen.value === index ? null : index;
  };
  
  const handleClickOutside = (event) => {
    if (!event.target.closest('.absolute.left-full')) {
      submenuOpen.value = null;
    }
  };
  
  onMounted(() => {
    document.addEventListener('click', handleClickOutside);
  });
  
  onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside);
  });
  </script>
  
  <style lang="scss">
  @import "@/Assets/keenicons/duotone/style.css";
  @import "@/Assets/keenicons/outline/style.css";
  @import "@/Assets/keenicons/solid/style.css";
  
  .ki-purchase .path1:before {
    opacity: 1;
  }
  </style>
   