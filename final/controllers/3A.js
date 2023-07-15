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

// import 3A router
const api3A = require('../../final/router/api3A')// api 3A marriage

// 3A
router.post('/api/3a', (req, res)=> {
    api3A(mysql, req, res, 'add')
})

router.post('/api/getDocuments_3a', (req, res)=> {
    api3A(mysql, req, res, 'get')
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
router.post('/api/add-image6', upload.single('image'), (req, res)=> {
    res.send({success: true, image: req.file.filename})
})
router.post('/api/add-image7', upload.single('image'), (req, res)=> {
    res.send({success: true, image: req.file.filename})
})
router.post('/api/add-image8', upload.single('image'), (req, res)=> {
    res.send({success: true, image: req.file.filename})
})
router.post('/api/add-image9', upload.single('image'), (req, res)=> {
    res.send({success: true, image: req.file.filename})
})
router.post('/api/add-image10', upload.single('image'), (req, res)=> {
    res.send({success: true, image: req.file.filename})
})
router.post('/api/add-image11', upload.single('image'), (req, res)=> {
    res.send({success: true, image: req.file.filename})
})
router.post('/api/add-image12', upload.single('image'), (req, res)=> {
    res.send({success: true, image: req.file.filename})
})

// add supporting dox
router.post('/api/add-supporting-dox-3a', (req, res)=> {
    api3A(mysql, req, res, 'addSupportingDox')
})

router.post('/api/send-proced-3a', (req, res)=> {
    api3A(mysql, req, res, 'sendProced')
})

router.post('/api/get-all-documents-3a', (req, res)=> {
    api3A(mysql, req, res, 'getAll')
})

router.post('/api/admin-approve-set-schedule-3a', (req, res)=> {
    api3A(mysql, req, res, 'setSchedule')
})

router.post('/api/admin-done-3a', (req, res)=> {
    api3A(mysql, req, res, 'done')
})


module.exports = router