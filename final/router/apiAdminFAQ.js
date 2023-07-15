let serverPayload = { success: false }
let p = ''

const PageNotFound = (res) => {
    res.writeHead(200, {
        'content-type': 'application/json'
    })
    res.write(JSON.stringify(serverPayload))
    res.end()
}

const ApiFAQ = (mysql, req, res, option) => {
    req.on('data', data => {
        p = data
    });

    req.on("end", () => {
        const clientPayload = new URLSearchParams(p.toString())

        const question = clientPayload.get('question')
        const answer = clientPayload.get('answer')
        const id = clientPayload.get('id')

        var con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "thesis"
        });

        if(option == 'delete'){ // delete
            con.connect(function(err) {
                if (err) throw err;
                var sql = `DELETE FROM faq WHERE id = ${id}`;
                con.query(sql, function (err, result) {
                    if(err){
                        console.log(err)
                        serverPayload = {
                            success: false
                        }
                    } else {
                        serverPayload = {
                            success: true,
                            data: {
                                result1: result
                            }
                        }
                        console.log(`FAQ delete id:${id}`)
                    }
                    PageNotFound(res)
                })
            })
        }

        if(option == 'edit'){ // edit
            con.connect(function(err) {
                if (err) throw err;
                var sql =  "UPDATE `faq` SET `question` = '"+ question + "', `answer` = '"+ answer +"' WHERE `id` = "+ id;

                con.query(sql, function (err, result) {
                    if(err){
                        console.log(err)
                        serverPayload = {
                            success: false
                        }
                    } else {
                        serverPayload = {
                            success: true,
                            data: {
                                result1: result
                            }
                        }
                        console.log("FAQ updated id:" + id)
                    }
                    PageNotFound(res)
                })
            })
        }
    
        if(option == 'add'){ // add
            con.connect(function(err) {
                if (err) throw err;
                var sql =  "INSERT INTO `faq` (`question`, `answer`) VALUES (?,?)";
                var value = [question, answer];
                con.query(sql, value, function (err, result) {
                    if(err){
                        console.log(err)
                        serverPayload = {
                            success: false
                        }
                    } else {
                        serverPayload = {
                            success: true,
                            data: {
                                result1: result
                            }
                        }
                        console.log("FAQ inserted 1")
                    }
                    PageNotFound(res)
                })
            })
        }

        if(option == 'get'){ // get
            con.connect(function(err) {
                if (err) throw err;
                var sql = `SELECT * FROM faq`;
                con.query(sql, function (err, result) {
                    if(err){
                        console.log(err)
                        serverPayload = {
                            success: false
                        }
                    } else {
                        serverPayload = {
                            success: true,
                            data: {
                                result1: result
                            }
                        }
                        console.log("FAQ get")
                    }
                    PageNotFound(res)
                })
            })
        }
    })
}

module.exports = ApiFAQ