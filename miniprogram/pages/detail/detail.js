// pages/detail/detail.js
const db = wx.cloud.database({});
Page({
  /**
   * 页面的初始数据
   */
  data: {
    bookinfo: {},
    commentList: [],
    show: false,
    sourceId: "",
    //判断是否加入书架
    addbook: false,
  },
  //添加到书架
  add() {
    if (wx.getStorageSync("openid")) {
      const _ = db.command;
      db.collection("fifthSeason_user")
        .where({
          _openid: wx.getStorageSync("openid"),
        })
        .update({
          // data 字段表示需新增的 JSON 数据
          data: {
            books: _.push({
              cover: this.data.bookinfo.coverUrl,
              sourceId: this.data.sourceId,
              title: this.data.bookinfo.title,
              chapterId: wx.getStorageSync("chapterId"),
            }),
          },
          success: (res) => {
            this.setData({
              addbook: true,
            });
            wx.showToast({
              title: "成功加入书架",
              icon: "success",
              duration: 2000,
            });
            setTimeout(function () {
              wx.hideToast();
            }, 1000);
          },
        });
    } else {
      wx.showToast({
        title: "请先登录",
        icon: "none",
      });
    }
  },
  //移除书架
  remove() {
    if (wx.getStorageSync("openid")) {
      const _ = db.command;
      db.collection("fifthSeason_user")
        .where({
          _openid: wx.getStorageSync("openid"),
        })
        .update({
          // data 字段表示需新增的 JSON 数据
          data: {
            books: _.pull({
              cover: this.data.bookinfo.coverUrl,
              sourceId: this.data.sourceId,
              title: this.data.bookinfo.title,
              chapterId: wx.getStorageSync("chapterId"),
            }),
          },
          success: (res) => {
            this.setData({
              addbook: false,
            });
            wx.showToast({
              title: "移除成功",
              icon: "success",
              duration: 2000,
            });
            setTimeout(function () {
              wx.hideToast();
            }, 1000);
          },
        });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: "加载中",
      mask: true,
    });
    wx.request({
      url: "https://m.taoyuewenhua.com/ajax/book",
      data: {
        sourceName: "tf",
        sourceId: options.sourceId,
      },
      success: (res) => {
        wx.hideLoading();
        this.setData({
          bookinfo: {
            ...res.data.data
          },
          show: true,
          sourceId: options.sourceId,
        });
        wx.setNavigationBarTitle({
          title: "书籍详情",
        });
      },
      fail: (err) => {
        console.log(err);
      },
    });
    wx.request({
      url: "https://m.taoyuewenhua.com/ajax/top_comments",
      data: {
        sourceName: "tf",
        sourceId: options.sourceId,
      },
      success: (res) => {
        this.setData({
          commentList: [...res.data.data],
        });
      },
      fail: (err) => {
        console.log(err);
      },
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
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
            this.setData({
              addbook: q
            })
          },
        });
    }
  },

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