const express = require('express')
const mysql = require('mysql')
const path = require('path')
const router = express.Router()

const multer = require('multer')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../images'))
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({storage: storage})

// import 2A router
const api2A = require('../../final/router/api2A')// api 2A death

// 2A
router.post('/api/2a', (req, res)=> {
    api2A(mysql, req, res, 'add')
})

router.post('/api/getDocuments_2a', (req, res)=> {
    api2A(mysql, req, res, 'get')
})

// upload images
router.post('/api/add-image1', upload.single('image'), (req, res)=> {
    res.send({success: true, image: req.file.filename})
})
router.post('/api/add-image2', upload.single('image'), (req, res)=> {
    res.send({success: true, image: req.file.filename})
})
router.post('/api/add-image3', upload.single('image'), (req, res)=> {
    res.send({success: true, image: req.file.filename})
})
router.post('/api/add-image4', upload.single('image'), (req, res)=> {
    res.send({success: true, image: req.file.filename})
})
router.post('/api/add-image5', upload.single('image'), (req, res)=> {
    res.send({success: true, image: req.file.filename})
})

// add supporting dox
router.post('/api/add-supporting-dox-2a', (req, res)=> {
    api2A(mysql, req, res, 'addSupportingDox')
})

router.post('/api/send-proced-2a', (req, res)=> {
    api2A(mysql, req, res, 'sendProced')
})

router.post('/api/get-all-documents-2a', (req, res)=> {
    api2A(mysql, req, res, 'getAll')
})

router.post('/api/admin-approve-set-schedule-2a', (req, res)=> {
    api2A(mysql, req, res, 'setSchedule')
})

router.post('/api/admin-done-2a', (req, res)=> {
    api2A(mysql, req, res, 'done')
})


module.exports = router