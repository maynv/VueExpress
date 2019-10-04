
import {
    LOADING
} from '../types/getters';
import {
    SET_LOADING,
} from '../types/mutations';
import {
    SHOW_LOADING,
    HIDE_LOADING,
} from '../types/actions';
const state = {
    loading: false
};

const getters = {
    [LOADING](state) {
        return state.loading;
    },
};

const actions = {
    [SHOW_LOADING]({ commit }) {
        commit(SET_LOADING, true);
    },
    [HIDE_LOADING]({ commit }) {
        commit(SET_LOADING, false);
    }
};
const mutations = {
    [SET_LOADING](state, loading) {
        state.loading = loading;
    },
};

export default {
    namespaced: false,
    state,
    getters,
    actions,
    mutations
};
