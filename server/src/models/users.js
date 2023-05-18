const mongoose = require("mongoose");

const OSchemaDefinition = {
    email : String,
    password : String,
    name : String,
    phone : String,
    bank : String,
    account : String,
    roomcreated : [String],
};
const OSchemaOptions = { timestamps: true };

const schema = new mongoose.Schema(OSchemaDefinition, OSchemaOptions);

const UserModel = mongoose.model("users", schema);

module.exports = UserModel;

