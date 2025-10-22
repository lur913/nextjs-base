
/**
 * 休眠函数
 * @param ms 休眠的毫秒数
 * @returns Promise
 */
export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));