import { ref, computed, watch } from "vue";
import { usePagination } from "@/composables/usePagination";
import { useReportStore } from "@/stores/reports";
import { storeToRefs } from "pinia";
import type { Report } from "@/interfaces/reports";
import type { ComputedRef } from "vue";
export function useReports() {
  /***************************************
   **** Section Variables Declaration ****
   **************************************/
  //#region Variables
  const { currentPage, itemsPerPage } = usePagination();
  const { reports, search, statusFilter, typeFilter } = storeToRefs(
    useReportStore()
  );
  
  //#endregion

  /***************************************
   **** Section Computed Variables  ******
   **************************************/
  //#region Computed
  const filteredReports: ComputedRef<Report[]> = computed(() => {
    return reports.value.filter((u) => {
      return (
        (typeFilter.value === "all" || u.type === typeFilter.value) &&
        (statusFilter.value === "all" || u.status === statusFilter.value)
      );
    });
  });

  const paginatedReports: ComputedRef<Report[]> = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;

    return filteredReports.value.slice(start, end);
  });
  //#endregion

  /***************************************
   **** Section Watchers *****************
   **************************************/
  //#region Watchers
  watch(
    [search, typeFilter, statusFilter],
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
    typeFilter.value = "all";
    statusFilter.value = "all";
  }
  //#endregion

  return {
    filteredReports,
    paginatedReports,
    search,
    typeFilter,
    statusFilter,
    clearFilters,
  };
}
