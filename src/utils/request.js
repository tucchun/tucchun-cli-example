/**
 * 基础AJAX请求函数
 * @author 王刚(Margox Wang) <wanggang@rainbowcn.com>
 * @date 2019-05-08
 */

import qs from 'query-string';

// 默认的响应数据解析器
const defaultResponseParser = responseText => {
  let responseData = null;

  try {
    responseData = JSON.parse(responseText);
  } catch (e) {
    throw new Error({
      code: -1,
      message: '无法解析接口返回结果',
    });
  }

  if (responseData && responseData.code === 200) {
    return responseData.data;
  }

  responseData = responseData || {
    code: -2,
    message: '接口返回数据无效',
  };

  throw responseData;
};

/**
 * 发起一个AJAX请求
 * @param {IRequestParameters} param 请求参数
 * @returns {Promise} 返回一个Promise实例
 */
const request = async param => {
  let { url, data, headers, timeout, method, responseParser } = param;

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    // 参数和默认参数处理
    method = method || request.defaultParameters.method;
    timeout = timeout || request.defaultParameters.timeout;
    responseParser = responseParser || request.defaultParameters.responseParser;
    data = { ...request.defaultParameters.data, ...data };
    headers = { ...request.defaultParameters.headers, ...headers };

    // get请求需要重新处理data和url
    if (method === 'GET') {
      url = `${url}?${qs.stringify(data)}`;
      data = null;
    }

    // 开启请求连接
    xhr.open(method, url, true);
    xhr.timeout = timeout;

    // 设置请求头
    Object.keys(headers).forEach(name => {
      xhr.setRequestHeader(name, headers[name]);
    });

    // 监听请求状态变更
    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          try {
            resolve(responseParser(xhr.responseText));
          } catch (error) {
            reject(error);
          }
        } else {
          reject(new Error({
            code: xhr.status,
            message: '接口请求失败',
          }));
        }
      }
    };

    // 监听接口请求超时
    xhr.ontimeout = () => {
      reject(new Error({
        code: 408,
        message: '接口请求超时',
      }));
    };

    // 发送请求
    xhr.send(data);
  });
};

// 默认的请求参数，可通过request.setDefaultParameters来进行更改
request.defaultParameters = {
  method: 'GET',
  timeout: 5000,
  data: {},
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
  responseParser: defaultResponseParser,
};

/**
 * 设置默认请求参数，这个影响是全局的，会对之后发起的所有请求生效
 * @params {object} parameters
 */
request.setDefaultParameters = (parameters = {}) => {
  request.defaultParameters = {
    ...request.defaultParameters,
    ...parameters,
  };
};

/**
 * get和post请求的简化用法
 */
request.get = (url, data) => request({ url, data, method: 'GET' });
request.post = (url, data) => request({ url, data, method: 'POST' });

export default request;
