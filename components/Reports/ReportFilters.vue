  
  <script setup lang="ts">
  import { useUsers } from '@/composables/useUsers'
  import { Input } from '@/components/ui/input'
  import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
  } from '@/components/ui/select'
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
 const { search, roleFilter, statusFilter, clearFilters } = useUsers()
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


//#endregion
  
  </script>

<template>
    <div class="flex flex-wrap gap-4">
      <Input
        v-model="search"
        placeholder="Search by name or email"
        class="w-full sm:w-64"
      />
      <Select v-model="roleFilter">
        <SelectTrigger class="w-40">
          <SelectValue placeholder="Filter by Role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="admin">Admin</SelectItem>
          <SelectItem value="client">Client</SelectItem>
        </SelectContent>
      </Select>
      <Select v-model="statusFilter">
        
        <SelectTrigger class="w-40">
          <SelectValue placeholder="Filter by Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="inactive">Inactive</SelectItem>
        </SelectContent>
      </Select>
      <Button class="" @click="clearFilters" >Clear Filter</Button>

    </div>
  </template>