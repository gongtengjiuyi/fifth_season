// pages/newbooks/newbooks.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    bookList: [],
    page: 0,
  },
  getlist(page = 0) {
    wx.showLoading({
      title: "正在加载",
    });
    wx.request({
      url: "https://m.taoyuewenhua.com/ajax/book_mall/new_books",
      data: {
        ctype: 2,
        page,
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: "潜力新书",
    });
    this.getlist();
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
    this.getlist(this.data.page);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
