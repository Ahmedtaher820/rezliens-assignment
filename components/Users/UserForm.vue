<script setup lang="ts">
import { ref, watch, computed } from "vue";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
/***************************************
 **** Section Props Declaration  ******
 **************************************/
//#region Props
const props = defineProps({
  editUser: Object,
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
const isEdit = computed(() => !!props.editUser);
//#endregion

/***************************************
 **** Section Watchers *****************
 **************************************/
//#region Watchers
watch(
  () => props.editUser,
  (user) => {
    if (user) {
      form.value = {
        id: user.id || null,
        fullName: user.fullName || "",
        email: user.email || "",
        role: user.role || "client",
        status: user.status || "active",
        createdAt: user.createdAt || new Date().toISOString().slice(0, 10),
      };
    } else {
      form.value = {
        id: null,
        fullName: "",
        email: "",
        role: "client",
        status: "active",
        createdAt: new Date().toISOString().slice(0, 10),
      };
    }
  },
  { immediate: true }
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
function handleSubmit() {
  if (isEdit.value) {
    const index = users.value.findIndex((u) => u.id === form.value.id);
    if (index !== -1) users.value[index] = { ...form.value };
  } else {
    const newId = Math.max(...users.value.map((u) => u.id)) + 1;
    users.value.push({ ...form.value, id: newId });
  }

  emit("close");
}
//#endregion
</script>

<template>
  <Dialog open @close="emit('close')">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{{ isEdit ? "Edit User" : "Add User" }}</DialogTitle>
      </DialogHeader>

      <form @submit.prevent="handleSubmit" class="space-y-2">
        <div class="flex flex-col gap-1">
          <label for="">Full Name</label>
          <Input
            v-model="form.fullName"
            placeholder="enter full name"
            required
          />
        </div>
        <div class="flex flex-col gap-1">
          <label for="">Email</label>
          <Input
            v-model="form.email"
            type="email"
            placeholder="enter Email"
            required
          />
        </div>
        <div class="grid grid-cols-12 gap-4">
          <div class="flex-1 col-span-6">
            <label for="">Role</label>
            <Select v-model="form.role" class="w-full">
              <SelectTrigger class="w-full">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="client">Client</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div class="col-span-6">
            <label for="">User Status</label>
            <Select v-model="form.status" class="w-full role-select">
              <SelectTrigger class="w-full">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div class="flex justify-end gap-2 mt-8">
          <Button type="button" variant="outline" @click="emit('close')"
            >Cancel</Button
          >
          <Button type="submit">{{ isEdit ? "Update" : "Create" }}</Button>
        </div>
      </form>
    </DialogContent>
  </Dialog>
</template>
<style>
.role-select button{
    width: 100%;
}
</style>
