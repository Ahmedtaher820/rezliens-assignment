<script setup lang="ts">
import { useReports } from '@/composables/useReports'
import { usePagination } from '@/composables/usePagination'
import { ref, computed } from "vue"
import { useReportStore } from "@/stores/reports"
import { storeToRefs } from 'pinia'
import type { User } from '@/interfaces/auth'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination'
/***************************************
 **** Section Props Declaration  ******
 **************************************/
//#region Props
//#endregion

/***************************************
 **** Section Emits Declaration ********
 **************************************/
//#region Emits
const emit = defineEmits(['editUser'])

//#endregion

/***************************************
 **** Section Variables Declaration ****
 **************************************/
//#region Variables
const { filteredReports,paginatedReports  } = useReports()
const { currentPage, itemsPerPage, setPage } = usePagination()
const {  } = storeToRefs(useReportStore())

//#endregion

/***************************************
 **** Section Computed Variables  ******
 **************************************/
//#region Computed
const totalPages = computed(() =>
    Math.ceil(filteredReports.value.length / itemsPerPage.value)
)
const startIndex = computed(() => {
    return (currentPage.value - 1) * itemsPerPage.value
})
const endIndex = computed(() => {
    return startIndex.value + itemsPerPage.value
})

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

function checkStatus(userStatus: string): string {
    return userStatus === 'active' ? 'text-green-100 text-green-800' : 'text-red-100 text-red-800'
}
//#endregion

</script>

<template>
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead> <span>▲</span>
                    <span>▼</span> Title
                </TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead >Created At</TableHead>
                <TableHead >Actions</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            <TableRow v-for="user in paginatedReports" :key="user.id">
                <TableCell>{{ user.title }}</TableCell>
                <TableCell>{{ user.email }}</TableCell>
                <TableCell class="capitalize">{{ user.role }}</TableCell>
                <TableCell class="capitalize" :class="[checkStatus(user.status)]">{{ user.status }}</TableCell>
                <TableCell>{{ user.createdAt }}</TableCell>
                <TableCell v-if="isAdmin" class="flex items-center gap-2">  
                    <Button variant="outline" size="sm" @click="edit(user)">Edit</Button>
                    <Button variant="destructive" size="sm" @click="remove(user)">Delete</Button>
                </TableCell>
            </TableRow>
        </TableBody>
    </Table>
    <Pagination v-slot="{ page }" :items-per-page="itemsPerPage" :total="filteredUsers.length"
        :default-page="currentPage" @update:page="setPage"
        class="mt-6"
        >
        <PaginationContent v-slot="{ items }">
            <PaginationPrevious />

            <template v-for="(item, index) in items" :key="index">
                <PaginationItem v-if="item.type === 'page'" :value="item.value" :is-active="item.value === page">
                    {{ item.value }}
                </PaginationItem>
            </template>

            <PaginationEllipsis :index="4" />

            <PaginationNext />
        </PaginationContent>
    </Pagination>
</template>
