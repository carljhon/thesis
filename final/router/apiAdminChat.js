let serverPayload = { success: false }
let p = ''

const PageNotFound = (res) => {
    res.writeHead(200, {
        'content-type': 'application/json'
    })
    res.write(JSON.stringify(serverPayload))
    res.end()
}

const ApiAccount = (mysql, req, res, option) => {
    req.on('data', data => {
        p = data
    })

    req.on("end", () => {
        const clientPayload = new URLSearchParams(p.toString())

        const sender_id = clientPayload.get('sender_id')
        const message = clientPayload.get('message')
        const message_date = clientPayload.get('message_date')
        const receiver_id = clientPayload.get('receiver_id')
        const username = clientPayload.get('username')

        var con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "thesis"
        })

        if(option == 'adminChatList'){ // receive chat
            con.connect(function(err) {
                if (err) throw err;
                console.log(`ID: admin => receive chat`);
                var sql =  `SELECT * FROM chat_list`;
                con.query(sql, function(err, result) {
                    if (err) throw err;
                    if (result == ''){
                        serverPayload = {
                            success: false,
                            message: 'no message'
                        }
                    } else {
                        serverPayload = {
                            success: true,
                            data: result
                        }
                    }
                    PageNotFound(res)
                })
            })
        } 

        if(option == 'receive'){
            con.connect(function(err) {
                if (err) throw err;
                console.log(`ID:${sender_id} => receive chat`);
                var sql =  `SELECT * 
                            FROM chat 
                            WHERE receiver_id = ${receiver_id} AND sender_id = ${sender_id} OR receiver_id = ${sender_id} AND sender_id = ${receiver_id}`;
                con.query(sql, function(err, result) {
                    if (err) throw err;
                    if (result == ''){
                        serverPayload = {
                            success: false,
                            message: 'no message'
                        }
                    } else {
                        serverPayload = {
                            success: true,
                            data: result
                        }
                    }
                    PageNotFound(res)
                })
            })
        }

        if(option == 'adminSendChat'){
            con.connect(function(err) {
                if (err) throw err;
                console.log(`ID:${sender_id} => send chat`);

                var sql =  "INSERT INTO `chat` (`sender_id`, `message`, `message_date`, `receiver_id`) VALUES (?,?,?,?)";
                var value = [sender_id, message, message_date, receiver_id];

                con.query(sql, value, function(err, result) {
                    if (err) throw err;
                    if (result == ''){
                        serverPayload = {
                            success: false,
                            message: 'no account'
                        }
                    } else {
                        serverPayload = {
                            success: true,
                            data: result
                        }
                    }
                    PageNotFound(res)
                })
            })
        }
        
        if(option == 'send'){ // send chat

            con.connect(function(err) {
                if (err) throw err;
                console.log(`ID:${sender_id} => send chat`);

                var sql =  "INSERT INTO `chat` (`sender_id`, `message`, `message_date`, `receiver_id`) VALUES (?,?,?,?)";
                var value = [sender_id, message, message_date, receiver_id];

                con.query(sql, value, function(err, result) {
                    if (err) throw err;
                    if (result == ''){
                        serverPayload = {
                            success: false,
                            message: 'no account'
                        }
                    } else { // if success add info in to chat list table
                        var sql1 =  "INSERT INTO `chat_list` (`sender_id`, `message`, `username`) VALUES (?,?,?)";
                        var value1 = [sender_id, message, username];

                        con.query(sql1, value1, (err, result)=> {
                            if(err){ // if duplicate then update
                                var sql2 =  "UPDATE `chat_list` SET `message` = '"+ message +"' WHERE `sender_id` = '"+ sender_id +"'";

                                con.query(sql2, (err, result)=> {
                                    if(err){
                                        console.log(err.code)
                                    }
                                })
                            }
                        })

                        serverPayload = {
                            success: true,
                            data: result
                        }
                    }
                    PageNotFound(res)
                })
            })
        }
    })
}

module.exports = ApiAccount