/**
 * 深复制对象
 * @template T
 * @param {T} object
 * @param {boolean} [check]
 * @returns {T}
 */
export function clone<T>(data: T, check?: boolean): T;

/**
 * 生成异步延迟函数
 * @export
 * @param {number} [time]
 * @returns {Promise<void>} 
 */
export function delay(time?: number): Promise<void>;

/**
 * 生成一个一次性的事件
 * @export
 * @param {(HTMLElement | Worker)} el
 * @param {string} type
 * @returns {Promise<Event>}
 */
export function onceEvent(el: Worker, type: 'message'): Promise<MessageEvent>
export function onceEvent(el: HTMLElement, type: string): Promise<Event>;

/**
 * 生成随机字符串
 * @export
 * @param {number} [len=16] 字符串长度
 * @returns {string}
 */
export function randomString(len?: number): string;

/**
 * 从链接中获取参数值
 * @param {string} name 参数名称
 * @return {string}
 */
export function getQueryByName(name: string): string;
