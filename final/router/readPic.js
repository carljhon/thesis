const express = require('express')
const path = require('path')
const router = express.Router()

router.get('/logo.png', (req, res)=> {
    res.sendFile(path.join(__dirname, '../../final/picture/logo.png'))
})

router.get('/baby1.png', (req, res)=> {
    res.sendFile(path.join(__dirname, '../../final/picture/baby1.png'))
})

router.get('/faq3.png', (req, res)=> {
    res.sendFile(path.join(__dirname, '../../final/picture/faq3.png'))
})

router.get('/folder.png', (req, res)=> {
    res.sendFile(path.join(__dirname, '../../final/picture/folder.png'))
})

router.get('/man.png', (req, res)=> {
    res.sendFile(path.join(__dirname, '../../final/picture/man.png'))
})

router.get('/woman.png', (req, res)=> {
    res.sendFile(path.join(__dirname, '../../final/picture/woman.png'))
})

router.get('/visionary.png', (req, res)=> {
    res.sendFile(path.join(__dirname, '../../final/picture/visionary.png'))
})

router.get('/vision.png', (req, res)=> {
    res.sendFile(path.join(__dirname, '../../final/picture/vision.png'))
})

router.get('/marriage.png', (req, res)=> {
    res.sendFile(path.join(__dirname, '../../final/picture/NicePng_holding-hands-png_626275.png'))
})

router.get('/death.png', (req, res)=> {
    res.sendFile(path.join(__dirname, '../../final/picture/pngwing.com.png'))
})


module.exports = router