const express = require('express')
const path = require('path')
const router = express.Router()


router.all('/private/*', (req, res, next)=> {
    const head = req.rawHeaders[21]

    if(head.endsWith('adminDeath.html') || head.endsWith('adminBirth.html') || head.endsWith('adminMarriage.html') || head.endsWith('documentUser.html') || head.endsWith('documentUser2.html') || head.endsWith('documentUser3.html') || head.endsWith('documentUserCancel.html') || head.endsWith('documentUserComplete.html')){
        next()
    } else {
        res.redirect(404)
    }
})

router.use('/private', express.static(path.join(__dirname, '../../images')))


// page
router.get('/', (req, res)=> {
    res.sendFile(path.join(__dirname, '../../final/public/index.html'))
})
router.get('/index.html', (req, res)=> {
    res.sendFile(path.join(__dirname, '../../final/public/index.html'))
})
router.get('/faq.html', (req, res)=> {
    res.sendFile(path.join(__dirname, '../../final/public/faq.html'))
})
router.get('/aboutUs.html', (req, res)=> {
    res.sendFile(path.join(__dirname, '../../final/public/aboutUs.html'))
})
router.get('/misionVision.html', (req, res)=> {
    res.sendFile(path.join(__dirname, '../../final/public/misionVision.html'))
})

// account page
router.get('/login.html', (req, res)=> {
    res.sendFile(path.join(__dirname, '../../final/public/account/login.html'))
})
router.get('/signup.html', (req, res)=> {
    res.sendFile(path.join(__dirname, '../../final/public/account/signup.html'))
})

// 1A page
router.get('/createNew1AForm.html', (req, res)=> {
    res.sendFile(path.join(__dirname, '../../final/public/1A/createNew1AForm.html'))
})
router.get('/birthPreview.html', (req, res)=> {
    res.sendFile(path.join(__dirname, '../../final/public/1A/birthPreview.html'))
})

// 2A page
router.get('/createNew2AForm.html', (req, res)=> {
    res.sendFile(path.join(__dirname, '../../final/public/2A/createNew2AForm.html'))
})
router.get('/deathPreview.html', (req, res)=> {
    res.sendFile(path.join(__dirname, '../../final/public/2A/deathPreview.html'))
})

// 3A page
router.get('/createNew3AForm.html', (req, res)=> {
    res.sendFile(path.join(__dirname, '../../final/public/3A/createNew3AForm.html'))
})
router.get('/marriagePreview.html', (req, res)=> {
    res.sendFile(path.join(__dirname, '../../final/public/3A/marriagePreview.html'))
})

// User Page
router.get('/accountUser.html', (req, res)=> {
    res.sendFile(path.join(__dirname, '../../final/public/account/accountUser.html'))
})
router.get('/documentUser.html', (req, res)=> {
    res.sendFile(path.join(__dirname, '../../final/public/account/documentUser.html'))
})
router.get('/documentUser2.html', (req, res)=> {
    res.sendFile(path.join(__dirname, '../../final/public/account/documentUser2.html'))
})
router.get('/documentUser3.html', (req, res)=> {
    res.sendFile(path.join(__dirname, '../../final/public/account/documentUser3.html'))
})
router.get('/documentUserCancel.html', (req, res)=> {
    res.sendFile(path.join(__dirname, '../../final/public/account/documentUserCancel.html'))
})
router.get('/documentUserComplete.html', (req, res)=> {
    res.sendFile(path.join(__dirname, '../../final/public/account/documentUserComplete.html'))
})
router.get('/UserChat.html', (req, res)=> {
    res.sendFile(path.join(__dirname, '../../final/public/account/UserChat.html'))
})

// admin page
router.get('/adminBirth.html', (req, res)=> {
    res.sendFile(path.join(__dirname, '../../final/public/admin/adminBirth.html'))
})
router.get('/adminChat.html', (req, res)=> {
    res.sendFile(path.join(__dirname, '../../final/public/admin/adminChat.html'))
})
router.get('/adminDeath.html', (req, res)=> {
    res.sendFile(path.join(__dirname, '../../final/public/admin/adminDeath.html'))
})
router.get('/adminFAQ.html', (req, res)=> {
    res.sendFile(path.join(__dirname, '../../final/public/admin/adminFAQ.html'))
})
router.get('/admin', (req, res)=> {
    res.sendFile(path.join(__dirname, '../../final/public/admin/adminLogin.html'))
})
router.get('/adminMarriage.html', (req, res)=> {
    res.sendFile(path.join(__dirname, '../../final/public/admin/adminMarriage.html'))
})
router.get('/adminUserAccount.html', (req, res)=> {
    res.sendFile(path.join(__dirname, '../../final/public/admin/adminUserAccount.html'))
})
router.get('/Reports.html', (req, res)=> {
    res.sendFile(path.join(__dirname, '../../final/public/admin/Reports.html'))
})


module.exports = router