  
  <script setup lang="ts">
  import { useReports } from '@/composables/useReports'
  import {useReportStore} from "@/stores/reports"
  import { Input } from '@/components/ui/input'
  import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
  } from '@/components/ui/select'
import { storeToRefs } from 'pinia'
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
 const {  clearFilters } = useReports()
 const {search , statusFilter,typeFilter} = storeToRefs(useReportStore())
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
      <Select v-model="typeFilter">
        <SelectTrigger class="w-40">
          <SelectValue placeholder="Filter by Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="bug">Bug</SelectItem>
          <SelectItem value="feature">Feature</SelectItem>
        </SelectContent>
      </Select>
      <Select v-model="statusFilter">
        
        <SelectTrigger class="w-40">
          <SelectValue placeholder="Filter by Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
          <SelectItem value="rejected">Rejected</SelectItem>
        </SelectContent>
      </Select>
      <Button class="" @click="clearFilters" >Clear Filter</Button>

    </div>
  </template>