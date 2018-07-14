//app.js
import WxRequest from '/plugins/wx-request/lib/index.js'
var request = ""

App({
  onLaunch: function () {
    // 展示本地存储能力
   
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.getStorageSync('pincode') || []
    wx.setStorageSync('pincode', this.globalData.pincode)
   
    // wx.request({
    //   url: 'http://d.testimg.com/cms/wx/config.json', //仅为示例，并非真实的接口地址
    //   success: function (res) {
    //     console.log(res.data)
    //   }
    // })
    // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })
    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
  },  
  globalData: {
    userInfo: null,
    timeout: 30000,    // 超时的时间
    host: "https://by.incarcloud.com",    // API的主机地址
    api: "/api/car-center/tianyan/container",    // API 的名称
    call_center_number: "027-88996666",    // 客户中心的地址
    configUrl: "http://img.testimg.com/cms/wx/config.json",    // 配置文件的主机地址
    cdn: "http://img.testimg.com/cms/wx/",    // 配置文件的主机地址
    pincodeflag: "0",     // 0=隐藏PIN code控制，1=开启PIN code 控制
    pincode: "6666"       // pincode 验证的代码
  }
})