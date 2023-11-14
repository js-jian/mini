 function callCloud(route: string, params: any = {}) {
  return new Promise(function (resolve, reject) {
    wx.cloud.callFunction({
      name: "cloud",
      data: {
        route,
        params
      },
      success: function (res) {
        console.log("callFunction-success", res)
        resolve(res.result);
      },
      fail: function (err) {
        console.log("callFunction-fail", err)
        reject(err);
      },
      complete: function () {
      }
    });
  });
}

async function signUp(data: any) {
  return callCloud("USER_SIGN_UP", data)
}

async function updateUserInfo(data: any) {
  return callCloud("USER_UPDATE_INFO", data)
}

export default {
  signUp,
  updateUserInfo,
}