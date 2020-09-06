import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    search: "",
    pageRecords: [],
    pageRecordCount: 0,
    pageRecordUserText: ""
  },
  mutations: {
    setRecords(state, data) {
      state.pageRecords = data;
    },
    setSearchedFor(state, searched) {
      state.search = searched;
    },
    setRecordCount(state, count) {
      state.pageRecordCount = count;
    },
    setUserRecordCount(state) {
      let itemText = "items";
      if (state.pageRecordCount == 1) itemText = "item";
      state.pageRecordUserText = state.pageRecordCount + " " + itemText;
    }
  },
  actions: {},
  modules: {}
});
