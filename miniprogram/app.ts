import { CLOUD_ID } from './config/config';
import { SESSION_KEY } from './constants';

App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        env: CLOUD_ID,
        traceUser: true,
      });

      this.IsLogon();
    }
  },

  IsLogon() {
    const userInfo = wx.getStorageSync(SESSION_KEY);

    if (userInfo.name && userInfo.phone) {
        this.globalData.isLogged = true
        this.globalData.userInfo = userInfo
    } else {
        this.globalData.isLogged = false
    }
  },

  globalData: {
    userInfo: null,
    isLogged: false
  }
});
