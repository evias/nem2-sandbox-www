/*
 * Copyright (c) 2019-present Grégory Saive for NEM
 *
 * Licensed under the Apache License, Version 2.0 (the "License ");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import {
  Address,
  Listener,
} from 'nem2-sdk';

// internal dependencies
import { eventBus } from '../main'

let HTTP
let LISTENER

export default class CatapultWebsocket {

  static get listener() {
    return LISTENER
  }

  static async init(http) {
    HTTP = http

    console.log("WS URL: ", HTTP.websocketUrl);

    LISTENER = new Listener(HTTP.websocketUrl)
  }

  static close() {
    return LISTENER.close()
  }

  static async subscribeNewBlock(commit, wsEndpoint) {
    const listener = new Listener(wsEndpoint, WebSocket)
    await listener.open()
    let subscription = listener
      .newBlock()
      .subscribe(
        block => {
          eventBus.$emit('newBlock', block)
          return commit('mutate', {key: 'height', value: block.height.compact()})
        },
        err => console.log(err)
      )

    return [listener, subscription]
  }

  static async subscribeTransactions(dispatch, wsEndpoint, address) {
    if (!address || !address.length) {
      throw new Error('Invalid address for websocket connection.');
    }

    const nemAddress = Address.createFromRawAddress(address)
    const listener = new Listener(wsEndpoint, WebSocket)
    await listener.open()

    // unconfirmed listeners
    const unconfirmedAdded = listener
      .unconfirmedAdded(nemAddress)
      .subscribe(
        transaction => this.$store.dispatch('wallet/addTransaction', {group: 'unconfirmed', transaction}),
        err => console.log(err)
      )

    const unconfirmedRemoved = listener
      .unconfirmedRemoved(nemAddress)
      .subscribe(
        transaction => this.$store.dispatch('wallet/removeTransaction', {group: 'unconfirmed', transaction}),
        err => console.log(err)
      )

    // confirmed listener
    const confirmed = listener
      .confirmed(nemAddress)
      .subscribe(
        transaction => this.$store.dispatch('wallet/addTransaction', {group: 'confirmed', transaction}),
        err => console.log(err)
      )

    return [listener, [
      unconfirmedAdded,
      unconfirmedRemoved,
      confirmed,
    ]]
  }
}
