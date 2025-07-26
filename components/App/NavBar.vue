<script setup lang="ts">
import { SidebarTrigger } from '@/components/ui/sidebar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ref } from 'vue'
import { navigateTo } from 'nuxt/app';
import { useUserStore } from "@/stores/auth"

/***************************************
 **** Section Props Declaration  ******
 **************************************/
//#region Props
//#endregion

/***************************************
 **** Section Emits Declaration ********
 **************************************/
//#region Emits
//#endregion

/***************************************
 **** Section Variables Declaration ****
 **************************************/
//#region Variables
const {logout} = useUserStore()
const route = useRoute()
const items = ref([
  { name: 'Profile', link:'/profile' },
  { name: 'Billing', link:'/billing' },
   { name: 'Settings', link:'/settings' },
  { name: 'Logout', link:'' },
])
//#endregion

/***************************************
 **** Section Computed Variables  ******
 **************************************/
//#region Computed
//#endregion

/***************************************
 **** Section Watchers *****************
 **************************************/
//#region Watchers

//#endregion

/***************************************
 **** Section Lifecycle Hooks  *********
 **************************************/
//#region Lifecycle Hooks
//#endregion

/***************************************
 **** Section Functions Declaration ****
 **************************************/
//#region Functions
function handleItemClick(item: { name: string; link: string }) {
  console.log(`Clicked on ${item.name}`)
if(item.name === 'Logout') {
    logout();
  } else {
    // Navigate to the respective link if it exists
    navigateTo(item.link || '/');
  }
}
//#endregion
</script>

<template>
    <div class="py-3 px-8 bg-gray-200 flex justify-between items-center">
      <div class="flex gap-2 items-center">
        <SidebarTrigger class="cursor-pointer w-6 h-6" />
        <h1 class="text-2xl font-bold capitalize">{{ route.name }}</h1>
      </div>
        <div class="cursor-pointer">
            <DropdownMenu>
                <DropdownMenuTrigger class="cursor-pointer">
                    <img src="https://avatars.githubusercontent.com/u/62017400?s=32&v=1" class="rounded-full" alt="user image" />
                </DropdownMenuTrigger>
                <DropdownMenuContent class="cursor-pointer">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem v-for="(item,index) in items" :key="index" @click="handleItemClick(item)"
                    :class="[item.name === 'Logout' ? 'text-red-500' : '']"
                    class="cursor-pointer"
                    >{{item.name}}</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    </div>
</template>