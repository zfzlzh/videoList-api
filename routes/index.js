/*
 * @Author: zfz
 * @Date: 2021-11-19 14:09:30
 * @LastEditors: zfz
 * @LastEditTime: 2021-11-23 13:47:26
 * @Description: update
 */
const videosRouter = require('./videos/index');
const usersRouter = require('./users/index');
const filesRouter = require('./files/index')
module.exports = function routerUse(app){
    app.use('/videos', videosRouter);
    app.use('/users', usersRouter);
    app.use('/files', filesRouter);
}