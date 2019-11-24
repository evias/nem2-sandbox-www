import Vue from 'vue';

// internal dependencies
import CatapultHttp from '../infrastructure/CatapultHttp.js';
import CatapultWebsocket from '../infrastructure/CatapultWebsocket.js';

import Lock from './Lock.js';
const AwaitLock = Lock.create();

export default {
  namespaced: true,
  state: {
    initialized: false,
    height: 0,
    numTransactions: 0,
    numPublicAccounts: 0,
  },
  mutations: {
    setInitialized: (state, initialized) => { state.initialized = initialized },
    mutate: (state, { key, value }) => Vue.set(state, key, value),
  },
  getters: {
    getInitialized: state => state.initialized,
    height: state => state.height,
    numTransactions: state => state.numTransactions,
    numPublicAccounts: state => state.numPublicAccounts,
  },
  actions: {
    async initialize({ commit, dispatch, getters }) {
      const callback = async () => {

        // 1) get diagnostic information
        CatapultHttp.diagnosticHttp.getDiagnosticStorage().subscribe((info) => {
          commit('mutate', {key: 'numTransactions', value: info.numTransactions})
          commit('mutate', {key: 'numPublicAccounts', value: info.numAccounts})
          commit('mutate', {key: 'height', value: info.numBlocks})
        })

        // 2) open websocket connection
        CatapultWebsocket.listener.open().then(() => {
          CatapultWebsocket.listener.newBlock().subscribe((block) => {
            commit('mutate', {key: 'height', value: block.height.compact()})
          });
        });

        commit('setInitialized', true)
      }
      await AwaitLock.initialize(callback, commit, dispatch, getters)
    },
    async uninitialize({ commit, dispatch, getters }) {
      const callback = async () => {
        commit('setInitialized', false)
      }
      await AwaitLock.uninitialize(callback, commit, dispatch, getters)
    }
  }
};
