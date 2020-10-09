// 使用 axios配置http
import axios from 'axios'
import qs from 'qs';
// 引入vant的轻提示
import { Toast } from 'vant'

// 创建axios实例，全局配置
const instance = axios.create({
  baseURL: 'http://www.pudge.wang:3001', // 请求头
  timeout: 1000  // 请求的时间上限，超过10s，报错
})

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 可以在发送请求前对请求体，进行处理，如添加token
  return config
}, function (error) {
  // 对请求错误的操作
  return Promise.reject(error);
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response.data;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

// 封装 get请求，和 post请求
const http = {
  get(url, params) {
    // 返回一个 Promise
    return new Promise((resolve, reject) => {
      // 使用 axios发起请求
      instance.get(url, {
        params: params // 请求的url
      })
        .then((response) => {
          // 返回成功后的数据
          resolve(response)
          // console.log(response);
        })
        .catch((error) => {
          Toast.fail(error.message);
          reject(error)
        })
    })
  },
  post(url, data) {
    return new Promise((resolve, reject) => {
      instance.post(url, qs.stringify(data))
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          Toast(error.message)
          reject(error);
        });
    })
  }
}

export default http


// import axios from 'axios'
// import qs from 'qs';

// // 引入vant的轻提示
// import { Toast  } from 'vant'

// // const urlPerfix = 'http://www.pudge.wang:3001'

// // 创建axios实例，全局的配置
// const instance = axios.create({
//   baseURL: 'http://www.pudge.wang:3001',
//   timeout: 10000
// });

// // 添加请求拦截器
// instance.interceptors.request.use(function (config) {
//   // 在发送请求之前做些什么
//   // console.log(config.params)
//   // config.params.token = localStorage.getItem('token')
//   if (config.method === 'get') {
//     config.params.token = localStorage.getItem('token')
//   } else if (config.method === 'post') {
//     config.data += '&token=' + localStorage.getItem('token')
//   }
//   console.log(config)
//   return config;
// }, function (error) {
//   // 对请求错误做些什么
//   return Promise.reject(error);
// });

// // 添加响应拦截器
// instance.interceptors.response.use(function (response) {
//   // 对响应数据做点什么
//   return response.data;
// }, function (error) {
//   // 对响应错误做点什么
//   return Promise.reject(error);
// });

// const http = {
//   get (url, params) {
//     return new Promise((resolve, reject) => {
//       instance.get(url, {
//         params: params
//       })
//       .then((response) => {
//         resolve(response);
//       })
//       .catch((error) => {
//         Toast(error.message)
//         reject(error);
//       });
//     })
//   },
//   post (url, data) {
//     return new Promise((resolve, reject) => {
//       instance.post(url, qs.stringify(data))
//       .then((response) => {
//         resolve(response);
//       })
//       .catch((error) => {
//         Toast(error.message)
//         reject(error);
//       });
//     })
//   }
// }

// export default http