import Api from "../../helper/cloudHelper";

Page({
  data: {
  },
  toLogin() {
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },
  editUserInfo() {
    Api.updateUserInfo({
      phone: 123456789221,
      username: "555",
      _id: "a7ec2ba46565f83b001a7a8b04485842"
    }).then((res: any) => {
      console.log('updateUserInfo-res', res)
    });
  }
});
