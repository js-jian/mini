
 // 云函数请求(异步)
 function callCloud(route, params = {}, options) {
  return new Promise(function (resolve, reject) {
    wx.cloud.callFunction({
      name: 'cloud',
      data: {
        route: route,
        // token,
        // PID,
        // params
      },
      success: function (res) {
        resolve(res.result);
      },
      fail: function (err) {
        reject(err);
      },
      complete: function (res) {
        console.log(res)
      }
    });
  });
}

async function login(params, options) {
  return callCloud("SIGN_UP", params, options)
}



module.exports = {
  login,
}