const bcrypt = require('bcrypt')

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

    req.on("end", async () => {
        const clientPayload = new URLSearchParams(p.toString())

        const username = clientPayload.get('username')
        const password = clientPayload.get('pass')

        // for update account
        const lname = clientPayload.get('lname')
        const fname = clientPayload.get('fname')
        const mname = clientPayload.get('mname')
        const bday = clientPayload.get('bday')
        const gender = clientPayload.get('gender')
        const address = clientPayload.get('add')
        const email = clientPayload.get('email')
        const contact = clientPayload.get('phone')
        const userId = clientPayload.get('id')

        // hashing password
        const hashPassword = await bcrypt.hash(password, 10)

        var con = mysql.createConnection({
            host: "db4free.net",
            user: "carljhonamasan",
            password: "carljhonamasan",
            database: "thesis0101"
        })

        if(option == 'get'){ // get account
            con.connect(function(err) {
                if (err) throw err;
                console.log("Connected!");
                var sql =  `SELECT * FROM account WHERE username = '${username}'`;
                con.query(sql, async function(err, result) {
                    if (err) throw err;
                    if (result == ''){
                        console.log('no account')
                        serverPayload = {
                            success: false,
                            message: 'no account'
                        }
                    } else {
                        if(await bcrypt.compare(password, result[0].pass)){
                            serverPayload = {
                                success: true,
                                data: {
                                    username: result[0].username,
                                    password: password,
                                    fname: result[0].fname,
                                    mname: result[0].mname,
                                    lname: result[0].lname,
                                    bday: result[0].bday,
                                    gender: result[0].gender,
                                    address: result[0].address,
                                    email: result[0].email,
                                    contact: result[0].phone
                                }
                            }
                        } else {
                            console.log('no account')
                            serverPayload = {
                                success: false,
                                message: 'no account'
                            }
                        }
                    }
                    PageNotFound(res)
                })
            })
        } 
        
        if(option == 'update'){ // update account

            con.connect(function(err) {
                if (err) throw err;
                console.log(`ID:${userId} => update account`);

                var sql =  "UPDATE `account` SET `lname`='"+lname+"', `fname`='"+fname+"', `mname`='"+mname+"', `bday`='"+bday+"', `gender`='"+gender+"', `address`='"+address+"', `email`='"+email+"', `pass`='"+hashPassword+"', `phone`='"+contact+"' WHERE `id`='"+userId+"'";

                con.query(sql, function(err, result) {
                    if (err) throw err;
                    if (result == ''){
                        console.log('no account')
                        serverPayload = {
                            success: false,
                            message: 'no account'
                        }
                    } else {
                        serverPayload = {
                            success: true,
                            data: {
                                result1: result,
                                updatePass: password,
                                fullname: `${fname} ${mname} ${lname}`
                            }
                        }
                    }
                    PageNotFound(res)
                })
            })
        }
    })
}

module.exports = ApiAccount