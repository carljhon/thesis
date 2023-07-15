const express = require('express')
const mysql = require('mysql')
const router = express.Router()

// import apiAdminChat router
const apiAdminChat = require('../../final/router/apiAdminChat') // chat admin

// Chat admin
router.post('/api/send-chat', (req, res)=> {
    apiAdminChat(mysql, req, res, 'send')
})

router.post('/api/admin-chat-list', (req, res)=> {
    apiAdminChat(mysql, req, res, 'adminChatList')
})

router.post('/api/receive-chat', (req, res)=> {
    apiAdminChat(mysql, req, res, 'receive')
})

router.post('/api/admin-send-chat', (req, res)=> {
    apiAdminChat(mysql, req, res, 'adminSendChat')
})


module.exports = router