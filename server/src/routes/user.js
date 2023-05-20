/*
필요한 엔드포인트
- 유저 생성
- 유저 삭제
- 유저 정보 수정
- 유저가 참가중인 방 변경
*/
const express = require('express');
const UserModel = require('../models/users.js');

const router = express.Router();

class UserDB {
    static _inst_;
    static getInst = () => {
        if (!UserDB._inst_) UserDB._inst_ = new UserDB();
        return UserDB._inst_;
    }

    constructor() { console.log("[User-DB] DB Init Completed"); }

    insertUser = async (item) => {
        const { email, password, name, phone, bank, account } = item;
        try {
            const newItem = new UserModel({
                email: email,
                password: password,
                name: name,
                phone: phone,
                bank: bank,
                account: account
            });
            const res = await newItem.save();
            return true;
        } catch (e) {
            console.log(`[User-DB] User Insert Error: ${e}`);
            return false;
        }
    }

    deleteUser = async (id) => {
        try {
            const ODeleteFiler = { _id: id };
            const res = await UserModel.deleteOne(ODeleteFiler);
            return true;
        } catch (e) {
            console.log(`[User-DB] User Delete Error: ${e}`);
            return false;
        }
    }

    updateUserInfo = async (item) => {
        const { id, password, name, phone, bank, account, roomjoined } = item;
        try {
            const res = await UserModel.updateOne(
                { id: id },
                {
                    $set: {
                        password: password,
                        name: name,
                        phone: phone,
                        bank: bank,
                        account: account,
                    }
                }
            )
            return true;
        } catch (e) {
            console.log(`[User-DB] User InfoUpdate Error: ${e}`);
            return false;
        }
    }

    updateUserRoom = async (item) => {
        const { id, roomjoined, ifadd } = item;
        try {
            if (ifadd) {
                const res = await UserModel.updateOne(
                    { id: id }, { $push: { roomjoined: roomjoined } }
                )
            }
            else {
                const res = await UserModel.updateOne(
                    { id: id }, { $pull: { roomjoined: roomjoined } }
                )
            }
            return true;
        } catch (e) {
            console.log(`[User-DB] User RoomUpdate Error: ${e}`);
            return false;
        }
    }
}

const UserDBInst = UserDB.getInst();

router.post('/addUser', async (req, res) => {
    try {
        //    const { email , password, name, phone, bank, account } = req.body;
        const addResult = await UserDBInst.insertUser(req.body);
        if (!addResult) return res.status(500).json({ error: dbRes.data })
        else return res.status(200).json({ isOK: true });
    } catch (e) {
        return res.status(500).json({ error: e });
    }
});

router.post('/deleteUser', async (req, res) => {
    try {
        const { id } = req.body;
        const deleteResult = await UserDBInst.deleteUser(id);
        if (!deleteResult) return res.status(500).json({ error: "Can't Delete User" })
        else return res.status(200).json({ isOK: true });
    } catch (e) {
        return res.status(500).json({ error: e });
    }
});

router.post('/updateUserInfo', async (req, res) => {
    try {
        // const { id, password, name, phone, bank, account, roomjoined} = req.body;
        const updateResult = await UserDBInst.updateUserInfo(req.body);
        if (!updateResult) return res.status(500).json({ error: dbRes.data })
        else return res.status(200).json({ isOK: true });
    } catch (e) {
        return res.status(500).json({ error: e });
    }
});

router.post('/updateUserRoom', async (req, res) => {
    try {
        // const { id, roomjoined, ifadd } = req.body;
        const updateResult = await UserDBInst.updateUserRoom(req.body);
        if (!updateResult) return res.status(500).json({ error: dbRes.data })
        else return res.status(200).json({ isOK: true });
    } catch (e) {
        return res.status(500).json({ error: e });
    }
});
module.exports = router;