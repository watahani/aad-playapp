const baseUri = "https://login.microsoftonline.com/"
const endpoints = ['authorize', 'token', 'devicecode', 'userinfo']
const appListStr = localStorage.getItem('appList');
const signInParamStr = localStorage.getItem('signInParams');
let appList = [];
let signInParams = [
  {
    name: "redirect_uri",
    value: window.location.href.split('?')[0]
  },
  {
    name: "response_type",
    value: "code"
  },
  {
    name: "scope",
    value: "openid"
  }
]

if (appListStr) {
  appList = JSON.parse(appListStr);
}

if (signInParamStr) {
  const p = JSON.parse(signInParamStr);
  if (p && p.length > 0) {
    signInParams = JSON.parse(signInParamStr);
  }
}

let params = window.location.search.replace('?', '').split('&');

if (params) {
  params = params.reduce((result, p) => {
    const keyValue = p.split('=')
    let key = keyValue[0];
    let value = decodeURIComponent(keyValue[1]);
    if (key === 'code') {
      result.push({
        name: "grant_type",
        value: "authorization_code"
      })
    }
    result.push({
      name: key,
      value: value
    })
    return result;
  }, [])
}

var app = new Vue({
  el: '#app',
  data: {
    version: 2,
    command: "",
    selected_client_id: appList.length > 0 ? appList[0].client_id : "",
    appList: appList,
    signInParams: signInParams,
    backendParams: params.some(v => v.name === 'code') ? params : [],
  },
  methods: {
    deleteSelectedClient: function () {
      this.appList = this.appList.filter(app => app.client_id !== this.selected_client_id);
      if (this.appList.length === 0) {
        this.appList.push(
          {
            client_id: "",
            client_secret: "",
            tenant_id: "",
          }
        )
      }
      this.selected_client_id = this.appList[0].client_id;
    },
    addEmptyParam: function (sourceName) {
      if (!this[sourceName]) {
        console.log(sourceName + ' is not found. check html or script!');
        return;
      }
      this[sourceName].push({
        name: "",
        value: ""
      })
    },
    deleteParam: function (sourceName, pName) {
      if (!this[sourceName]) {
        console.error(sourceName + ' is not found. check html or script!')
        return;
      }
      this[sourceName] = this[sourceName].filter(p => {
        if (p.name === pName) {
          console.log(`delete ${JSON.stringify(p)}`);
          return false;
        }
        return true;
      });
    },
    showCommand: function () {
      let redirect_uri = this.signInParams.filter(v => v.name === 'redirect_uri')[0].value;
      var params = [
        {    
          name: 'client_id',
          value: this.currentApp.client_id
        },
        {
          name: 'client_secret',
          value: this.currentApp.client_secret
        },
        {
          name: 'redirect_uri',
          value: redirect_uri
        } 
      ];

      params = this.backendParams.reduce((result, p) => {
        if (p.name && p.value) {
        result.push({
          name: p.name, 
          value: p.value});
        }
        return result;
      }, params)


      params = params.reduce((result, p) => {
        console.log(p.name, p.value);
        result.append(p.name, p.value);
        return result;
      },new URLSearchParams());

      let command = "$tokenResp = Invoke-WebRequest -Method POST "
      command += " -ContentType 'application/x-www-form-urlencoded' ";
      command += " -body '" + params.toString() + "' ";
      command += this.endPoints.token;
      command += "$body = ConvertFrom-Json $tokenResp.Content";

      this.command = command;
    }
  },
  computed: {
    signInUrl: function () {
      localStorage.setItem('appList', JSON.stringify(this.appList));
      localStorage.setItem('signInParams', JSON.stringify(this.signInParams));
      const currentApp = this.currentApp
      let params = [`client_id=${currentApp.client_id}`]
      params = this.signInParams.reduce((result, p) => {
        if (p.name && p.value) {
          var key = encodeURIComponent(p.name);
          var value = encodeURIComponent(p.value);
          result.push(`${key}=${value}`);
        }
        return result;
      }, params);
      const uri = this.endPoints.authorize + '?' + params.join('&');
      return uri;
    },
    endPoints: function () {
      var b = baseUri;
      if (this.currentApp.tenant_id) {
        b += this.currentApp.tenant_id;
      } else {
        b += 'common';
      }
      b += '/';
      b += 'oauth2/'
      if (this.version === 2) {
        b += 'v2.0/';
      }
      return endpoints.reduce((result, ep) => {
        result[ep] = b + ep;
        return result;
      }, {});
    },
    currentApp: function () {
      const apps = this.appList.filter((app) => app.client_id === this.selected_client_id);

      if (apps && apps.length > 0) {
        return apps[0];
      } else {
        this.appList = this.appList.filter(a => a.client_id !== "");
        const app = {
          client_id: "",
          client_secret: "",
        }
        this.appList.push(app);
        return app;
      }
    }
  }
})
