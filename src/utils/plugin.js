/**
 * 配置一些公用的方法
 */

exports.install = (Vue, options) => {
    // 用户权限过滤器
    Vue.filter('authStatus', value => {
        let _val = ''
        switch (Number(value)) {
            case 0:
                _val = '管理员'
                break
            case 1:
                _val = '督导员'
                break
            case 2:
                _val = '秘书'
                break
            case 3:
                _val = '其他'
                break
            default:
                _val = '其他'
        }
        return _val
    })
    // 性别过滤器
    Vue.filter('setsex', value => {
        let _val = ''
        switch (value) {
            case '0':
                _val = '未知'
                break;
            case 1:
                _val = '男'
                break;
            case 2:
                _val = '女'
                break;
            default:
                _val = '未知'
        }
        return _val
    })
    // 保留两位小数过滤器
    Vue.filter('toFixed', value => {
        if(value === -Infinity) {
            return 0
        }
        return value.toFixed(2)
    })
    // 转字符串
    Vue.filter('toString', value => value.toString())

    // 添加常用的实例方法
    Vue.prototype.com = (() => {
        /**
         * 跳转Url
         * @param {String} url 跳转地址
         * @param {String} target 跳转类型
         * @return {Boolen}
         */
        const openUrl = (url, target) => {
            if(target) {
                window.location.href = url
            } else {
                window.open(url)
            }
            return true
        }
        /**
         * 获取当前时间
         * @param {String} format 时间格式
         * @return {String}
         */
        const getNowTime = format => {
            let d = new Date(),
                year = d.getFullYear(),
                month = d.getMonth() + 1,
                date = d.getDate(),
                hours = d.getHours(),
                minutes = d.getMinutes(),
                seconds = d.getSeconds()
            if(format !== 'yyyy-mm-dd hh-mm-ss'){
                return `${year}-${month}-${date}`
            }
            return `${year}-${month}-${date}-${hours}-${minutes}-${seconds}`
        }
        /**
         * 返回表格禁用行样式
         * @param  {Object} row   表格行数据
         * @param  {Number} index 表格行标
         * @return {String}
         */
        const tableRowDisabled = (row, index) => {
            if(row.status === 0) {
                return 'row-disabled'
            }
        }
        return {
            openUrl: openUrl,
            getNowTime: getNowTime,
            tableRowDisabled: tableRowDisabled
        }
     })()
}
