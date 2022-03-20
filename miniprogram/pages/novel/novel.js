// pages/novel/novel.js
import Toast from "@vant/weapp/toast/toast";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    content: "",
    sourceId: "",
  },
  next(event) {
    Toast.success('成功文案');
    this.getnovel(event.currentTarget.dataset.nextchapterid);
  },
  prev(event) {
    this.getnovel(event.currentTarget.dataset.prevchapterid);
  },
  getnovel(nextChapterId) {
    wx.request({
      url: "https://m.taoyuewenhua.com/ajax/chapter_content",
      data: {
        sourceName: "tf",
        sourceId: this.data.sourceId,
        chapterId: nextChapterId,
      },
      success: (res) => {
        this.setData({
          content: res.data.data,
        });
        console.log(res);
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
    console.log(options);
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
        console.log(res);
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
