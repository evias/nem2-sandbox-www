import Vue from 'vue';
import Vuex from 'vuex';

import NetworkStore from './Network.js';
import ChainStore from './Chain.js';
import Lock from './Lock.js';
const AwaitLock = Lock.create();

Vue.use(Vuex);

export default new Vuex.Store({
  strict: false,
  modules: {
    network: NetworkStore,
    chain: ChainStore,
  },
  actions: {
    async initialize({ commit, dispatch, getters }) {
      const callback = async () => {
        await dispatch('network/initialize')
      }
      await AwaitLock.initialize(callback, commit, dispatch, getters)
    },
    // Uninitialize the stores (call on app destroyed).
    async uninitialize({ dispatch }) {
      await Promise.all([
        dispatch('network/uninitialize'),
        dispatch('chain/uninitialize'),
      ])
    }
  }
});
