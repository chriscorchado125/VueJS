import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    search: "",
    pageNum: 1,
    maxRecords: 50,
    pageDirection: "",
    nextRecord: false,
    pageRecords: [],
    pageRecordCount: 0,
    pageRecordUserText: ""
  },
  mutations: {
    setRecords(state, data) {
      state.pageRecords = data;
      state.pageRecordCount = data.length;

      let itemText = "Items";
      if (state.pageRecordCount == 1) itemText = "Item";

      let pagingText: string;

      // add pagination
      // TODO: fix next link to replace state.pageRecordCount == state.maxRecords
      if (state.pageRecordCount == state.maxRecords || state.pageNum > 1) {
        const firstRange = state.maxRecords * state.pageNum;
        const secondRange = (state.maxRecords * (state.pageNum - 1)) + 1;
        const lastRange = (secondRange + state.pageRecordCount) - 1;

        if (state.pageNum === 1) {
          // first page
          pagingText = itemText + " " + state.pageNum + "-" + state.maxRecords;
        } else {
          // middle pages
          if (state.pageRecordCount == state.maxRecords) {
            pagingText = itemText + " " + secondRange + "-" + firstRange;
          } else {
            // last page
            pagingText = itemText + " " + secondRange + "-" + lastRange;
          }
        }
      } else {
        // contact us does not return data.length because the HTML is scraped
        if (data.length) {
          pagingText = data.length + " " + itemText;
        } else {
          pagingText = "";
        }
      }

      state.pageRecordUserText = pagingText;
    },
    setSearchedFor(state, searched) {
      state.search = searched;
    },
    setNextRecord(state, nextRec) {
      state.nextRecord = nextRec;
    },
    setPageNum(state, num) {
      state.pageNum = num;
    },
    setMaxItemsPerPage(state, num) {
      state.maxRecords = num;
    },
    setPagingDirection(state, dir) {
      state.pageDirection = dir;
    }
  },
  actions: {},
  modules: {}
});
