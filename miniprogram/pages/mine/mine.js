// pages/mine/mine.js
const db = wx.cloud.database({});
import Dialog from '@vant/weapp/dialog/dialog';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    uerInfo: {},
    show: true,
    active: 0,
    openId: "",
    books: [],
  },
  toLoginOut() {
    Dialog.confirm({
        message: '确认退出吗？',
      })
      .then(() => {
        wx.showToast({
          title: "退出成功",
          success: () => {
            wx.clearStorage();
            this.setData({
              openId: "",
              books: [],
              uerInfo: {},
              show: true,
            });
          },
        });
      })
      .catch(() => {
        // on cancel
      });

  },
  toLogin() {
    wx.getUserProfile({
      desc: "用于完善用户资料",
      success: (res) => {
        wx.setStorageSync('userinfo', res.userInfo)
        wx.showToast({
          title: "登录成功",
          icon: "success",
          duration: 2000,
        });
        setTimeout(function () {
          wx.hideToast();
        }, 1000);
        this.setData({
          show: false,
          userInfo: res.userInfo,
        });
        //用户同意后获取openid
        wx.cloud.callFunction({
          name: "getopenId",
          data: {},
          success: (res) => {
            wx.setStorageSync("openid", res.result.openid);
            this.setData({
              openId: res.result.openid,
            });
            // 判断用户是否注册
            db.collection("fifthSeason_user")
              .where({
                _openid: res.result.openid,
              })
              .get()
              .then((res) => {
                if (res.data.length == 0) {
                  db.collection("fifthSeason_user").add({
                    // data 字段表示需新增的 JSON 数据
                    data: {
                      books: [],
                    },
                    success: (res) => {
                      console.log(res);
                    },
                  });
                } else {
                  this.setData({
                    books: res.data[0].books,
                  });
                }
              });
          },
          fail: (err) => {
            console.log(err);
          },
        });
      },
      fail: (err) => {
        wx.showToast({
          title: "您拒绝了请求",
          icon: "error",
          duration: 2000,
        });
        setTimeout(function () {
          wx.hideToast();
        }, 1000);
        console.log(err);
      },
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.getStorageSync("openid")) {
      var usermsg = wx.getStorageSync('userinfo')
      var id = wx.getStorageSync("openid")
        this.setData({
          show:false,
          userInfo:usermsg,
          openId:id
        })
    } else {
      this.setData({
        openId: "",
        books: [],
        uerInfo: {},
        show: true,
      });
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (wx.getStorageSync("openid")) {
      db.collection("fifthSeason_user")
        .where({
          _openid:this.data.openId,
        })
        .get()
        .then((res) => {
          if (res.data.length != 0) {
            this.setData({
              show:false,
              books: res.data[0].books,
            });
          }
        });
    } else {
      this.setData({
        openId: "",
        books: [],
        uerInfo: {},
        show: true,
      });
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});