const express = require('express')
const path = require('path')
const router = express.Router()



// page
router.get('/index.css', (req, res)=> {
    res.sendFile(path.join(__dirname, '../../final/css/index.css'))
})
router.get('/faq.css', (req, res)=> {
    res.sendFile(path.join(__dirname, '../../final/css/faq.css'))
})
router.get('/aboutUs.css', (req, res)=> {
    res.sendFile(path.join(__dirname, '../../final/css/aboutUs.css'))
})
router.get('/missionVision.css', (req, res)=> {
    res.sendFile(path.join(__dirname, '../../final/css/missionVision.css'))
})

// account page
router.get('/login.css', (req, res)=> {
    res.sendFile(path.join(__dirname, '../../final/css/account/login.css'))
})
router.get('/signup.css', (req, res)=> {
    res.sendFile(path.join(__dirname, '../../final/css/account/signup.css'))
})

// 1A css
router.get('/birthPreview.css', (req, res)=> {
    res.sendFile(path.join(__dirname, '../../final/css/A1/birthPreview.css'))
})
router.get('/createNew1AForm.css', (req, res)=> {
    res.sendFile(path.join(__dirname, '../../final/css/A1/createNew1AForm.css'))
})

// User page css
router.get('/accountUser.css', (req, res)=> {
    res.sendFile(path.join(__dirname, '../../final/css/account/accountUser.css'))
})
router.get('/documentUser.css', (req, res)=> {
    res.sendFile(path.join(__dirname, '../../final/css/account/documentUser.css'))
})


// admin page css
router.get('/adminLogin.css', (req, res)=> {
    res.sendFile(path.join(__dirname, '../../final/css/admin/adminLogin.css'))
})
router.get('/adminUserAccount.css', (req, res)=> {
    res.sendFile(path.join(__dirname, '../../final/css/admin/adminUserAccount.css'))
})
router.get('/reports.css', (req, res)=> {
    res.sendFile(path.join(__dirname, '../../final/css/admin/reports.css'))
})



module.exports = router