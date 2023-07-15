const http = require('http')
const fs = require('fs')
const mysql = require('mysql')
const {WebSocketServer} = require('ws')
const express = require('express')
const path = require('path')

// read
const readHtml = require('./final/router/readHtmlFile')
const readCss = require('./final/router/readCss')
const readPic = require('./final/router/readPic')

// controllers
const api2A = require('./final/controllers/2A')
const api3A = require('./final/controllers/3A')
const api1A = require('./final/controllers/1A')
const apiAdminChat = require('./final/controllers/chat')
const apiAdminFAQ = require('./final/controllers/faq')

// api
const apiLogin = require('./final/router/apiLogin') // api login
const apiAdminLogin = require('./final/router/apiAdminLogin') // api admin login
const apiSignUp = require('./final/router/apiSignup')
const apiAccount = require('./final/router/apiAccount')
const apiAdminUsersAccounts = require('./final/router/apiAdminGetUsersAccounts') // admin users accounts


const app = express()

app.use(readHtml) // rendering html homepage
app.use(readCss) // rendering css homepage
app.use(readPic) // rendering pictures

app.use(api1A) // api 1A
app.use(api2A) // api 2A
app.use(api3A) // api 3A

app.use(apiAdminChat) // chat

app.use(apiAdminFAQ) // admin FAQ c-r-u-d


// login signup api
app.post('/api/login', (req, res)=> {
    apiLogin(mysql, req, res)
})
app.post('/api/signup', (req, res)=> {
    apiSignUp(mysql, req, res)
})

// user account
app.post('/api/getAccount', (req, res)=> {
    apiAccount(mysql, req, res, 'get')
})
app.post('/api/updateAccount', (req, res)=> {
    apiAccount(mysql, req, res, 'update')
})

// admin
app.post('/api/adminLogin', (req, res)=> {
    apiAdminLogin(mysql, req, res)
})

// admin users accounts
app.post('/api/adminGetUsersAccounts', (req, res)=> {
    apiAdminUsersAccounts(mysql, req, res, 'get')
})
app.post('/api/adminGetUsersAccounts-block', (req, res)=> {
    apiAdminUsersAccounts(mysql, req, res, 'block')
})
app.post('/api/adminGetUsersAccounts-unblock', (req, res)=> {
    apiAdminUsersAccounts(mysql, req, res, 'unblock')
})

// websocket
const httpServer = http.createServer(app);

const socketServer = new WebSocketServer({ server: httpServer })
socketServer.on('connection', (socket, req)=> {

    // default
    const content = {
        sender_id: '',
        chat: '',
        receiver_id: ''
    }
    socket.send(JSON.stringify(content))

    socket.on('message', message => {

        const recieveFromClient = JSON.parse(`${message}`)

        // send to all client
        socketServer.clients.forEach(client => {
            if(recieveFromClient.chat){
                const content = {
                    sender_id: recieveFromClient.sender_id,
                    chat: recieveFromClient.chat,
                    receiver_id: recieveFromClient.receiver_id
                }
                client.send(JSON.stringify(content))
            }
    
        })
    })
})

httpServer.listen(3000)
console.log('app is running')