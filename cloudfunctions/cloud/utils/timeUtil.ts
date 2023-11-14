import { isNil } from "./common";

/**
 * 获取当前UTC时间戳
 */
function getCurrentUTCTimestamp(): number {
  const date = new Date();
  const offset = date.getTimezoneOffset() * 60 * 1000;
  const utcTime = new Date(date.getTime() + offset);

  return utcTime.getTime();
}

/**
 * 毫秒时间戳格式化
 * @param {*} timestamp  时间戳-毫秒级
 * @param {*} format  Y-M-D h:m:s:i  【i 表示毫秒】
 */
function formatTime(timestamp: number, format: string): string {
	const formateArr = ['Y', 'M', 'D', 'h', 'm', 's', 'i'];
  const date = new Date(timestamp);
  const getStr = (num: number): string => {
    return String(num)[1] ? String(num) : `0${num}`;
  }
  const timeArr: string[] = [
    getStr(date.getUTCFullYear()),
    getStr(date.getUTCMonth() + 1),
    getStr(date.getUTCDate()),
    getStr(date.getUTCHours()),
    getStr(date.getUTCMinutes()),
    getStr(date.getUTCSeconds()),
    getStr(date.getUTCMilliseconds())
  ];

  timeArr.forEach((item: string, index: number) => {
    format = format.replace(formateArr[index], item);
  });

	return format;
}

/**
 *  获取格式化后的当前UTC时间戳
 * @param {string} 时间格式 Y-M-D h:m:s
 */
export function getFormatUTCTimestamp(format?: string): string {
  const currentTime = getCurrentUTCTimestamp();
	return !isNil(format)
    ? formatTime(currentTime, format!)
    : String(currentTime);
}
