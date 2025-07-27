<script setup lang="ts">
import { ref, PropType } from "vue";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useUserStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import getStatusColor from "@/utilities/getStatusColor";
import { Report } from "@/interfaces/reports";
/***************************************
 **** Section Props Declaration  ******
 **************************************/
//#region Props
const props = defineProps({
  reportData: Object as PropType<Report>,
});

//#endregion

/***************************************
 **** Section Emits Declaration ********
 **************************************/
//#region Emits
const emit = defineEmits(["close"]);

//#endregion

/***************************************
 **** Section Variables Declaration ****
 **************************************/
//#region Variables

const { users } = storeToRefs(useUserStore());
const isOpen = defineModel("isOpen", { default: false });
const form = ref({
  id: null,
  fullName: "",
  email: "",
  role: "client",
  status: "active",
  createdAt: new Date().toISOString().slice(0, 10),
});
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
//#endregion
</script>

<template>
  <Dialog v-model:open="isOpen" >
    <DialogContent class="!w-[500px]">
      <DialogHeader class="flex justify-between items-center">
        <DialogTitle class="text-lg font-semibold">Report <strong> {{ reportData.title }} </strong> Details</DialogTitle>
      </DialogHeader>

      <!-- Responsive Grid of Report Fields -->
      <div class="grid grid-cols-1 sm:grid-cols-12 gap-4 mt-4">
        <!-- Title -->
        <div class="sm:col-span-6">
          <label class="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            disabled
            :value="reportData.title"
            class="mt-1 w-full border rounded px-3 py-2 bg-gray-100 text-gray-700"
          />
        </div>

        <!-- Type -->
        <div class="sm:col-span-6">
          <label class="block text-sm font-medium text-gray-700">Type</label>
          <input
            type="text"
            disabled
            :value="reportData.type"
            class="mt-1 w-full border rounded px-3 py-2 bg-gray-100 text-gray-700"
          />
        </div>

        <!-- Status -->
        <div class="sm:col-span-6">
          <label class="block text-sm font-medium text-gray-700">Status</label>
          <input
            type="text"
            disabled
            :value="reportData.status"
            :class="[
              'mt-1 w-full border rounded px-3 py-2 ',
              getStatusColor(reportData.status),
            ]"
          />
        </div>

        <!-- Created At -->
        <div class="sm:col-span-6">
          <label class="block text-sm font-medium text-gray-700"
            >Created At</label
          >
          <input
            type="text"
            disabled
            :value="reportData.createdAt"
            class="mt-1 w-full border rounded px-3 py-2 bg-gray-100 text-gray-700"
          />
        </div>

        <!-- Description (Full Width) -->
        <div class="sm:col-span-12">
          <label class="block text-sm font-medium text-gray-700"
            >Description</label
          >
          <textarea
            disabled
            :value="reportData.description"
            class="mt-1 w-full border rounded px-3 py-2 bg-gray-100 text-gray-700 resize-none"
            rows="3"
          />
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>
<style>
.role-select button {
  width: 100%;
}

</style>
