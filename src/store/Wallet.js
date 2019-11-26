import Vue from 'vue';
import {
  Address,
  QueryParams,
} from 'nem2-sdk'

// internal dependencies
import CatapultHttp from '../infrastructure/CatapultHttp.js';
import CatapultWebsocket from '../infrastructure/CatapultWebsocket.js';

import Lock from './Lock.js';
const AwaitLock = Lock.create();

export default {
  namespaced: true,
  state: {
    initialized: false,
    currentAddress: '',
    allTransactions: [],
    confirmedTransactions: [],
    unconfirmedTransactions: [],
    partialTransactions: [],
    accountInfo: null,
    // Subscription to transactions.
    subscriptions: [],
  },
  mutations: {
    setInitialized: (state, initialized) => { state.initialized = initialized },
    mutate: (state, { key, value }) => Vue.set(state, key, value),
    currentWalletAddress: (state, newAddress) => Vue.set(state, 'currentAddress', newAddress),
  },
  getters: {
    getInitialized: state => state.initialized,
    currentWalletAddress: state => state.currentAddress,
    getSubscriptions: state => state.subscriptions,
    confirmedTransactions: state => state.confirmedTransactions,
    unconfirmedTransactions: state => state.unconfirmedTransactions,
    partialTransactions: state => state.partialTransactions,
    allTransactions: state => {
      return [].concat(
        state.confirmedTransactions,
        state.unconfirmedTransactions,
        state.partialTransactions,
      )
    },
    accountInfo: state => state.accountInfo,
  },
  actions: {
    async initialize({ commit, dispatch, getters }, address) {
      const callback = async () => {
        if (!address || !address.length) {
            return ;
        }

        // open websocket connection
        dispatch('subscribe', address)
        dispatch('resetTransactions')
        commit('setInitialized', true)
      }
      await AwaitLock.initialize(callback, commit, dispatch, getters)
    },
    async uninitialize({ commit, dispatch, getters }) {
      const callback = async () => {
        dispatch('unsubscribe')
        dispatch('resetTransactions')
        commit('setInitialized', false)
      }
      await AwaitLock.uninitialize(callback, commit, dispatch, getters)
    },
/**
 * Websocket API
 */
    // Subscribe to latest account transactions.
    async subscribe({ commit, dispatch }, address) {
      if (!address || !address.length) {
        return ;
      }

      const subscriptions = await CatapultWebsocket.subscribeTransactions(
        dispatch,
        CatapultHttp.websocketUrl,
        address,
      )
      commit('mutate', {key: 'subscriptions', value: subscriptions})
    },

    // Unsubscribe from the latest blocks.
    unsubscribe({ commit, getters }) {
      let subscriptions = getters.getSubscriptions
      if (subscriptions.length) {
        subscriptions[1].map((subscription) => {
          subscription.unsubscribe()
        })

        subscriptions[0].close()

        commit('mutate', {key: 'subscriptions', value: []})
      }
    },
/**
 * REST API
 */
    fetchTransactions({dispatch, emit}, address, pageSize, fromId) {
      if (!address || !address.length === 40) {
        return ;
      }

      try {
        const queryParams = new QueryParams(pageSize, fromId)
        const nemAddress = Address.createFromRawAddress(address)
        CatapultHttp.accountHttp.getAccountTransactions(nemAddress, queryParams)
                    .subscribe((transactions) => {
          transactions.map((transaction) => dispatch('addTransaction', {
            group: 'confirmed',
            transaction
          }))
        })
      }
      catch (e) {
        emit('addNotification', {
          variant: 'danger',
          message: 'An error happened while trying to fetch transactions: <pre>' + e + '</pre>',
          time: (new Date()).valueOf()
        })
      }
    },
    fetchInfo({commit, emit}, address) {
      if (!address || !address.length === 40) {
        return ;
      }

      try {
        const nemAddress = Address.createFromRawAddress(address)
        CatapultHttp.accountHttp.getAccountInfo(nemAddress)
                    .subscribe((accountInfo) => {
          return commit('mutate', {key: 'accountInfo', value: accountInfo});
        })
      }
      catch (e) {
        emit('addNotification', {
          variant: 'danger',
          message: 'An error happened while trying to fetch account information: <pre>' + e + '</pre>',
          time: (new Date()).valueOf()
        })
      }
    },
/**
 * Store API
 */
    resetTransactions({commit}) {
      commit('mutate', {key: 'confirmedTransactions', value: []})
      commit('mutate', {key: 'unconfirmedTransactions', value: []})
      commit('mutate', {key: 'partialTransactions', value: []})
    },
    addTransaction({commit, getters}, transactionMessage) {
      if (!transactionMessage || !transactionMessage.group) {
        throw Error('Wallet.addTransaction requires a transaction group.')
      }

      let transactions = []
      let transactionGroup = '';
      const transaction = transactionMessage.transaction
      switch (transactionMessage.group.toLowerCase()) {
        default:
          throw Error('Wallet.addTransaction requires a transaction group.')

        case 'unconfirmed':
        case 'confirmed':
        case 'partial':
          transactionGroup = transactionMessage.group.toLowerCase() + 'Transactions'
          break;
      }

      transactions = getters[transactionGroup]
      transactions.push(transaction)
      return commit('mutate', {key: transactionGroup, value: transactions})
    },
    removeTransaction({commit, getters}, transactionMessage) {
      if (!transactionMessage || !transactionMessage.group) {
        throw Error('Wallet.addTransaction requires a transaction group.')
      }

      let transactions = []
      let transactionGroup = '';
      switch (transactionMessage.group.toLowerCase()) {
        default:
          throw Error('Wallet.removeTransaction requires a transaction group.')

        case 'unconfirmed':
        case 'confirmed':
        case 'partial':
          transactionGroup = transactionMessage.group.toLowerCase() + 'Transactions'
          break;
      }

      const transaction = transactionMessage.transaction
      const transactionHash = transaction.meta.hash
      transactions = getters[transactionGroup]

      const findIterator = transactions.find(tx => tx.meta.hash === transactionHash)
      if (findIterator === undefined) {
        return ;
      }
  
      delete transactions[findIterator]
      return commit('mutate', {key: transactionGroup, value: transactions})
    },
  }
};
