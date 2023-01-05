/*
 * @Author: zfz
 * @Date: 2021-11-23 10:27:02
 * @LastEditors: zfz
 * @LastEditTime: 2021-11-23 13:56:04
 * @Description: update
 */
const fs = require('fs')
const common = {
    // 文件转为blob格式
    readFile(path, ecoding) {
        return new Promise((resolve, rejects) => {
            let newEcoding = ecoding ? ecoding : null
            fs.readFile(path, newEcoding, function (err, data) {
                resolve(data)
                rejects(err)
            })
        })
    },
    // 获取ip
    getIP() {
        var os = require('os'),
            iptable = '',
            ifaces = os.networkInterfaces();
        for (var dev in ifaces) {
            ifaces[dev].forEach(function (details, alias) {
                let { family, address, internal } = details
                if (family == 'IPv4' && !internal && address != '127.0.0.1') {
                    iptable = details.address;
                }
            });
        }
        return iptable
    },
    // 创建id
    createId() {
        return (new Date()).getTime() + '' + (Math.random() + '').slice(2)
    }
} 
module.exports = common