export function loadSeedJs() {
  const el = document.createElement('script');
  el.type = 'text/javascript';
  el.src = 'https://s1.meituan.net/mxx/yoda/yoda.seed.js?t=' + Date.now();
  document.head.appendChild(el);
}


export const YODA_DOMAIN = {
  staging: "https://verify.inf.st.meituan.com",
  test: "https://verify.inf.test.meituan.com",
};

export function request(uri, method, options, headers, callback) {
  let xhr = new XMLHttpRequest();
  xhr.open(method, uri, true);
  if (headers) {
      for (let key in headers) {
          xhr.setRequestHeader(key, headers[key]);
      }
  }
  xhr.onload = function () {
      if (xhr.readyState === 4) {
          if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
              let res = JSON.parse(xhr.responseText);
              callback(res.data.request_code);
          }
      }
  };
  xhr.send(options);
}

export function getRequestCode(riskLevel, env, callback) {
  let params = [
      "uuid=test",
      "ip=211.69.194.143",
      "platform=1",
      "partner=2",
      "ua=" + window.navigator.userAgent.toString(),
      "app=11",
      "version=9.0.4",
      "needInput=true",
      "isVoiceAndSMSBanded=true",
      "mtsiDomain=www.dianping.com",
      "switchText=true",
      "walletId=12000012609621",
      "moduleEnable=true",
      "accountSystem=1",
      "autoSend=false",
      "succCallbackUrl=",
      "user=55066031",
      "mobile=18632682763",
      "riskLevel=" + riskLevel,
  ];
  params = params.join("&");
  let uri = YODA_DOMAIN[env] + "/v2/api/merchantlogin/authorize";
  let headers = { "Content-Type": "application/x-www-form-urlencoded" };
  request(uri, "post", params, headers, function (code) {
      console.log(code, "拿到了最新版的 requestCode");
      callback(code);
  });
}