<script setup lang="ts">
import { Home, User,ClipboardList} from "lucide-vue-next"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import { useRoute } from "vue-router";

// Menu items.
const route = useRoute();
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Users",
    url: "/users",
    icon: User,
  },
  {
    title: "Reports",
    url: "/reports",
    icon: ClipboardList,
  },
];
</script>

<template>
  <Sidebar>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel class="text-xl mb-4">Rezliens</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem
              v-for="item in items"
              :key="item.title"
              class="hover:bg-none"
              :class="{ 'active-class': route.path === item.url }"
              >
              <SidebarMenuButton asChild>
                <a :href="item.url" class="py-5">
                  <component :is="item.icon" />
                  <span>{{ item.title }}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
</template>
<style>
.active-class {
  /* Your active style, e.g.: */
  background-color: #3b82f6; /* blue bg */
  color: white;
  font-weight: bold;
  border-radius: 8px;
}

</style>