// pages/weather/weather.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    city: '广州',
    citys:'广州',
    val:"",
    datapack: "晴天",
    code: 102,
    txt: '东南风',
    tmp: 28,
    fl: 18,
    hourlys: [],
    dailys:[]
  },
  synchroValue(e){
    
    this.setData({
      val:e.detail.value
    });
    console.log(this.data.val);
  },
  check(){
    if(this.data.val == ""){
      return;
    }
    var city = this.data.val
    this.setData({
      city: city
    });
    console.log("sss");
    var that = this;
    wx.request({
      url: 'https://api.heweather.net/s6/weather/now',
      method: 'GET',
      data: {
        location: this.data.city,
        key: '7625f4f1b74e4fbe8f1d5f679db16efb'
      },
      success: function (res) {
        that.setData({
          citys: res.data.HeWeather6[0].basic.location,
          datapack: res.data.HeWeather6[0].now.cond_txt,
          code: res.data.HeWeather6[0].now.cond_code,
          txt: res.data.HeWeather6[0].now.wind_dir,
          tmp: res.data.HeWeather6[0].now.tmp,
          fl: res.data.HeWeather6[0].now.fl
        });
      }
    });
    wx.request({
      url: 'https://api.heweather.net/s6/weather/hourly',
      method: 'GET',
      data: {
        location: this.data.city,
        key: '7625f4f1b74e4fbe8f1d5f679db16efb'
      },
      success: function (res) {
        var hourly = res.data.HeWeather6[0].hourly;
        var hourlys = [];
        for (var i = 0; i < hourly.length; i++) {
          var str = hourly[i].time;
          hourlys.push({
            time: str.slice(-5, -3),
            code: hourly[i].cond_code,
            txt: hourly[i].cond_txt
          });
        }
        that.setData({
          hourlys: hourlys
        })
      },
      fail: function (err) { console.log(err) },
      complete: function () { }
    });
    wx.request({
      url: 'https://api.heweather.net/s6/weather/forecast',
      method: 'GET',
      data: {
        location: this.data.city,
        key: '7625f4f1b74e4fbe8f1d5f679db16efb'
      },
      success: function (res) {
        console.log(res);
        var daily = res.data.HeWeather6[0].daily_forecast;
        var dailys = [];
        for (var i = 0; i < daily.length; i++) {
          var str = daily[i].date;
          dailys.push({
            date: str.slice(-5),
            code: daily[i].cond_code_d,
            txt1: daily[i].cond_txt_d,
            txt2: daily[i].cond_txt_n,
            tmp1: daily[i].tmp_max,
            tmp2: daily[i].tmp_min,
          });
        }
        that.setData({
          dailys: dailys
        })
      },
      fail: function (err) { console.log(err) },
      complete: function () { }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.request({
      url: 'https://api.heweather.net/s6/weather/now',
      method: 'GET',
      data: {
        location: this.data.city,
        key: '7625f4f1b74e4fbe8f1d5f679db16efb'
      }, 
      success: function (res) {
        that.setData({
          citys: res.data.HeWeather6[0].basic.location,
          datapack: res.data.HeWeather6[0].now.cond_txt,
          code: res.data.HeWeather6[0].now.cond_code,
          txt: res.data.HeWeather6[0].now.wind_dir,
          tmp: res.data.HeWeather6[0].now.tmp,
          fl: res.data.HeWeather6[0].now.fl
        });
      }
    });
    wx.request({
      url: 'https://api.heweather.net/s6/weather/hourly',
      method: 'GET',
      data: {
        location: this.data.city,
        key: '7625f4f1b74e4fbe8f1d5f679db16efb'
      },
      success: function(res) {
        var hourly = res.data.HeWeather6[0].hourly;
        var hourlys = [];
        for (var i = 0; i < hourly.length; i++) {
          var str = hourly[i].time;
          hourlys.push({
            time: str.slice(-5, -3),
            code: hourly[i].cond_code,
            txt: hourly[i].cond_txt
          });
        }
        that.setData({
          hourlys: hourlys
        })
      }
    });
    wx.request({
      url: 'https://api.heweather.net/s6/weather/forecast',
      method: 'GET',
      data: {
        location: this.data.city,
        key: '7625f4f1b74e4fbe8f1d5f679db16efb'
      },
      success: function(res) {
        var daily = res.data.HeWeather6[0].daily_forecast;
        var dailys = [];
        for (var i = 0; i < daily.length; i++) {
          var str = daily[i].date;
          dailys.push({
            date: str.slice(-5),
            code: daily[i].cond_code_d,
            txt1: daily[i].cond_txt_d,
            txt2: daily[i].cond_txt_n,
            tmp1: daily[i].tmp_max,
            tmp2: daily[i].tmp_min,
          });
        }
        that.setData({
          dailys: dailys
        })
      },
      fail: function (err) {console.log(err) },
      complete: function () { }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
      
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
      
  }

})