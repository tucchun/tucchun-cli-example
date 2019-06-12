/**
 * 通用基础函数
 * @author 王刚(Margox Wang) <wanggang@rainbowcn.com>
 * @date 2019-05-08
 */

/**
 * 将指定秒数转换为时分秒字符传
 * @param {number} seconds 需要格式化的秒数
 * @param {string} hourText 小时描述字符
 * @param {string} minuteText 分钟描述字符
 * @param {string} secondText 秒钟描述字符
 * @returns {string} 转换结果
 */
export const formatSeconds = (seconds, hourText = '时', minuteText = '分', secondText = '秒') => {
  let minutes = 0;
  let hours = 0;
  let result = '';

  if (seconds > 60) {
    minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);
    if (minutes > 60) {
      hours = Math.floor(minutes / 60);
      minutes = Math.floor(minutes % 60);
    }
  }

  if (seconds < 10 && seconds > 0) {
    result = `0${seconds}${secondText}`;
  } else {
    result = `${seconds}${secondText}`;
  }

  if (minutes < 10 && minutes > 0) {
    result = `0${minutes}${minuteText}${result}`;
  } else {
    result = `${minutes}${minuteText}${result}`;
  }

  if (hours > 0) {
    result = `${hours}${hourText}${result}`;
  }

  return result;
};

/**
 * 复制指定文字到剪贴板
 * @param {string} text 需要复制的文字
 * @returns {boolean} 返回copy指令是否执行成功
 */
export const copyText = text => {
  // 创建一个临时文本框
  const tempInput = document.createElement('textarea');

  // 设置样式
  tempInput.style.cssText = 'position:absolute;top:0;opacity:0;';

  // 将其添加到页面中
  document.body.appendChild(tempInput);

  // 为文本框设置值，并执行选中
  tempInput.value = text;
  tempInput.select();

  // 执行复制命令并缓存执行结果
  const isCopySuccess = document.execCommand('Copy');

  // 移除文本框
  document.body.removeChild(tempInput);

  // 返回复制结果
  return isCopySuccess;
};

let menuUrlMap = null
/**
 * 转化菜单地址与对象映射
 *
 * @export
 * @param {*} menus
 * @returns
 */
export function parseMenuUrlMap(menus) {
  if (menuUrlMap) {
    return menuUrlMap;
  } else {
    const urlMap = new Map();
    menus.forEach((menuLevelOne, indexLevelOne) => {
      menuLevelOne.children.forEach((menuLevelTwo, indexLevelTwo) => {
        menuLevelTwo.children.forEach((menuLevelThird, indexLevelThird) => {
          urlMap.set(menuLevelThird.url, [indexLevelThird, indexLevelTwo, indexLevelOne]);
        });
      });
    });
    menuUrlMap = urlMap
    return menuUrlMap;
  }
}

export function parseRouteUrlMap (routers) {
    
}
