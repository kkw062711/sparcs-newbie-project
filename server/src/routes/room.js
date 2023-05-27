const { PrismaClient } = require("@prisma/client")

const express = require('express');
const room = new PrismaClient().room;
const router = express.Router();


router.get('/getRoom', async (req, res) => {
    try {
        const { type, value } = req.body;
        // type 는 default, filter, search, sort 중 하나의 값을 갖고
        // value 는 String 값을 가짐
        // 방 필터, 정렬, 검색은 클라이언트로 옮김.
        const getRoom = await room.findMany({
            orderBy: { createdAt: 'desc' }
        })
        if (getRoom) return res.status(200).json({isOk : true});
        else return res.status(500).json({ error: getRoom })
    } catch (e) {
        return res.status(500).json({ error: e });
    }
});

router.post('/addRoom', async (req, res) => {
    try {
        const { name, creator, image, description, category, price, due } = req.body;
        const addRoom = await room.create({
            data: {
                name: name,
                creator: creator,
                image: image,
                description: description,
                category: category,
                price: price,
                due: due
            }
        })
        if (!addRoom) return res.status(500).json({ error: addRoom })
        else return res.status(200).json({ isOK: true });
    } catch (e) {
        return res.status(500).json({ error: e });
    }
});

router.post('/deleteRoom', async (req, res) => {
    try {
        const { id } = req.body;
        const deleteRoom = await room.delete({
            whiere:{id:id}
        })
        if (!deleteRoom) return res.status(500).json({ error: "Can't Delete Room" })
        else return res.status(200).json({ isOK: true });
    } catch (e) {
        return res.status(500).json({ error: e });
    }
});

router.post('/updateRoomInfo', async (req, res) => {
    try {
        const { id, name, image, description, category, price } = req.body;
        const updateRoomInfo = await room.update({
            where:{id:id},
            data:{
                name: name,
                image: image,
                description: description,
                category: category,
                price: price,
                due: due
            }
        })
        if (!updateRoomInfo) return res.status(500).json({ error: updateRoomInfo })
        else return res.status(200).json({ isOK: true });
    } catch (e) {
        return res.status(500).json({ error: e });
    }
});

router.post('/updateRoomMember', async (req, res) => {
    try {
        const { id, members, ifadd } = req.body;
        // const updateRoomMember = await room.update({
        //     where:{id:id},

        // })
        const roommember = await room.findUnique({
            where: { id: id },
            select: { members: true }
        })
        const updateRoomMember = null
        if (ifadd) {
            updateRoomMember = await room.update({
                where: { id: id },
                data: {
                    roomjoined: {
                        set: [...roommember.members, members]
                    }
                }
            })
        }
        else {
            updateRoomMember = await room.update({
                where: { id: id },
                data: {
                    members: {
                        set: members.filter((i) => i !== id)
                    }
                }
            })
        }
        if (!updateRoomMember) return res.status(500).json({ error: updateRoomMember })
        else return res.status(200).json({ isOK: true });
    } catch (e) {
        return res.status(500).json({ error: e });
    }
});

router.post('/updateRoomState', async (req, res) => {
    try {
        const { id, ispurchased, isclosed, iscompleted, isrecieved } = item;
        const updateRoomState = room.update({
            where:{id:id},
            data:{
                ispurchased: ispurchased,
                isclosed: isclosed,
                iscompleted: iscompleted,
                isrecieved: isrecieved
            }
        })
        if (!updateRoomState) return res.status(500).json({ error: updateRoomState })
        else return res.status(200).json({ isOK: true });
    } catch (e) {
        return res.status(500).json({ error: e });
    }
});
module.exports = router;