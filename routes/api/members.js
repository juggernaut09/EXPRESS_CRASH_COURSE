const express = require('express');
const router = express.Router();
const members = require('../../Members');
const uuid = require('uuid');


//This route gets all members
router.get('/', (req,res) =>{
    res.json(members)

})

//get single member
router.get("/:id", (req,res) => {
    const found = members.some(member => member.id === parseInt(req.params.id))
    if(found){
        res.send(members.filter(member => member.id === parseInt(req.params.id)))
    }
    else{
        res.status(400).json({msg : `No member with the id ${req.params.id} found`})
    }
})

//Create a member
router.post("/",(req,res) =>{
    const newMember = {
        id : uuid.v4(),
        name : req.body.name,
        email : req.body.email,
        status: 'active'
    }

    if (!newMember.name && !newMember.email){
       return res.status(400).json({msg : "Please fill the details"})
    }

    members.push(newMember)
    res.json(members)

})

//Update memeber
router.put("/:id", (req,res) => {
    const found = members.some(member => member.id === parseInt(req.params.id))
    if(found){
        members.forEach(member => {
            if(member.id === parseInt(req.params.id)){
                member.name = req.body.name ? req.body.name : member.name
                member.email = req.body.email ? req.body.email : member.email
                return res.json({msg: `The member with the id ${req.params.id} is updated.`, member})
            }
        })
        

    }
    else{
        res.status(400).json({msg: `No member found with the id ${req.params.id}`})
    }
})



//delete single member
router.delete("/:id", (req,res) => {
    const found = members.some(member => member.id === parseInt(req.params.id))
    if(found){
        res.json({msg:`The member with the id ${req.params.id}`, members: members.filter(member => member.id !== parseInt(req.params.id))})
        res.send(members.filter(member => member.id === parseInt(req.params.id)))
    }
    else{
        res.status(400).json({msg : `No member with the id ${req.params.id} found`})
    }
})

module.exports = router