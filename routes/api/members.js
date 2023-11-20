const express = require("express");
const members = require("../../members");
const uuid = require("uuid");
const router = express.Router();

// GET ALL MEMBERS
router.get("/", (req, res) => res.json(members));

// GET SINGLE MEMBER
router.get("/:id", (req, res) => {
    let found = members.some(member => member.id == req.params.id);

    if (found) {
        res.json(members.filter(member => member.id == req.params.id));
    } else {
        res.status(400).json({ msg: `Member with ID ${req.params.id} not found!` })
    };
});

// MAKE NEW MEMBER
router.post("/", (req, res) => {
    let newMember = {
        id: uuid.v4(),
        name: req.body.name,
        mail: req.body.mail,
        status: "active"
    };

    if (!req.body.name || !req.body.mail) {
        res.status(400).json({ msg: "Please provide a name and E-mail" });
    } else {
        members.push(newMember)
        // res.json(members);
        res.redirect("/");
    };
});

// UPDATE MEMBER
router.put("/:id", (req, res) => {
    let found = members.some(member => member.id == req.params.id);

    if (found) {
        let updReq = req.body;

        for (let member of members) {
            if (member.id == req.params.id) {
                member.name = updReq.name ? updReq.name : member.name;
                member.mail = updReq.mail ? updReq.mail : member.mail;

                res.json({ msg: "Member was Updated!", member })
            };
        };
    } else {
        res.status(400).json({ msg: `Member with ID ${req.params.id} not found!` })
    };
});

// DELETE MEMBER
router.delete("/:id", (req, res) => {
    let found = members.some(member => member.id == req.params.id);

    if (found) {
        for (let member of members) {
            if (member.id == req.params.id) {
                let remIndex = members.indexOf(member);
                members.splice(remIndex, 1);
                res.json({ members: members })
            }
        }
    } else {
        res.json({ msg: `Member with ID ${req.params.id} not found` });
    };
});

module.exports = router;
