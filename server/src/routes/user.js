const { PrismaClient } = require("@prisma/client")

const express = require('express');
const client = new PrismaClient();
const router = express.Router();

router.post('/addUser', async (req, res) => {
    try {
        const { email, password, name, phone, bank, account } = req.body;
        const addResult = await client.user.create({
            data: {
                email: email,
                password: password,
                name: name,
                phone: phone,
                bank: bank,
                account: account
            }
        })
        if (!addResult) return res.status(500).json({ error: addResult })
        else return res.status(200).json({ isOK: true });
    } catch (e) {
        return res.status(500).json({ error: e });
    }
});

router.post('/deleteUser', async (req, res) => {
    try {
        const { id } = req.body;
        const deleteResult = await client.user.delete({
            where: {
                id: id
            }
        })
        if (!deleteResult) return res.status(500).json({ error: "Can't Delete User" })
        else return res.status(200).json({ isOK: true });
    } catch (e) {
        return res.status(500).json({ error: e });
    }
});

router.post('/updateUserInfo', async (req, res) => {
    try {
        const { id, password, name, phone, bank, account, roomjoined } = req.body;
        const updateResult = await client.user.update({
            where: {
                id: id
            },
            data: {
                password: password,
                name: name,
                phone: phone,
                bank: bank,
                account: account,
            }
        })
        if (!updateResult) return res.status(500).json({ error: updateResult })
        else return res.status(200).json({ isOK: true });
    } catch (e) {
        return res.status(500).json({ error: e });
    }
});

router.post('/updateUserRoom', async (req, res) => {
    try {
        const { id, roomjoined, ifadd } = req.body;
        const userroom = await client.user.findUnique({
            where: { id: id },
            select: { roomjoined: true }
        })
        const updateUserRoom = null
        if (ifadd) {
            updateUserRoom = await client.user.update({
                where: { id: id },
                data: {
                    roomjoined: {
                        set: [...userroom.roomjoined, roomjoined]
                    }
                }
            })
        }
        else {
            updateUserRoom = await client.user.update({
                where: { id: id },
                data: {
                    roomjoined: {
                        set: roomjoined.filter((i) => i !== id)
                    }
                }
            })
        }
        if (!updateUserRoom) return res.status(500).json({ error: updateUserRoom })
        else return res.status(200).json({ isOK: true });
    } catch (e) {
        return res.status(500).json({ error: e });
    }
});
module.exports = router;