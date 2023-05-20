const mongoose = require("mongoose");

const OSchemaDefinition = {
    email : String, // 이메일 -> 인증된것만
    password : String, // 비밀번호 
    name : String, // 이름
    phone : String, // 전화번호 (-포함, 국가번호 포함)
    bank : String, // 은행 이름 (카카오뱅크, 우리은행 등)
    account : String, // 계좌번호 (XXXXX-XXXX-XXXX 꼴)
    roomjoined : {
        type: [String],
        default : []
    } // String에는 방의 Id가 들어감
};
const OSchemaOptions = { timestamps: true };

const schema = new mongoose.Schema(OSchemaDefinition, OSchemaOptions);

const UserModel = mongoose.model("users", schema);

module.exports = UserModel;

