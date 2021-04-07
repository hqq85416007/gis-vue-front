const Mock = require('mockjs')
const { param2Obj } = require('@/utils/common.js')

const demo = require('./modules/demo')
const app = require('./modules/imf/app')
const appService = require('./modules/imf/appService')
const msg = require('./modules/imf/msg')
const msgRoute = require('./modules/imf/msgRoute')
const msgType = require('./modules/imf/msgType')
const service = require('./modules/imf/service')
const carOnline = require('./modules/car/carOnline')
const mocks = [
  ...demo,
  ...app,
  ...appService,
  ...msg,
  ...msgRoute,
  ...msgType,
  ...service,
  ...carOnline,
]
function mockXHR() {
  Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
  Mock.XHR.prototype.send = function () {
    if (this.custom.xhr) {
      this.custom.xhr.withCredentials = this.withCredentials || false

      if (this.responseType) {
        this.custom.xhr.responseType = this.responseType
      }
    }
    this.proxy_send(...arguments)
  }

  function XHR2ExpressReqWrap(respond) {
    return function (options) {
      let result = null
      if (respond instanceof Function) {
        const { body, type, url } = options
        result = respond({
          method: type,
          body: JSON.parse(body),
          query: param2Obj(url)
        })
      } else {
        result = respond
      }
      return Mock.mock(result)
    }
  }
  for (const i of mocks) {
    Mock.mock(new RegExp(i.url), i.type || 'get', XHR2ExpressReqWrap(i.response))
  }
}

module.exports = {
  mocks,
  mockXHR
}
