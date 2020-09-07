import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    search: "",
    pageRecords: [],
    pageRecordUserText: ""
  },
  mutations: {
    setRecords(state, data) {
      state.pageRecords = data;

      let itemText = "items";
      if (data.length == 1) itemText = "item";
      state.pageRecordUserText = data.length + " " + itemText;
    },
    setSearchedFor(state, searched) {
      state.search = searched;
    }
  },
  actions: {},
  modules: {}
});
