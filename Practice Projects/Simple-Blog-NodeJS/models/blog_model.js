/*Model, Schema -- way of defining the tables in DB 
Mongoose - used to define the schema and model
*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const myblog_blogs_Schema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
}, {timestamps: true})

// defining the model by passing table name. schema name
const myblog_blogs_model = mongoose.model('myblog_blog', myblog_blogs_Schema); 

module.exports = myblog_blogs_model;