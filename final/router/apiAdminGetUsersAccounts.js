let serverPayload = { success: false }
let p = ''

const PageNotFound = (res) => {
    res.writeHead(200, {
        'content-type': 'application/json'
    })
    res.write(JSON.stringify(serverPayload))
    res.end()
}

const ApiAccounts = (mysql, req, res, option) => {
    req.on('data', data => {
        p = data
    })

    req.on("end", () => {
        const clientPayload = new URLSearchParams(p.toString())

        const id = clientPayload.get('id')

        var con = mysql.createConnection({
            host: "db4free.net",
            user: "carljhonamasan",
            password: "carljhonamasan",
            database: "thesis0101"
        })

        if(option == 'get'){ // get all account
            con.connect(function(err) {
                if (err) throw err;
                console.log("Admin see accounts");
                var sql =  `SELECT * FROM account`;
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
                                result1: result
                            }
                        }
                        
                    }
                    PageNotFound(res)
                })
            })
        } if (option == 'block'){ // block account
            con.connect(function(err) {
                if (err) throw err;
                var sql =  "UPDATE `account` SET `status` = 'block' WHERE `id` = " + id;
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
                            success: true
                        }
                        
                    }
                    PageNotFound(res)
                })
            })
        } if (option == 'unblock'){ // unblock account
            con.connect(function(err) {
                if (err) throw err;
                var sql =  "UPDATE `account` SET `status` = 'unblock' WHERE `id` = " + id;
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
                            success: true
                        }
                        
                    }
                    PageNotFound(res)
                })
            })
        } 
        
    })
}

module.exports = ApiAccounts