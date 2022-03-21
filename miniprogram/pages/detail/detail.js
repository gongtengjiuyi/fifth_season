// pages/detail/detail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        bookinfo:{},
        intro:'',
        commentList:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      wx.showLoading({
        title:"加载中",
        mask:true
      })
        wx.request({
          url: 'https://m.taoyuewenhua.com/ajax/book',
          data:{
            sourceName:"tf",
            sourceId:options.sourceId
          },
          success:(res)=>{
            wx.hideLoading()
            var reg=/\s/g
              console.log(res.data.data)
              this.setData({
               bookinfo:{...res.data.data},
               intro:(res.data.data.intro).replace(reg,"")
              });
              wx.setNavigationBarTitle({
                title: "书籍详情",
            })
          },
          fail:(err)=>{
              console.log(err)
          }
        })
        wx.request({
          url: 'https://m.taoyuewenhua.com/ajax/top_comments',
          data:{
            sourceName:"tf",
            sourceId:options.sourceId
          },
          success:(res)=>{
              console.log(res.data.data)
              this.setData({
                  commentList:[...res.data.data]
              });
          },
          fail:(err)=>{
              console.log(err)
          }
        })

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})