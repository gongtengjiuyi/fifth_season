// pages/menu/menu.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    chapterlist: {},
    page: 0,
    sourceId: "",
    chapterId: "",
  },
  addpages() {
    this.setData({
      page: this.data.page + 1,
    });
    this.getchapterspage(this.data.page);
  },
  minipages() {
    this.setData({
      page: this.data.page - 1,
    });
    this.getchapterspage(this.data.page);
  },
  getchapterspage(page = 0) {
    wx.request({
      url: "https://m.taoyuewenhua.com/ajax/chapters",
      data: {
        sourceName: "tf",
        sourceId: this.data.sourceId,
        chapterId: this.data.chapterId,
        page,
      },
      success: (res) => {
        console.log(res);
        this.setData({
          chapterlist: { ...res.data.data },
        });
        wx.setNavigationBarTitle({
          title: res.data.data.bookTitle,
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
    wx.request({
      url: "https://m.taoyuewenhua.com/ajax/chapters",
      data: {
        sourceName: "tf",
        sourceId: options.sourceId,
        chapterId: options.chapterId,
      },
      success: (res) => {
        console.log(res);
        this.setData({
          chapterlist: { ...res.data.data },
          sourceId: options.sourceId,
          chapterId: options.chapterId,
        });
        wx.setNavigationBarTitle({
          title: res.data.data.bookTitle,
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
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
