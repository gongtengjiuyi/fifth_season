// pages/sort/sort.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    freeTypeList: [],
    list: [],
    activeKey: 0,
  },
  onChange(event) {
    this.setData({
      list: [...this.data.freeTypeList[event.detail].categoryList],
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: "分类",
    });
    wx.showLoading({
      title: "正在加载",
    });
    wx.request({
      url: "https://m.taoyuewenhua.com/ajax/book_mall/categories",
      success: (res) => {
        wx.hideLoading();
        this.setData({
          freeTypeList: [...res.data.data.freeTypeList],
          list: [...res.data.data.freeTypeList[0].categoryList],
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
