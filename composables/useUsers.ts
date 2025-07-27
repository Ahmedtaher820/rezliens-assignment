import { ref, computed, watch } from "vue";
import { usePagination } from "@/composables/usePagination";
import { useUserStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import type { User } from "@/interfaces/auth";
import type { ComputedRef } from "vue";

export function useUsers() {
  /***************************************
   **** Section Variables Declaration ****
   **************************************/
  //#region Variables
  const { currentPage, itemsPerPage } = usePagination();
  const { users, sortBy,sortDir,roleFilter,statusFilter,search } = storeToRefs(useUserStore());
  
  //#endregion

  /***************************************
   **** Section Computed Variables  ******
   **************************************/
  //#region Computed
  const filteredUsers: ComputedRef<User[]> = computed(() => {
    return users.value.filter((u) => {
      return (
        (search.value === "" ||
          u.fullName.toLowerCase().includes(search.value.toLowerCase().trim()) ||
          u.email.toLowerCase().includes(search.value.toLowerCase().trim())) &&
        (roleFilter.value === "" || u.role === roleFilter.value) &&
        (statusFilter.value === "" || u.status === statusFilter.value)
      );
    });
  });

  const paginatedUsers: ComputedRef<User[]> = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;

    return filteredUsers.value.slice(start, end);
  });
  //#endregion

  /***************************************
   **** Section Watchers *****************
   **************************************/
  //#region Watchers
  watch(
    [search, roleFilter, statusFilter],
    ([newSearch, newRole, newStatus]) => {
      currentPage.value = 1;
    }
  );
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
  function clearFilters() {
    search.value = "";
    roleFilter.value = "all";
    statusFilter.value = "all";
    sortBy.value = "date";
    sortDir.value = "desc";
  }

  function deleteUser(user: User) {
    const confirmed = confirm(
      `Are you sure you want to delete ${user.fullName}?`
    );
    if (confirmed) {
      const index: number = users.value.findIndex((u) => u.id === user.id);
      if (index !== -1) {
        users.value.splice(index, 1);
      }
    }
  }
  //#endregion

  return {
    filteredUsers,
    paginatedUsers,
    search,
    roleFilter,
    statusFilter,
    sortBy,
    sortDir,
    clearFilters,
    deleteUser,
  };
}
