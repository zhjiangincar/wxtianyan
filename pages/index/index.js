//index.js
import WxRequest from '../../plugins/wx-request/lib/index'
import WxValidate from '../../plugins/wx-validate/WxValidate';
var requests = require('../../requests/request.js');
var utils = require('../../utils/util.js');
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    containerSn:'',
    deviceNum:'',
    pincodeflag: app.globalData.pincodeflag,
    loading:true,
    pincode: wx.getStorageSync('pincode') || []
  },
  initValidate() {
    // 验证字段的规则
    const rules = {
      containerSn: {
        required: true,
      },
      deviceNum: {
        required: true,
      }     
    }
    // 验证字段的提示信息，若不传则调用默认的信息
    const messages = {
      containerSn: {
        required: '天眼设备编号不能为空，请扫描条形码'
      },
      deviceNum: {
        required: '集装箱编号不能为空'
      }      
    }
    // 创建实例对象
    this.WxValidate = new WxValidate(rules, messages)
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (options) {
    this.initValidate()
    // console.log(options)
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse){
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
   
  },
  // getUserInfo: function(e) {
  //   console.log(e)
  //   app.globalData.userInfo = e.detail.userInfo
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // },
   formSubmit: function (e) {
     const that = this;
     // 传入表单数据，调用验证方法
     if (!that.WxValidate.checkForm(e)) {
       const error = that.WxValidate.errorList[0]
       wx.showModal({
         content: error.msg,
         showCancel: false,
       })
       return false
     }
     if (that.data.pincodeflag == 1) {
       if (e.detail.value.pincode == ''){
         wx.showModal({
           content: '授期权不可为空',
           showCancel: false,
         })
         return false
       }else if (e.detail.value.pincode !== app.globalData.pincode) {
         wx.showModal({
           content: '授期权码不正确',
           showCancel: false,
         })
         return false
       }
     } 
     wx.showLoading({
       title: '数据提交中',
     }) 
     setTimeout(function(){
       wx.hideLoading();  //隐藏提示框 
       wx.showToast({
         title: '天眼绑定成功',
         icon: 'success',
         duration: 2000
       })
       that.setData({
          containerSn:'',
          deviceNum: ''
        })
     },2000)
    //  const params = { containerSn: e.detail.value.containerSn, deviceNum: e.detail.value.deviceNum };
    //  requests.container(params, (res) => {
    //    wx.hideLoading();  //隐藏提示框  
    //    console.log(res)
    //    wx.showToast({
    //      title: '提交成功',
    //      icon: 'success',
    //      duration: 2000
    //    })
    //  }, (error) => {

    //  }, (res) => {
    //    wx.hideLoading();  //隐藏提示框  
    //  });
     
  },
   saoma: function () {
    var that = this;
    wx.scanCode({
      success: (res) => {
        that.setData({
          containerSn: res.result
        })
      },
      fail: (res) => {
        wx.showToast({
          title: '扫描条码失败',
          icon: 'none',
          duration: 2000
        })
      },
      complete: (res) => {
      } 
    })
  },
   phonecallevent(){
    wx.makePhoneCall({
      phoneNumber: app.globalData.call_center_number, //此号码并非真实电话号码，仅用于测试  
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })  
  }
})
