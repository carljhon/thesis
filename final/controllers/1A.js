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

// import 1A router
const apiA1 = require('../../final/router/apiA1')// api 1A birth

// 1A
router.post('/api/a1', (req, res)=> {
    apiA1(mysql, req, res, 'add')
})

router.post('/api/getDocuments', (req, res)=> {
    apiA1(mysql, req, res, 'get')
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

// add supporting dox
router.post('/api/add-supporting-dox', (req, res)=> {
    apiA1(mysql, req, res, 'addSupportingDox')
})

router.post('/api/send-proced', (req, res)=> {
    apiA1(mysql, req, res, 'sendProced')
})

router.post('/api/get-all-documents', (req, res)=> {
    apiA1(mysql, req, res, 'getAll')
})

router.post('/api/admin-approve-set-schedule', (req, res)=> {
    apiA1(mysql, req, res, 'setSchedule')
})

router.post('/api/admin-done', (req, res)=> {
    apiA1(mysql, req, res, 'done')
})


module.exports = router