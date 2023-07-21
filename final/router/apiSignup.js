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

const ApiSignUp = (mysql, req, res) => {
    req.on('data', data => {
        p = data
    });

    req.on("end", async () => {
        const clientPayload = new URLSearchParams(p.toString())

        const lname = clientPayload.get('lname')
        const fname = clientPayload.get('fname')
        const mname = clientPayload.get('mname')
        const bday = clientPayload.get('bday')
        const gender = clientPayload.get('gender')
        const add = clientPayload.get('add')
        const email = clientPayload.get('email')
        const username = clientPayload.get('username')
        const password = clientPayload.get('pass')
        const phone = clientPayload.get('phone')
        
        // hashing password
        const hashPassword = await bcrypt.hash(password, 10)
        
        var con = mysql.createConnection({
            host: "db4free.net",
            user: "carljhonamasan",
            password: "carljhonamasan",
            database: "thesis0101"
        });

    
        con.connect(function(err) {
            if (err) throw err;
            console.log("Connected!");
            var sql =  "INSERT INTO `account` (`lname`, `fname`, `mname`, `bday`, `gender`, `address`, `email`, `username`, `pass`, `phone`) VALUES (?,?,?,?,?,?,?,?,?,?)";
            var value = [lname, fname, mname, bday, gender, add, email, username, hashPassword, phone];
            con.query(sql, value, function (err, result) {
                if(err){
                    console.log(err)
                    serverPayload = {
                        success: false,
                        message: 'Duplicated Username',
                        message1: 'Create a unique one'
                    }
                } else {
                    serverPayload = {
                        success: true,
                        data: {
                            id: result.insertId
                        }
                    }
                    console.log("1 record inserted")
                }
                PageNotFound(res)
            })
        })
    })
}

module.exports = ApiSignUp