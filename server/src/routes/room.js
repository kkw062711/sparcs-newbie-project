const { PrismaClient } = require("@prisma/client")

const express = require('express');
const client = new PrismaClient();
const router = express.Router();


router.get('/getRoom', async (req, res) => {
    try {
        // type 는 default, filter, search, sort 중 하나의 값을 갖고
        // value 는 String 값을 가짐
        // 방 필터, 정렬, 검색은 클라이언트로 옮김.
        const getRoom = await client.room.findMany({})
        return res.status(200).json(getRoom)
    } catch (e) {
        return res.status(500).json({ error: e });
    }
});

router.post('/getMyRoom', async (req, res) => {
    try {
        const { id } = req.body
        const getMyRoom = await client.room.findMany({
            where: {
                members: {
                    has: parseInt(id)
                }
            }
        })
        return res.status(200).json(getMyRoom)
    } catch (e) {
        return res.status(500).json({ error: e });
    }
});

router.post('/getRoombyId', async (req, res) => {
    try {
        const { id } = req.body
        // type 는 default, filter, search, sort 중 하나의 값을 갖고
        // value 는 String 값을 가짐
        // 방 필터, 정렬, 검색은 클라이언트로 옮김.
        const getRoom = await client.room.findMany({
            where: { id: parseInt(id) }
        })
        let Users = []
        for (var i = 0; i < getRoom[0].members.length; i++) {
            const User = await client.user.findUnique({
                where: {
                    id: getRoom[0].members[i]
                }
            })
            Users.push(User)
        }
        getRoom[0] = { ...getRoom[0], members: Users }
        return res.status(200).json(getRoom)
    } catch (e) {
        return res.status(500).json({ error: e });
    }
});

router.post('/addRoom', async (req, res) => {
    try {
        const { name, creator, image, description, category, price } = req.body;
        const addRoom = await client.room.create({
            data: {
                name: name,
                creator: creator,
                image: image,
                description: description,
                category: category,
                price: parseInt(price),
            }
        })
        const roomid = addRoom.id
        const RoomCreator = parseInt(addRoom.creator)
        const members = await client.room.findUnique({
            where: { id: parseInt(roomid) },
            select: { members: true }
        })
        members.members.push(RoomCreator)
        const newaddRoom = await client.room.update({
            where: { id: parseInt(roomid) },
            data: {
                members: members.members
            }
        })
        const userroom = await client.user.findUnique({
            where: { id: parseInt(creator) },
            select: { roomjoined: true }
        })
        const updateUserRoom = await client.user.update({
            where: { id: parseInt(creator) },
            data: {
                roomjoined: [...userroom.roomjoined, parseInt(roomid)]
            }
        })
        return res.status(200).json({ room: newaddRoom, user: updateUserRoom });
    } catch (e) {
        return res.status(500).json({ error: e });
    }
});
router.post('/deleteRoom', async (req, res) => {
    try {
        const { id } = req.body;
        const users = await client.room.findUnique({
            where:{
                id:parseInt(id),
            }
        })
        users.members.forEach(async (user)=>{
            const userroom = await client.user.findUnique({
                where: { id: parseInt(user) },
                select: { roomjoined: true }
            }) 
            const updateUserRoom = await client.user.update({
                where: { id: parseInt(user) },
                data: {
                    roomjoined: [...userroom.roomjoined.filter((i) => i !== parseInt(id))]
                }
            })
        })
        const deleteRoom = await client.room.delete({
            where: {
                id: parseInt(id),
            }
        })
        if (deleteRoom) return res.status(500).json({ error: "Can't Delete Room" })
        else return res.status(200).json({ isOK: true });
    } catch (e) {
        return res.status(500).json({ error: e });
    }
});

router.post('/updateRoomInfo', async (req, res) => {
    try {
        const { id, name, image, description, category, price } = req.body;
        const updateRoomInfo = await client.room.update({
            where: { id: parseInt(id) },
            data: {
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
        const { roomid, userid, ifadd } = req.body;

        const roommember = await client.room.findUnique({
            where: { id: parseInt(roomid) },
            select: { members: true }
        })

        const userroom = await client.user.findUnique({
            where: { id: parseInt(userid) },
            select: { roomjoined: true }
        })


        if (ifadd) {
            const updateRoomMember = await client.room.update({
                where: { id: parseInt(roomid) },
                data: {
                    members: [...roommember.members, parseInt(userid)]
                }
            })
            const updateUserRoom = await client.user.update({
                where: { id: parseInt(userid) },
                data: {
                    roomjoined: [...userroom.roomjoined, parseInt(roomid)]
                }
            })
            return res.status(200).json({ room: updateRoomMember, user: updateUserRoom });
        }
        else {
            // console.log(roommember.members.filter((i) => i !== parseInt(userid)))
            const updateRoomMember = await client.room.update({
                where: { id: parseInt(roomid) },
                data: {
                    members: [...roommember.members.filter((i) => i !== parseInt(userid))]
                }
            })
            const updateUserRoom = await client.user.update({
                where: { id: parseInt(userid) },
                data: {
                    roomjoined: [...userroom.roomjoined.filter((i) => i !== parseInt(roomid))]
                }
            })
            return res.status(200).json({ room: updateRoomMember, user: updateUserRoom });
        }
    } catch (e) {
        return res.status(500).json({ error: e });
    }
});

router.post('/updateRoomState', async (req, res) => {
    try {
        const { id, ispurchased, isclosed, iscompleted, isrecieved } = req.body;
        
        const updateRoomState = await client.room.update({
            where: { id: parseInt(id) },
            data: {
                ispurchased: ispurchased,
                isclosed: isclosed,
                iscompleted: iscompleted,
                isrecieved: isrecieved
            }
        })
        console.log(updateRoomState)
        if (!updateRoomState) return res.status(500).json({ error: updateRoomState })
        else return res.status(200).json({ isOK: true });
    } catch (e) {
        return res.status(500).json({ error: e });
    }
});
module.exports = router;