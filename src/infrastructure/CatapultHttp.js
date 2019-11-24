/*
 *
 * Copyright (c) 2019-present for NEM
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
 *
 */
import {
    AccountHttp,
    BlockHttp,
    ChainHttp,
    DiagnosticHttp,
    MosaicHttp,
    MosaicService,
    NamespaceHttp,
    NamespaceService,
    NetworkHttp,
    TransactionHttp,
} from 'nem2-sdk'

import Helpers from '../Helpers.js';

let NODE_URL
let NETWORK_TYPE

export default class CatapultHttp {
  static async init(nodeUrl) {
    NODE_URL = nodeUrl
    NETWORK_TYPE = await CatapultHttp.networkHttp.getNetworkType().toPromise()
  }

  static get nodeUrl() {
    return NODE_URL
  }

  static get websocketUrl() {
    return Helpers.httpToWsUrl(this.nodeUrl)
  }

  static get networkType() {
    return NETWORK_TYPE
  }

  static get accountHttp() {
    return new AccountHttp(CatapultHttp.nodeUrl)
  }

  static get blockHttp() {
    return new BlockHttp(CatapultHttp.nodeUrl)
  }

  static get chainHttp() {
    return new ChainHttp(CatapultHttp.nodeUrl)
  }

  static get diagnosticHttp() {
    return new DiagnosticHttp(CatapultHttp.nodeUrl)
  }

  static get mosaicHttp() {
    return new MosaicHttp(CatapultHttp.nodeUrl)
  }

  static get mosaicService() {
    return new MosaicService(CatapultHttp.accountHttp, CatapultHttp.mosaicHttp)
  }

  static get namespaceHttp() {
    return new NamespaceHttp(CatapultHttp.nodeUrl)
  }

  static get namespaceService() {
    return new NamespaceService(CatapultHttp.namespace)
  }

  static get networkHttp() {
    return new NetworkHttp(CatapultHttp.nodeUrl)
  }

  static get transactionHttp() {
    return new TransactionHttp(CatapultHttp.nodeUrl)
  }
}