const express = require('express')
const mysql = require('mysql')
const router = express.Router()

// import apiAdminFAQ router
const apiAdminFAQ = require('../../final/router/apiAdminFAQ') // admin FAQ

// FAQ admin
router.post('/api/addFAQ', (req, res)=> {
    apiAdminFAQ(mysql, req, res, 'add')
})

router.post('/api/getFAQ', (req, res)=> {
    apiAdminFAQ(mysql, req, res, 'get')
})

router.post('/api/deleteFAQ', (req, res)=> {
    apiAdminFAQ(mysql, req, res, 'delete')
})

router.post('/api/editFAQ', (req, res)=> {
    apiAdminFAQ(mysql, req, res, 'edit')
})


module.exports = router