// pages/more/more.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    bookList: [],
    ctype: "",
    mcid: "",
    page: 0,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: "加载中",
    });
    wx.request({
      url: "https://m.taoyuewenhua.com/ajax/channel_books",
      data: {
        ctype: options.ctype,
        mcid: options.mcid,
        //   seed:options.seed,
        page: 0,
        pageSize: 10,
      },
      success: (res) => {
        wx.hideLoading();
        this.setData({
          bookList: [...res.data.data.bookList],
          ctype: options.ctype,
          mcid: options.mcid,
        });
        wx.setNavigationBarTitle({
          title: options.title,
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
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      page: this.data.page + 1,
    });
    wx.showLoading({
      title: "加载中",
      mask: true,
    });
    wx.request({
      url: "https://m.taoyuewenhua.com/ajax/channel_books",
      data: {
        ctype: this.data.ctype,
        mcid: this.data.mcid,
        page: this.data.page,
        pageSize: 10,
      },
      success: (res) => {
        wx.hideLoading();
        this.setData({
          bookList: this.data.bookList.concat([...res.data.data.bookList]),
        });
      },
      fail: (err) => {
        console.log(err);
      },
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
