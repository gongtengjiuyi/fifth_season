// pages/sortlist/sortlist.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    bookList: [],
    id: null,
    page: 0,
  },
  getlist(id, page = 0) {
    wx.request({
      url: `https://m.taoyuewenhua.com/ajax/book_mall/categories/${id}`,
      data: {
        category_books: id,
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
    wx.showLoading({
      title: "正在加载",
    });
    wx.setNavigationBarTitle({
      title: "分类列表",
    });
    this.setData({
      id: options.categoryId,
    });
    this.getlist(this.data.id, this.data.page);
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
    this.getlist(this.data.id, this.data.page);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
