const { PrismaClient } = require("@prisma/client")

const express = require('express');
const client = new PrismaClient();
const router = express.Router();
const nodemailer = require('nodemailer')

router.post('/getUser', async (req, res) => {
    try {
        const { id } = req.body;
        const getUser = await client.user.findUnique({
            where: { id: parseInt(id) }
        })
        if (!getUser) return res.status(200).json(getUser)
        else { return res.status(200).json(getUser); }
    } catch (e) {
        return res.status(500).json({ error: e });
    }
});

router.post('/addUser', async (req, res) => {
    try {
        const { email, password, name, phone, bank, account } = req.body;
        const addUser = await client.user.create({
            data: {
                email: email,
                password: password,
                name: name,
                phone: phone,
                bank: bank,
                account: account
            }
        })
        if (!addUser) return res.status(500).json({ error: addUser })
        else { return res.status(200).json({ isOK: true, added: addUser }); }
    } catch (e) {
        return res.status(500).json({ error: e });
    }
});

router.post('/Login', async (req, res) => {
    try {
        const { email, password } = req.body;
        var Loginsuccess = false;
        const Login = await client.user.findUnique({
            where: {
                email: email
            }
        })
        if (Login) {
            if (Login.password == password) {
                Loginsuccess = Login.id
            }
        }

        return res.status(200).json({ Loginsuccess: Loginsuccess })
        // if (getRoom) return res.status(200).json(getRoom);
        // else return res.status(500).json({ error: getRoom })
    } catch (e) {
        return res.status(500).json({ error: e });
    }
});

router.post('/deleteUser', async (req, res) => {
    try {
        const { id } = req.body;

        const rooms = await client.user.findUnique({
            where: {
                id: parseInt(id),
            }
        })

        const createdroom = await client.room.findMany({
            where: {
                creator: id
            }
        })

        createdroom.forEach(async (room) => {
            const deleteRoom = await client.room.delete({
                where: {
                    id: room.id
                }
            })
        })

        rooms.roomjoined.forEach(async (room) => {
            const joinedroom = await client.room.findUnique({
                where: { id: parseInt(room) },
                select: { members: true }
            })
            console.log([...joinedroom.members.filter((i) => i !== parseInt(id))])
            const updateRoomUser = await client.room.update({
                where: { id: parseInt(room) },
                data: {
                    members: [...joinedroom.members.filter((i) => i !== parseInt(id))]
                }
            })
        })



        const deleteUser = await client.user.delete({
            where: {
                id: parseInt(id),
            }
        })
        deleteUser = true
        console.log(deleteUser)
        if (!deleteUser) return res.status(500).json({ error: "Can't Delete User" })
        else return res.status(200).json({ isOK: true });
    } catch (e) {
        return res.status(500).json({ error: e });
    }
});

router.post('/updateUserInfo', async (req, res) => {
    try {
        const { id, password, name, phone, bank, account } = req.body;
        const updateUserInfo = await client.user.update({
            where: {
                id: parseInt(id)
            },
            data: {
                password: password,
                name: name,
                phone: phone,
                bank: bank,
                account: account,
            }
        })
        return res.status(200).json({ isOK: true });
    } catch (e) {
        return res.status(500).json({ error: e });
    }
});

router.post('/updateUserRoom', async (req, res) => {
    try {
        const { id, roomjoined, ifadd } = req.body;
        const userroom = await client.user.findUnique({
            where: { id: parseInt(id) },
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
                where: { id: parseInt(id) },
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

router.post('/sendEmail', async (req, res) => {
    try {
        const email = req.body.email
        console.log(email)
        const randnum = Math.floor(Math.random() * 899999) + 100000
        // localStorage.clear()
        // window.localStorage.setItem('authnum', randnum)
        // const sender = nodemailer.createTransport({
        //     service: 'gmail', // mail 서비스명 ex) 'Naver', 'gmail' 등
        //     auth: {
        //       user: 'GSiK.DEV@gmail.com', // mail 발송 이메일 주소
        //       pass: 'GSiK@DEV!!#', // 해당 이메일 비밀번호
        //     },
        //     tls: {
        //       rejectUnauthorized: false,
        //     },
        //   });

        // const mailopt = {
        //     from: 'Group shopping in Kaist',
        //     to: email,
        //     subject: '[GSiK] Email Authentication',
        //     text: `Your authentication code is ${randnum}`
        // }
        // sender.sendMail(mailopt, (error, responses) => {
        //     if (error) {
        //         res.status(500).json({
        //             message: `Failed to send authentication email to ${email}`,
        //         });
        //     } else {
        //         res.status(200).json({
        //             authNumber,
        //             message: `Authentication mail is sent to ${email}`,
        //         });
        //     }
        // })
    } catch (e) {
        return res.status(500).json({ error: e });
    }
});

module.exports = router;