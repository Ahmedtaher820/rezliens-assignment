<script setup lang="ts">
import { ref } from "vue";
import {useUserStore} from "@/stores/auth"
import { storeToRefs } from "pinia";
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
const {currentUser} = storeToRefs(useUserStore())
const profile = ref({
  id: 10,
  fullName: currentUser.value.fullName,
  email: currentUser.value.email,
  role: currentUser.value.role,
  status: currentUser.value.status,
  createdAt: currentUser.value.createdAt,
});

// Local state for edit mode
const isEditing = ref(false);

// Editable copy of profile for the form
const editableProfile = ref({ ...profile.value });

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

function cancelEdit() {
  editableProfile.value = currentUser.value; // reset edits
  isEditing.value = false;
}


function saveEdit() {
  profile.value = { ...editableProfile.value };
  currentUser.value = profile.value
  isEditing.value = false;
}

//#endregion
</script>

<template>
  <div class="mx-auto p-6 bg-white rounded-md shadow-md">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-semibold">Profile Details</h1>
      <Button v-if="isEditing" @click="isEditing = false">Cancel</Button>
      <Button v-else @click="isEditing = true">Update</Button>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <!-- Full Name -->
      <div>
        <label class="block text-sm font-medium text-gray-600 mb-1"
          >Full Name</label
        >
        <template v-if="isEditing">
          <input
            v-model="editableProfile.fullName"
            type="text"
            class="w-full border border-gray-300 rounded px-3 py-2"
          />
        </template>
        <template v-else>
          <p class="py-2">{{ profile.fullName }}</p>
        </template>
      </div>

      <!-- Email -->
      <div>
        <label class="block text-sm font-medium text-gray-600 mb-1"
          >Email</label
        >
        <template v-if="isEditing">
          <input
            v-model="editableProfile.email"
            type="email"
            class="w-full border border-gray-300 rounded px-3 py-2"
          />
        </template>
        <template v-else>
          <p class="py-2">{{ profile.email }}</p>
        </template>
      </div>

      <!-- Role -->
      <div>
        <label class="block text-sm font-medium text-gray-600 mb-1">Role</label>
        <template v-if="isEditing">
          <Select v-model="editableProfile.role" disabled class="w-full">
            <SelectTrigger class="w-full">
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="client">Client</SelectItem>
            </SelectContent>
          </Select>
        </template>
        <template v-else>
          <p class="py-2 capitalize">{{ profile.role }}</p>
        </template>
      </div>

      <!-- Status -->
      <div>
        <label class="block text-sm font-medium text-gray-600 mb-1"
          >Status</label
        >
        <template v-if="isEditing">
          <Select v-model="editableProfile.status" class="w-full role-select">
            <SelectTrigger class="w-full">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </template>

        <template v-else>
          <p class="py-2 capitalize">{{ profile.status }}</p>
        </template>
      </div>

      <!-- Created At (read-only, no edit) -->
      <div class="sm:col-span-2">
        <label class="block text-sm font-medium text-gray-600 mb-1"
          >Account Created At</label
        >
        <p class="py-2">{{ profile.createdAt }}</p>
      </div>
    </div>

    <div v-if="isEditing" class="mt-6 space-x-3">
      <Button
        @click="saveEdit"
        class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Save
      </Button>
      <Button variant="destructive" @click="cancelEdit">Cancel</Button>
    </div>
  </div>
</template>
