
import {NetworkType} from 'nem2-sdk'
import moment from 'moment'

class Helpers {
  static validURL(_str) {
    if (typeof _str === 'string') {
      let str = _str.replace('ws', 'http')
      let pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i') // fragment locator
      return !!pattern.test(str)
    }
  }

  static formatUrl(rawUrl) {
    if (this.validURL(rawUrl)) {
      let url = new URL(rawUrl)
      return {
        protocol: url.protocol,
        hostname: url.hostname,
        port: url.port,
        url: rawUrl
      }
    }
  }

  static httpToWsUrl(url) {
    if (this.validURL(url)) {
      return url.replace('http', 'ws')
    }
  }

  static networkTypeToName(networkType) {
    if (networkType === NetworkType.MIJIN_TEST) {
      return 'MIJIN_TEST'
    }
    else if (networkType === NetworkType.MIJIN) {
      return 'MIJIN'
    }
    else if (networkType === NetworkType.TEST_NET) {
      return 'TEST_NET'
    }
    else if (networkType === NetworkType.MAIN_NET) {
      return 'MAIN_NET'
    }
  }

  static timestampToTime(timestamp) {
    return moment.utc(
      (timestamp / 1000 + 1459468800) * 1000
    ).local().format('YYYY-MM-DD HH:mm:ss')
  }
}

export default Helpers;
