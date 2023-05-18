const mongoose = require("mongoose");

const OSchemaDefinition = {
    name : String,
    creator : String,
    image : String,
    description : String,
    category : String,
    isclosed : {
        type : Boolean,
        default : false
    },
    iscompleted : {
        type : Boolean,
        default : false
    },
    isrecieved : {
        type : Boolean,
        default : false
    },
    mambers : [String]

};
const OSchemaOptions = { timestamps: true };

const schema = new mongoose.Schema(OSchemaDefinition, OSchemaOptions);

const RoomModel = mongoose.model("rooms", schema);

module.exports = RoomModel;

