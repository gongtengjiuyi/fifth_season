// pages/novel/novel.js
const db = wx.cloud.database()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    content: "",
    sourceId: "",
    chapterId: "",
  },
  //下一章
  next(event) {
    if (event.currentTarget.dataset.nextchapterid == undefined) {
      wx.showToast({
        title: "已经是最后一页了",
        icon: "none",
      });

      setTimeout(function () {
        wx.hideToast();
      }, 1000);
    } else {
      this.getnovel(event.currentTarget.dataset.nextchapterid);
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 300,
      });
    }
  },
  //上一张
  prev(event) {
    if (event.currentTarget.dataset.prevchapterid == undefined) {
      wx.showToast({
        title: "已经是第一页了",
        icon: "none",
      });

      setTimeout(function () {
        wx.hideToast();
      }, 1000);
    } else {
      this.getnovel(event.currentTarget.dataset.prevchapterid);
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 300,
      });
    }
  },
  getnovel(ChapterId) {
    wx.showLoading({
      title: "加载中",
    });
    wx.request({
      url: "https://m.taoyuewenhua.com/ajax/chapter_content",
      data: {
        sourceName: "tf",
        sourceId: this.data.sourceId,
        chapterId: ChapterId,
      },
      success: (res) => {
        wx.hideLoading();
        this.setData({
          content: res.data.data,
          chapterId:ChapterId,
        });
      },
      fail: (err) => {
        console.log(err);
      },
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.chapterId) {
      wx.request({
        url: "https://m.taoyuewenhua.com/ajax/chapter_content",
        data: {
          sourceName: "tf",
          sourceId: options.sourceId,
          chapterId: options.chapterId,
        },
        success: (res) => {
          this.setData({
            content: res.data.data,
            sourceId: options.sourceId,
            chapterId: options.chapterId,
          });
          wx.setNavigationBarTitle({
            title: options.title,
          });
        },
        fail: (err) => {
          console.log(err);
        },
      });
    } else {
      wx.request({
        url: "https://m.taoyuewenhua.com/ajax/chapter_content",
        data: {
          sourceName: "tf",
          sourceId: options.sourceId,
        },
        success: (res) => {
          this.setData({
            content: res.data.data,
            sourceId: options.sourceId,
          });
          wx.setNavigationBarTitle({
            title: options.title,
          });
        },
        fail: (err) => {
          console.log(err);
        },
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
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    //如果为登录状态
    if (wx.getStorageSync("openid")) {
      const _ = db.command;
      db.collection("fifthSeason_user")
        .where({
          _openid: wx.getStorageSync("openid"),
        })
        .get({
          success: (res) => {
            var q = res.data[0].books.some((item) => {
              return item.sourceId == this.data.sourceId
            })
            //如果加入书架，退出把chapterId存入数据库
            if(q){
              db.collection("fifthSeason_user")
              .where({
                _openid: wx.getStorageSync("openid"),
                books:{'sourceId':this.data.sourceId}
              })
              .update({
                data:{
                  'books.$.chapterId':this.data.chapterId
                }
              })
            }
          },
        });
    }
  },

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
