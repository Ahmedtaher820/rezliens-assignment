import { ref, computed } from "vue";
import { } from "vue-router";
import { defineStore } from "pinia";
import type { User } from "@/interfaces/auth";
import type { ComputedRef } from "vue";

export const useUserStore = defineStore(
  "userStore",
  () => {
    /***************************************
     **** Section State Declaration ****
     **************************************/
    //#region State
    const users = ref<User[]>([
      {
        id: 1,
        fullName: "Alice Johnson",
        email: "alice@admin.com",
        role: "admin",
        status: "active",
        createdAt: "2025-07-20",
      },
      {
        id: 2,
        fullName: "Olena",
        email: "client@test.com",
        role: "client",
        status: "active",
        createdAt: "2025-07-25",
      },
      {
        id: 3,
        fullName: "Bob Smith",
        email: "bob.smith@example.com",
        role: "client",
        status: "inactive",
        createdAt: "2025-07-10",
      },
      {
        id: 4,
        fullName: "Cathy Lin",
        email: "cathy.lin@admin.com",
        role: "admin",
        status: "active",
        createdAt: "2025-06-18",
      },
      {
        id: 5,
        fullName: "David Martin",
        email: "david.martin@client.org",
        role: "client",
        status: "active",
        createdAt: "2025-07-21",
      },
      {
        id: 6,
        fullName: "Emma Brooks",
        email: "emma.brooks@example.com",
        role: "client",
        status: "inactive",
        createdAt: "2025-07-15",
      },
      {
        id: 7,
        fullName: "Frank Zhang",
        email: "frank@adminportal.io",
        role: "admin",
        status: "active",
        createdAt: "2025-07-01",
      },
      {
        id: 8,
        fullName: "Grace Lee",
        email: "grace.lee@example.com",
        role: "client",
        status: "active",
        createdAt: "2025-07-22",
      },
      {
        id: 9,
        fullName: "Henry Ford",
        email: "henry.ford@clientmail.com",
        role: "client",
        status: "inactive",
        createdAt: "2025-06-29",
      },
      {
        id: 10,
        fullName: "Isabella Clark",
        email: "isabella.clark@admin.com",
        role: "admin",
        status: "active",
        createdAt: "2025-07-05",
      },
    ]);

    const currentUser = ref<User>({
      id: 0,
      fullName: "",
      email: "",
      role: "",
      status: "",
      createdAt: "",
    });

    const search = ref<string>("");
    const roleFilter = ref<string>("");
    const statusFilter = ref<string>("");
    const sortBy = ref<"name" | "date">("date");
    const sortDir = ref<"asc" | "desc">("desc");
    //#endregion

    /***************************************
     **** Section Computed Getters ******
     **************************************/
    //#region Getters
    const getLoggedUser: ComputedRef<User> = computed(() => currentUser.value);
    const isAdmin: ComputedRef<Boolean> = computed(
      () => currentUser.value.role === "admin"
    );
    //#endregion

    /***************************************
     **** Section Functions Declaration (Actions) ****
     **************************************/
    //#region Actions
    function logout(): void {
      currentUser.value = {
        id: 0,
        fullName: "",
        email: "",
        role: "",
        status: "",
        createdAt: "",
      };
      navigateTo("/login");
    }
    //#endregion
    return {
      users,
      currentUser,
      getLoggedUser,
      logout,
      isAdmin,
      search,
      roleFilter,
      statusFilter,
      sortBy,
      sortDir,
    };
  },
  {
    persist: {
      storage: typeof window !== "undefined" ? localStorage : undefined,
      pick: ["currentUser", "users"],
    },
  }
);
