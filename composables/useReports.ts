import { ref, computed, watch } from "vue";
import { usePagination } from "@/composables/usePagination";
import { useReportStore } from "@/stores/reports";
import { storeToRefs } from "pinia";
export function useReports() {
  /***************************************
   **** Section Variables Declaration ****
   **************************************/
  //#region Variables
  const { currentPage, itemsPerPage } = usePagination();
  const { reports } = storeToRefs(useReportStore());
  const search = ref("");
  const typeFilter = ref("");
  const statusFilter = ref("");
  //#endregion

  /***************************************
   **** Section Computed Variables  ******
   **************************************/
  //#region Computed
  const filteredReports = computed(() => {
    return reports.value.filter((u) => {
      return (
        (typeFilter.value === "" || u.type === typeFilter.value) &&
        (statusFilter.value === "" || u.status === statusFilter.value)
      );
    });
  });

  const paginatedReports = computed(() => {
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
      console.log("Filters changed:", newSearch, newRole, newStatus);
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
