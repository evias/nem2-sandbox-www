import Vue from 'vue';
import {
  Address,
  Convert,
  QueryParams,
  SHA3Hasher,
  SignSchema,
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
    transactionHashes: [],
    confirmedTransactions: [],
    unconfirmedTransactions: [],
    partialTransactions: [],
    accountInfo: null,
    transactionCache: {},
    // Subscription to transactions.
    subscriptions: [],
  },
  mutations: {
    setInitialized: (state, initialized) => { state.initialized = initialized },
    mutate: (state, { key, value }) => Vue.set(state, key, value),
    currentWalletAddress: (state, newAddress) => Vue.set(state, 'currentAddress', newAddress),
    addTransactionToCache: (state, payload) => {
      if (payload === undefined) {
        return ;
      }

      const cache = state.transactionCache
      const hash  = payload.hash
      cache[hash] = payload.transaction
      Vue.set(state, 'transactionCache', cache)
      return cache
    } 
  },
  getters: {
    getInitialized: state => state.initialized,
    currentWalletAddress: state => state.currentAddress,
    getSubscriptions: state => state.subscriptions,
    transactionHashes: state => state.transactionHashes,
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
    transactionCache: state => state.transactionCache,
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
    async fetchTransactions({dispatch, getters}, {emitter, address, pageSize, id}) {

      if (!address || !address.length === 40) {
        return ;
      }

      // create hash of query parameters
      const query  = [address, pageSize, id].join(',')
      const hash   = new Uint8Array(64)
      const hasher = SHA3Hasher.createHasher(64, SignSchema.SHA3)
      hasher.reset()
      hasher.update(Buffer.from(query))
      hasher.finalize(hash)

      // check query cache for results
      const cacheKey = Convert.uint8ToHex(hash)
      const cache = getters['transactionCache']
      if (cache.hasOwnProperty(cacheKey)) {
        return cache[cacheKey]
      }

      try {
        const queryParams = new QueryParams(pageSize, id)
        const nemAddress = Address.createFromRawAddress(address)
        const transactions = await CatapultHttp.accountHttp
                                                .getAccountTransactions(nemAddress, queryParams).toPromise()

        // group transaction + cache
        transactions.map((transaction) => dispatch('addTransaction', {
          group: 'confirmed',
          cacheKey: cacheKey,
          transaction
        }))

        return transactions
      }
      catch (e) {
        emitter(
          'addNotification',
          'An error happened while trying to fetch transactions: <pre>' + e + '</pre>')

        return false
      }
    },
    async fetchInfo({commit}, {emitter, address}) {
      if (!address || !address.length === 40) {
        return ;
      }

      try {
        const nemAddress = Address.createFromRawAddress(address)
        const accountInfo = await CatapultHttp.accountHttp.getAccountInfo(nemAddress).toPromise()

        return commit('mutate', {key: 'accountInfo', value: accountInfo});
      }
      catch (e) {
        emitter(
          'addNotification',
          'An error happened while trying to fetch account information: <pre>' + e + '</pre>')

        return false
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

      const hashes = getters['transactionHashes']
      const findIterator = hashes.find(hash => hash === transaction.transactionInfo.hash)
      if (findIterator !== undefined) {
        return ; // transaction already known
      }

      let transactions = []
      transactions = getters[transactionGroup]
      transactions.push(transaction)
      hashes.push(transaction.transactionInfo.hash)
      commit('mutate', {key: transactionGroup, value: transactions})
      return commit('mutate', {key: 'transactionHashes', value: hashes})
    },
    removeTransaction({commit, getters}, transactionMessage) {
      if (!transactionMessage || !transactionMessage.group) {
        throw Error('Wallet.addTransaction requires a transaction group.')
      }

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

      // read info
      const transaction = transactionMessage.transaction
      const transactionHash = transaction.meta.hash

      // find transaction in storage
      let transactions = []
      const hashes = getters['transactionHashes']
      transactions = getters[transactionGroup]
      const findHashIt = hashes.find(hash => hash === transactionHash)
      const findIterator = transactions.find(tx => tx.meta.hash === transactionHash)
      if (findIterator === undefined) {
        return ;
      }

      delete transactions[findIterator]
      delete hashes[findHashIt]
      commit('mutate', {key: transactionGroup, value: transactions})
      return commit('mutate', {key: 'transactionHashes', value: hashes})
    },
  }
};
