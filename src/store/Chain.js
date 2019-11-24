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
    // Subscription to new blocks.
    subscription: null,
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
    getSubscription: state => state.subscription,
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
        dispatch('subscribe')
        commit('setInitialized', true)
      }
      await AwaitLock.initialize(callback, commit, dispatch, getters)
    },
    async uninitialize({ commit, dispatch, getters }) {
      const callback = async () => {
        dispatch('unsubscribe')
        commit('setInitialized', false)
      }
      await AwaitLock.uninitialize(callback, commit, dispatch, getters)
    },
/**
 * Websocket API
 */
    // Subscribe to the latest blocks.
    async subscribe({ commit, getters }) {
      if (getters.getSubscription === null) {
        let subscription = await CatapultWebsocket.subscribeNewBlock(commit, CatapultHttp.websocketUrl)
        commit('mutate', {key: 'subscription', value: subscription})
      }
    },

    // Unsubscribe from the latest blocks.
    unsubscribe({ commit, getters }) {
      let subscription = getters.getSubscription
      if (subscription !== null) {
        subscription[1].unsubscribe()
        subscription[0].close()
        commit('mutate', {key: 'subscription', value: null})
      }
    }
  }
};
