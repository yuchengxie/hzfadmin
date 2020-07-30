
module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    var d = new Date();
    var VersionSchema = Schema({
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
    return mongoose.model('Version', VersionSchema, 'version');
}