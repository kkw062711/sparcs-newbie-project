const mongoose = require("mongoose");

const OSchemaDefinition = {
    name : String, // 방의 이름
    creator : String, // 방의 생성자
    image : String, // 공구할 제품의 사진 링크
    description : String, // 공구할 제품 설명
    category : String, // 공구할 제품의 카테고리
    price : Number, // 공구 제품 가격
    ispurchased : {
        type : Boolean,
        default : false
    },
    isclosed : {       // 방의 마감 여부
        type : Boolean,
        default : false
    },
    iscompleted : {     // 방의 정산 여부
        type : Boolean,
        default : false
    },
    isrecieved : {      // 제품 수령 여부
        type : Boolean,
        default : false
    },
    members : {
        type : [String],
        default : []
      }  // 방에 참여하고 있는 사람들 목록 (String에는 유저 ID가 들어감)

};
const OSchemaOptions = { timestamps: true };

const schema = new mongoose.Schema(OSchemaDefinition, OSchemaOptions);

const RoomModel = mongoose.model("rooms", schema);

module.exports = RoomModel;

