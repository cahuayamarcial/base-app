<script setup>
import { ref } from 'vue';
import { Head, Link, router } from '@inertiajs/vue3';
import ApplicationMark from '@/Components/ApplicationMark.vue';
import Banner from '@/Components/Banner.vue';
import Dropdown from '@/Components/Dropdown.vue';
import DropdownLink from '@/Components/DropdownLink.vue';
import NavLink from '@/Components/NavLink.vue';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink.vue';

defineProps({
    title: String,
});

const showingNavigationDropdown = ref(false);

const switchToTeam = (team) => {
    router.put(route('current-team.update'), {
        team_id: team.id,
    }, {
        preserveState: false,
    });
};

const logout = () => {
    router.post(route('logout'));
};

// Lógica de apertura/cierre del menú lateral
const open = ref(true);
const submenuOpen = ref(false);

const menus = ref([
  { title: "Dashboard" },
  { title: "Pages", icon: "ki-chrome" },
  { title: "Media", spacing: true, icon: "ki-picture"},
  { 
    title: "Projects", 
    submenu: true, 
    submenuItems: [
      { title: "Submenu 1" },
      { title: "Submenu 2" },
      { title: "Submenu 3" },
    ],
    icon: "ki-document" 
  },
  { title: "Analytics", icon: "ki-chart-simple-3" },
  { title: "Inbox", icon: "ki-message-notif" },
  { title: "Profile", spacing: true, icon: "ki-user"},
  { title: "Setting", icon: "ki-setting-2"},
  { title: "Logout" },
]);

const toggleOpen = () => {
    open.value = !open.value;
};

const toggleSubmenu = () => {
  submenuOpen.value = !submenuOpen.value;
};

</script>

<style lang="scss">
    @import "@/Assets/keenicons/duotone/style.css";
    @import "@/Assets/keenicons/outline/style.css";
    @import "@/Assets/keenicons/solid/style.css";

    .ki-purchase .path1:before {
        opacity: 1;
    }
</style>


<template>
    <div class="flex">
        <div :class="['bg-dark-main h-screen p-5 pt-8', open ? 'w-72' : 'w-20', 'relative duration-300']">
            <span className="absolute -right-3 top-9 cursor-pointer" @click="toggleOpen">
                <i :class="['ki-duotone ki-black-left bg-mb-success text-dark-main rounded-full text-3xl', !open && 'rotate-180']"></i>
            </span>
            <div className="inline-flex items-center justify-center">
                <span className="cursor-pointer block float-left mr-2">
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
                    <li :class="[
                        'text-gray-300 text-sm flex items-center cursor-pointer p-2 hover:bg-dark-second rounded-md', 
                        menu.spacing ? 'mt-9' : 'mt-2',
                        open ? 'gap-x-3' : 'justify-center'
                    ]">
                        <span :class="['flex items-center', open ? 'w-auto' : 'w-full justify-center']">
                            <i :class="['ki-duotone', menu.icon ? menu.icon : 'ki-element-11', 'text-lg', 'm-0']">
                                <span class="path1"></span>
                                <span class="path2"></span>
                                <span class="path3"></span>
                                <span class="path4"></span>
                            </i>
                        </span>
                        <span :class="['text-base font-medium flex-1 duration-200', !open && 'hidden']">{{ menu.title }}</span>
                        <span class="flex" v-if="menu.submenu && open" @click="toggleSubmenu">
                            <i :class="['ki-duotone ki-down', submenuOpen && 'rotate-180']"></i>
                        </span>
                    </li>
                    <ul v-if="menu.submenu && submenuOpen && open">
                        <li v-for="(submenuItem, index) in menu.submenuItems" :key="index" class="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 px-8 hover:bg-dark-second rounded-md">
                            {{ submenuItem.title }}
                        </li>
                    </ul>
                </template>
            </ul>

        </div>
        <div className="p-7">
            <h1 className="text-2xl font-semibold">Home Page</h1>
        </div>
    </div>
</template>

