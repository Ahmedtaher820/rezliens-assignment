<script setup lang="ts">
import { useReports } from "@/composables/useReports";
import { usePagination } from "@/composables/usePagination";
import { ref, computed, onMounted } from "vue";
import { useReportStore } from "@/stores/reports";
import { storeToRefs } from "pinia";
import { toast } from "vue3-toastify";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import getStatusColor from "@/utilities/getStatusColor";
import type { Report } from "@/interfaces/reports";
/***************************************
 **** Section Props Declaration  ******
 **************************************/
//#region Props
//#endregion

/***************************************
 **** Section Emits Declaration ********
 **************************************/
//#region Emits
const emit = defineEmits(["displayReport"]);

//#endregion

/***************************************
 **** Section Variables Declaration ****
 **************************************/
//#region Variables
const { filteredReports, paginatedReports } = useReports();
const { currentPage, itemsPerPage, setPage } = usePagination();
const { reports } = storeToRefs(useReportStore());
const status = ref(["pending", "completed", "rejected"]);
const hydrated = ref(false);

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
onMounted(() => {
  // Delay rendering until hydration from storage is done
  setTimeout(() => {
    hydrated.value = true;
  }, 0);
});
//#endregion

/***************************************
 **** Section Functions Declaration ****
 **************************************/
//#region Functions

function viewReports(report: Report): void {
  emit("displayReport", report);
}

function getTypeColor(type: string) {
  return {
    bug: "bg-red-100 text-red-600 px-2 py-1 rounded-xl",
    feature: "bg-green-100  text-green-600 px-2 py-1 rounded-xl my-2",
  }[type];
}

function changeStatus(report: Report, status: string) {
  reports.value = reports.value.map((item) => {
    item.status = item.id === report.id ? status : item.status;
    return item;
  });
  toast.success(`Status of ${report.title} is Changed`, {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
  });
}
//#endregion
</script>

<template>
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Title</TableHead>
        <TableHead>Type </TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Created At</TableHead>
        <TableHead>Description</TableHead>
        <TableHead>Actions</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <template v-if="paginatedReports.length">
        <TableRow v-for="report in paginatedReports" :key="report.id">
          <TableCell>{{ report.title }}</TableCell>
          <TableCell class="capitalize w-24">
            <div
              class="flex items-center gap-1"
              :class="getTypeColor(report.type)"
            >
              <span>
                {{ report.type }}
              </span>
              <Bug v-if="report.type === 'bug'" class="w-5 h-5 text-red-500" />
              <BadgeCheck v-else class="w-5 h-5 text-green-500" />
            </div>
          </TableCell>
          <TableCell class="capitalize text-center" @click="">
            <div class="w-24 cursor-pointer">
              <DropdownMenu v-if="hydrated">
                <DropdownMenuTrigger
                  :class="getStatusColor(report.status)"
                  class="flex items-center gap-1"
                >
                  <span>
                    {{ report.status }}
                  </span>
                  <chevrons-up-down class="w-5 h-5" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Change Status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    v-for="itemStatus in status"
                    :key="itemStatus"
                    :class="[
                      getStatusColor(itemStatus),
                      itemStatus === report.status
                        ? 'pointer-events-none '
                        : '',
                    ]"
                    class="cursor-pointer"
                    @click="changeStatus(report, itemStatus)"
                    >{{ itemStatus }}</DropdownMenuItem
                  >
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </TableCell>
          <TableCell>{{ report.createdAt }}</TableCell>
          <TableCell>{{ report.description }}</TableCell>
          <TableCell>
            <Button variant="outline" size="sm" @click="viewReports(report)"
              >View</Button
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
    :total="filteredReports.length"
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
