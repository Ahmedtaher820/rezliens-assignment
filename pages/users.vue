<script setup lang="ts">
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
const isAdmin = true
const showModal = ref(false)
const editingUser = ref(null)

//#region Variables
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
function openAddModal() {
    editingUser.value = null
    showModal.value = true
}

function closeModal() {
    showModal.value = false
}

function editUser(user: any) {
    editingUser.value = user
    showModal.value = true
}
//#endregion
</script>

<template>
    <div>
        <div class="flex justify-between items-center mb-6">
            <UsersUsersFilters />
            <Button v-if="isAdmin" @click="openAddModal">+ Add User</Button>
        </div>
        <UsersUsersTable @editUser="editUser" />
        <UsersUsersForm v-if="showModal" :editUser="editingUser" @close="closeModal" />
    </div>
</template>
<style></style>