<script setup lang="ts">
import { useUsers } from "@/composables/useUsers";
import { usePagination } from "@/composables/usePagination";
import { ref, computed } from "vue";
import { useUserStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import { User } from "@/interfaces/auth";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
/***************************************
 **** Section Props Declaration  ******
 **************************************/
//#region Props
//#endregion

/***************************************
 **** Section Emits Declaration ********
 **************************************/
//#region Emits
const emit = defineEmits(["editUser"]);

//#endregion

/***************************************
 **** Section Variables Declaration ****
 **************************************/
//#region Variables
const { filteredUsers, sortBy, sortDir, paginatedUsers, deleteUser } =
  useUsers();
const { currentPage, itemsPerPage, setPage } = usePagination();
const { currentUser, isAdmin } = storeToRefs(useUserStore());

//#endregion

/***************************************
 **** Section Computed Variables  ******
 **************************************/
//#region Computed
const totalPages = computed(() =>
  Math.ceil(filteredUsers.value.length / itemsPerPage.value)
);
const startIndex = computed(() => {
  return (currentPage.value - 1) * itemsPerPage.value;
});
const endIndex = computed(() => {
  return startIndex.value + itemsPerPage.value;
});

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
function toggleSort(field: "name" | "date") {
  if (sortBy.value === field) {
    sortDir.value = sortDir.value === "asc" ? "desc" : "asc";
  } else {
    sortBy.value = field;
    sortDir.value = "asc";
  }
}

function edit(user: User) {
  emit("editUser", user);
}

function remove(user: User): void {
  deleteUser(user);
}

function checkStatus(userStatus: string): string {
  return userStatus === "active"
    ? "text-green-100 text-green-800"
    : "text-red-100 text-red-800";
}
//#endregion
</script>

<template>
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead @click="toggleSort('name')">
          <span v-if="sortDir === 'asc'">▲</span>
          <span v-else-if="sortDir === 'desc'">▼</span> Name
        </TableHead>
        <TableHead>Email</TableHead>
        <TableHead>Role</TableHead>
        <TableHead>Status</TableHead>
        <TableHead @click="toggleSort('date')">Created At</TableHead>
        <TableHead v-if="isAdmin">Actions</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <template v-if="paginatedUsers.length > 0">
        <TableRow v-for="user in paginatedUsers" :key="user.id">
          <TableCell>{{ user.fullName }}</TableCell>
          <TableCell>{{ user.email }}</TableCell>
          <TableCell class="capitalize">{{ user.role }}</TableCell>
          <TableCell class="capitalize" :class="[checkStatus(user.status)]">{{
            user.status
          }}</TableCell>
          <TableCell>{{ user.createdAt }}</TableCell>
          <TableCell v-if="isAdmin" class="flex items-center gap-2">
            <Button variant="outline" size="sm" @click="edit(user)"
              >Edit</Button
            >
            <Button variant="destructive" size="sm" @click="remove(user)"
              >Delete</Button
            >
          </TableCell>
        </TableRow>
      </template>
      <template v-else>
        <TableRow>
          <TableCell :colspan="6" class="text-center py-6 text-gray-500">
            No data available.
          </TableCell>
        </TableRow>
      </template>
    </TableBody>
  </Table>
  <Pagination
    v-slot="{ page }"
    :items-per-page="itemsPerPage"
    :total="filteredUsers.length"
    :default-page="currentPage"
    @update:page="setPage"
    class="mt-6"
  >
    <PaginationContent v-slot="{ items }">
      <PaginationPrevious />

      <template v-for="(item, index) in items" :key="index">
        <PaginationItem
          v-if="item.type === 'page'"
          :value="item.value"
          :is-active="item.value === page"
        >
          {{ item.value }}
        </PaginationItem>
      </template>

      <PaginationEllipsis :index="4" />

      <PaginationNext />
    </PaginationContent>
  </Pagination>
</template>
