const express = require("express");
const bcrypt = require('bcrypt');
const router = express.Router();
const Users = require("../models/users");
const jwt = require('jsonwebtoken');

router.get("/", async (req, res) => {
    const users = await Users.getAll();
    res.json (users);
})

router.post('/login', async (req, res) => {
    const secret = process.env.JWT_SECRET;
    const name = req.body.name;
    const password = req.body.password;
    if (!name || !password) {
        return res.send({
            error: 'User name and password required'
        })
    }
    const users = await models.Users.findAll({
        where: {
            name
        }
    })    
    const user = users[0];
    if (!user) {
        res.status(401);
        return res.send({
            error: 'Invalid username or password'
        });
    }    try {
        const compareRes = await bcrypt.compare(password, user.hashedPassword);
        if (compareRes) {
            const token = jwt.sign(
                {
                    data: {
                        userName,
                        userId: user.id
                    }
                },
                secret,
                { expiresIn: 60 * 60 }
            );
            return res.send({ token });
        }
        else {
            res.status(401);
            return res.send({
                error: 'Invalid username or password'
            });
        }
    }
    catch (ex) {
        logger.error(ex);
        res.status(401);
        return res.send({
            error: 'Invalid username or password'
        });
    }});




module.exports = router;