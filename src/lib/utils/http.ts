/**
 * 从链接中获取参数值
 * @param {string} name 参数名称
 * @return {string}
 */
export function getQueryByName(name: string) {
    const param = name.replace(/[[\]]/g, '\\$&');
    const regex = new RegExp(`[?&]${param}(=([^&#]*)|&|#|$)`);
    const results = regex.exec(window.location.href);

    if (!results || !results[2]) {
        return null;
    }

    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

/**
 * ajax get 方法
 * @param {string} url htto 资源路径
 */
export function get<T = any>(url: string): Promise<T> {
    return new Promise<T>((resolve, reject) => {
        const oAjax = new XMLHttpRequest();
        oAjax.open('GET', url, true);
        oAjax.send();
        oAjax.onreadystatechange = () => {
            if (oAjax.readyState === 4) {
                if (oAjax.status === 200) {
                    resolve(JSON.parse(oAjax.responseText));
                }
                else {
                    reject(oAjax);
                }
            }
        };
    });
}

/**
 * 下载文件
 * @param {string} name 下载的文件名字
 * @param {Blob} content 文件数据
 */
export function download(name: string, content: Blob) {
    const element = document.createElement('a');
    const url = URL.createObjectURL(content);

    element.href = url;
    element.download = name;
    element.click();

    URL.revokeObjectURL(url);
}
