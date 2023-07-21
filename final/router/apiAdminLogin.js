let serverPayload = { success: false }
let p = ''

const PageNotFound = (res) => {
    res.writeHead(200, {
        'content-type': 'application/json'
    })
    res.write(JSON.stringify(serverPayload))
    res.end()
}

const ApiLogin = (mysql, req, res) => {
    req.on('data', data => {
        p = data
    })

    req.on("end", () => {
        const clientPayload = new URLSearchParams(p.toString())

        const username = clientPayload.get('username')
        const password = clientPayload.get('pass')

        var con = mysql.createConnection({
            host: "db4free.net",
            user: "carljhonamasan",
            password: "carljhonamasan",
            database: "thesis0101"
        })

        con.connect(function(err) {
            if (err) throw err;
            var sql =  `SELECT * FROM admin WHERE username = '${username}' AND password = '${password}' `;
            con.query(sql, function(err, result) {
                if (err) throw err;
                if (result == ''){
                    console.log('no account')
                    serverPayload = {
                        success: false,
                        message: 'no account'
                    }
                } else {
                    console.log(`Connected >> ID:${result[0].id}`);
                    serverPayload = {
                        success: true,
                        data: {
                            id: result[0].id
                        }
                    }
                }
                PageNotFound(res)
            })
        })
    })
}

module.exports = ApiLogin