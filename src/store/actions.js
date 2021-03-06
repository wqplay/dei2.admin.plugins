/***
 **                                                          _ooOoo_
 **                                                         o8888888o
 **                                                         88' . '88
 **                                                         (| -_- |)
 **                                                          O\ = /O
 **                                                      ____/`---'\____
 **                                                    .   ' \\| |// `.
 **                                                     / \\||| : |||// \
 **                                                   / _||||| -:- |||||- \
 **                                                     | | \\\ - /// | |
 **                                                   | \_| ''\---/'' | |
 **                                                    \ .-\__ `-` ___/-. /
 **                                                 ___`. .' /--.--\ `. . __
 **                                              .'' '< `.___\_<|>_/___.' >'''.
 **                                             | | : `- \`.;`\ _ /`;.`/ - ` : | |
 **                                               \ \ `-. \_ __\ /__ _/ .-` / /
 **                                       ======`-.____`-.___\_____/___.-`____.-'======
 **                                                          `=---='
 **
 **                                       .............................................
 **                                              佛祖保佑             永无BUG
 **                                      佛曰:
 **                                              写字楼里写字间，写字间里程序员；
 **                                              程序人员写程序，又拿程序换酒钱。
 **                                              酒醒只在网上坐，酒醉还来网下眠；
 **                                              酒醉酒醒日复日，网上网下年复年。
 **                                              但愿老死电脑间，不愿鞠躬老板前；
 **                                              奔驰宝马贵者趣，公交自行程序员。
 **                                              别人笑我忒疯癫，我笑自己命太贱；
 **                                              不见满街漂亮妹，哪个归得程序员？
 */
/**
 * Created by liangshan on 2017/7/13.
 */
import * as types from './mutation-types'
import axios from 'axios'
const querystring = require('querystring')
const instance = axios.create({
  timeout: 3000
})
const noop = function () {}
export const actions = {
  async [types.LOGIN] ({commit, state}, data) {
    let callback = noop
    let error = noop
    if (data.callback) {
      callback = data.callback
      delete data.callback
    }
    if (data.error) {
      error = data.error
      delete data.error
    }
    let loginData = await instance({
      method: 'post',
      baseURL: state.requestInfo.baseUrl,
      url: state.requestInfo.login,
      data: querystring.stringify(data)
    })
    if (loginData.config) {
      delete loginData.config
    }
    if (loginData.status === 200) {
      callback(loginData.data)
    } else {
      error(loginData)
    }
  },
  [types.LIST_PLUGINS] ({commit, state}, data) {
    return new Promise((resolve, reject) => {
      instance({
        method: 'post',
        baseURL: state.requestInfo.baseUrl,
        url: state.requestInfo.listPlugins,
        data: querystring.stringify(data)
      }).then((pluginsData) => {
        if (pluginsData.config) {
          delete pluginsData.config
        }
        if (pluginsData.status === 200) {
          resolve(pluginsData.data)
        } else {
          reject(pluginsData)
        }
      }).catch(err => {
        reject(err)
      })
    })
  },
  [types.VIEW_FILE] ({commit, state}, data) {
    return new Promise((resolve, reject) => {
      instance({
        method: 'post',
        baseURL: state.requestInfo.baseUrl,
        url: state.requestInfo.viewFile,
        data: querystring.stringify(data)
      }).then(fileContentData => {
        if (fileContentData.config) {
          delete fileContentData.config
        }
        if (fileContentData.status === 200) {
          resolve(fileContentData.data)
        } else {
          reject(fileContentData)
        }
      }).catch(err => {
        reject(err)
      })
    })
  }
}
