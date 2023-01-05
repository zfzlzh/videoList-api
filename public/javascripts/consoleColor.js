/*
 * @Author: zfz
 * @Date: 2021-11-22 14:31:10
 * @LastEditors: zfz
 * @LastEditTime: 2021-11-22 14:36:53
 * @Description: update
 */
/**
 * console.log颜色样式改变
 * 传参：msg  type(colorKey中配置)
 */
const color = {
    'bold': ['\x1B[1m', '\x1B[22m'],
    'italic': ['\x1B[3m', '\x1B[23m'],
    'underline': ['\x1B[4m', '\x1B[24m'],
    'inverse': ['\x1B[7m', '\x1B[27m'],
    'strikethrough': ['\x1B[9m', '\x1B[29m'],
    'white': ['\x1B[37m', '\x1B[39m'],
    'grey': ['\x1B[90m', '\x1B[39m'],
    'black': ['\x1B[30m', '\x1B[39m'],
    'blue': ['\x1B[34m', '\x1B[39m'],
    'cyan': ['\x1B[36m', '\x1B[39m'],
    'green': ['\x1B[32m', '\x1B[39m'],
    'magenta': ['\x1B[35m', '\x1B[39m'],
    'red': ['\x1B[31m', '\x1B[39m'],
    'yellow': ['\x1B[33m', '\x1B[39m'],
    'whiteBG': ['\x1B[47m', '\x1B[49m'],
    'greyBG': ['\x1B[49;5;8m', '\x1B[49m'],
    'blackBG': ['\x1B[40m', '\x1B[49m'],
    'blueBG': ['\x1B[44m', '\x1B[49m'],
    'cyanBG': ['\x1B[46m', '\x1B[49m'],
    'greenBG': ['\x1B[42m', '\x1B[49m'],
    'magentaBG': ['\x1B[45m', '\x1B[49m'],
    'redBG': ['\x1B[41m', '\x1B[49m'],
    'yellowBG': ['\x1B[43m', '\x1B[49m']
};
const colorKey = {
    success: color.green[0] + '%s' + color.green[1],
    successBG: color.greenBG[0] + '%s' + color.greenBG[1],
    error: color.red[0] + '%s' + color.red[1],
    errorBG: color.redBG[0] + '%s' + color.redBG[1],
    warn: color.yellow[0] + '%s' + color.yellow[1],
    warnBG: color.yellowBG[0] + '%s' + color.yellowBG[1],
    primary: color.blue[0] + '%s' + color.blue[1],
    primaryBG: color.blueBG[0] + '%s' + color.blueBG[1],
    ...Object.keys(color).reduce((pre,item) => {
        pre[item] = color[item][0] + '%s' + color[item][1]
        return pre
    },{})
}
const consoleColor = (msg, type) => {
    console.log(colorKey[type], msg)
}
module.exports = consoleColor
