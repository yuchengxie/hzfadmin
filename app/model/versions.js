/*
 * @Date: 2020-01-30 23:56:53
 * @LastEditors: wangbingqi
 * @LastEditTime : 2020-02-03 18:45:40
 */

module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    var d = new Date();
    var VersionsSchema = Schema({
        name: {
            type: String
        },
        version: {
            type: String
        },
        wgtUrl: {
            type: String
        },
        pkgUrl: {
            type: String
        },
        add_time: {
            type: Number,
            default: d.getTime()
        }
    })
    return mongoose.model('Versions', VersionsSchema, 'versions');
}