const express = require('express')
const router = express.Router()
const fs = require('fs');
const dataFilePath = './data.json';
router.use(express.json())
router.use(express.urlencoded({extended:true})) //interpret images
const array1 = [{"Name":"Appollo","Count":"200","Location":"Bangalore"}]


router.get ('/get',(req,res)=>{
    // res.send(array1)
    const hospitals = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
    res.json(hospitals);
})

router.post('/post',(req,res)=>{
    
    const hospitals = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
    const newHospital = req.body;
    newHospital.id = hospitals.length + 1;
    hospitals.push(newHospital);
    fs.writeFileSync(dataFilePath, JSON.stringify(hospitals));
    res.json(newHospital);
})


router.put('/update/:id',(req,res)=>{
  
    const hospitals = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
    const id = parseInt(req.params.id);
    const updatedHospital = req.body;
    const index = hospitals.findIndex(hospital => hospital.id === id);
    if (index !== -1) {
        hospitals[index] = { id, ...updatedHospital };
        fs.writeFileSync(dataFilePath, JSON.stringify(hospitals));
        res.json(hospitals[index]);
    } else {
        res.status(404).json({ message: 'Hospital not found' });
    }
})
router.delete('/remove/:id',(req,res)=>{
    const hospitals = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
    const id = parseInt(req.params.id);
    const index = hospitals.findIndex(hospital => hospital.id === id);
    if (index !== -1) {
        hospitals.splice(index, 1);
        fs.writeFileSync(dataFilePath, JSON.stringify(hospitals));
        res.json({ message: 'Hospital deleted successfully' });
    } else {
        res.status(404).json({ message: 'Hospital not found' });
    }
})



module.exports = router  