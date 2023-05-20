/*
필요한 엔드포인트
- 방 조회 OK
- 방 생성 OK
- 방 정보 수정 OK
- 방 멤버 변경 OK
- 방 상태 변경 
- 방 삭제 OK
*/
const express = require('express');
const RoomModel = require('../models/room.js');

const router = express.Router();

class RoomDB {
    static _inst_;
    static getInst = () => {
        if (!RoomDB._inst_) RoomDB._inst_ = new RoomDB();
        return RoomDB._inst_;
    }

    // #id = 1; #itemCount = 1; #LDataDB = [{ id: 0, title: "test1", content: "Example body" }];

    constructor() { console.log("[Room-DB] DB Init Completed"); }

    selectRooms = async (item) => {
        try {
            const { type, value } = item;
            // type 는 default, filter, search, sort 중 하나의 값을 갖고
            // value 는 String 값을 가짐
            var res = []
            switch (type) {
                case 'default':
                    res = await RoomModel.find().sort({ 'createdAt': -1 }).exec();
                    break;
                case 'filter':
                    res = await RoomModel.find({ category: value }).exec();
                    break;
                case 'search':
                    res = await RoomModel.find({ $text: { $search: value } });
                    break;
                case 'sort':
                    switch (value) {
                        case 'dateu':
                            res = await RoomModel.find().sort({ 'createdAt': -1 });
                            break;
                        case 'dated':
                            res = await RoomModel.find().sort({ 'createdAt': 1 });
                            break;
                        case 'nameu':
                            res = await RoomModel.find().sort({ 'name': -1 });
                            break;
                        case 'named':
                            res = await RoomModel.find().sort({ 'name': 1 });
                            break;
                        case 'priceu':
                            res = await RoomModel.find().sort({ 'price': -1 });
                            break;
                        case 'priced':
                            res = await RoomModel.find().sort({ 'price': 1 });
                            break;
                        default:
                            break;
                    }
                    break;
                default:
                    break;
            }
            return { success: true, data: res };
        } catch (e) {
            console.log(`[Room-DB] Room Select Error: ${e}`);
            return { success: false, data: `DB Error - ${e}` };
        }
    }

    insertRoom = async (item) => {
        const { name, creator, image, description, category, price } = item;
        try {
            const newItem = new RoomModel({
                name: name,
                creator: creator,
                image: image,
                description: description,
                category: category,
                price: price
            });
            const res = await newItem.save();
            RoomModel.updateOne({ id: newItem._id }, { $push: { members: creator } })
            return true;
        } catch (e) {
            console.log(`[Room-DB] Room Insert Error: ${e}`);
            return false;
        }
    }

    deleteRoom = async (id) => {
        try {
            const ODeleteFiler = { _id: id };
            const res = await RoomModel.deleteOne(ODeleteFiler);
            return true;
        } catch (e) {
            console.log(`[Room-DB] Room Delete Error: ${e}`);
            return false;
        }
    }

    updateRoomInfo = async (item) => {
        const { id, name, image, description, category, price } = item;
        try {
            const res = await RoomModel.updateOne(
                { id: id },
                {
                    $set: {
                        name: name,
                        image: image,
                        description: description,
                        category: category,
                        price: price
                    }
                }
            )
            return true;
        } catch (e) {
            console.log(`[Room-DB] Room Info Update Error: ${e}`);
            return false;
        }
    }
    updateRoomMember = async (item) => {
        const { id, members, ifadd } = item;
        try {
            if (ifadd) {
                const res = await RoomModel.updateOne(
                    { id: id }, { $push: { mebers: members } }
                )
            }
            else {
                const res = await RoomModel.updateOne(
                    { id: id }, { $pull: { mebers: members } }
                )
            }
            return true;
        } catch (e) {
            console.log(`[Room-DB] Room Member Update Error: ${e}`);
            return false;
        }
    }
    updateRoomState = async (item) => {
        const { id, ispurchased, isclosed, iscompleted, isrecieved } = item;
        try {
            const res = await RoomModel.updateOne(
                { id: id },
                {
                    $set: {
                        ispurchased: ispurchased,
                        isclosed: isclosed,
                        iscompleted: iscompleted,
                        isrecieved: isrecieved
                    }
                }
            )
            return true;
        } catch (e) {
            console.log(`[Room-DB] Room State Update Error: ${e}`);
            return false;
        }
    }
}

const RoomDBInst = RoomDB.getInst();

router.get('/getRoom', async (req, res) => {
    try {
        // const {type, value} = req.body;
        const dbRes = await RoomDBInst.selectRooms(req.body);
        if (dbRes.success) return res.status(200).json(dbRes.data);
        else return res.status(500).json({ error: dbRes.data })
    } catch (e) {
        return res.status(500).json({ error: e });
    }
});

router.post('/addRoom', async (req, res) => {
    try {
        // const { name, creator, image, description, category, price } = req.body;
        const addResult = await RoomDBInst.insertItem(req.body);
        if (!addResult) return res.status(500).json({ error: dbRes.data })
        else return res.status(200).json({ isOK: true });
    } catch (e) {
        return res.status(500).json({ error: e });
    }
});

router.post('/deleteRoom', async (req, res) => {
    try {
        const { id } = req.body;
        const deleteResult = await RoomDBInst.deleteItem(id);
        if (!deleteResult) return res.status(500).json({ error: "Can't Delete Room" })
        else return res.status(200).json({ isOK: true });
    } catch (e) {
        return res.status(500).json({ error: e });
    }
});

router.post('/updateRoomInfo', async (req, res) => {
    try {
        // const { id, name, image, description, category, price, ispurchased, isclosed, iscompleted, isrecieved, members } = req.body;
        const updateResult = await RoomDBInst.updateRoomInfo(req.body);
        if (!updateResult) return res.status(500).json({ error: dbRes.data })
        else return res.status(200).json({ isOK: true });
    } catch (e) {
        return res.status(500).json({ error: e });
    }
});

router.post('/updateRoomMember', async (req, res) => {
    try {
        // const { id, members, ifadd } = req.body;
        const updateResult = await RoomDBInst.updateRoomMember(req.body);
        if (!updateResult) return res.status(500).json({ error: dbRes.data })
        else return res.status(200).json({ isOK: true });
    } catch (e) {
        return res.status(500).json({ error: e });
    }
});

router.post('/updateRoomState', async (req, res) => {
    try {
        // const { id, ispurchased, isclosed, iscompleted, isrecieved } = item;
        const updateResult = await RoomDBInst.updateRoomMember(req.body);
        if (!updateResult) return res.status(500).json({ error: dbRes.data })
        else return res.status(200).json({ isOK: true });
    } catch (e) {
        return res.status(500).json({ error: e });
    }
});
module.exports = router;