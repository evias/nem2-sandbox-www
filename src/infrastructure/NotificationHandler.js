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
// internal dependencies
import Helpers from '../Helpers';

export default class NotificationHandler {

  static handlerByEvent(event) {
    switch(event) {
      default:
        return NotificationHandler.generic

      case 'newBlock':
        return NotificationHandler.newBlock
    }
  }

  static generic(message, variant) {
    return {
      variant: variant && variant.length ? variant : 'info',
      message: message,
      time: Helpers.timestampToTime((new Date()).valueOf())
    }
  }

  static newBlock(block) {
    return {
      variant: 'success',
      message: 'New block added <strong>#' + block.height.compact() + '</strong>',
      time: Helpers.timestampToTime(block.timestamp.compact()),
      // extra information
      height: block.height.compact()
    }
  }
}
