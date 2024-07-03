import { Message } from "element-ui"
// 公共方法

// 时间格式化
//flag为true就是需要转换成yyyy-MM-dd的格式，为false就是yyyy-MM
// str为时间
//time如果有传就是转为该日期的时间为几点
export function dateformat(str, flag, time) {
    const date = new Date(str)
    if (date == 'Invalid Date') {
        return ''
    }
    if (time) {
        const hour = ("0" + date.getHours()).slice(-2)
        const minute = ("0" + date.getMinutes()).slice(-2)
        const second = ("0" + date.getSeconds()).slice(-2)
        return `${hour}:${minute}:${second}`
    }
    const year = date.getFullYear()
    const month = ("0" + (date.getMonth() + 1)).slice(-2) // 月份需要加1，且保证两位数
    const day = ("0" + date.getDate()).slice(-2)
    //flag为true就是需要转换成yyyy-MM-dd的格式，为false就是yyyy-MM
    const result = flag ? `${year}-${month}-${day}` : `${year}-${month}`
    return result
}

// 深拷贝
export function copyProperties(source, target) {
    for (let key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
            if (Object.prototype.hasOwnProperty.call(target, key)) {
                target[key] = source[key]
            }
        }
    }
}

//判断请求是否成功
export function ifSuccess(response) {
    if (response == undefined) {
        return null;
    }
    const data = response.data
    if (data.retCode != 200) {
        Message.warning(data.message)
        return null;
    }
    if (data instanceof Object) {
        return data
    }
    return null;
}
