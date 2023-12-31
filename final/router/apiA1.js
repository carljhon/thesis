const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'carljhonamasan01@gmail.com',
        pass: 'shhmvlnnoeovlflu'
    }
})


let serverPayload = { success: false }
let p = ''

const PageNotFound = (res) => {
    res.writeHead(200, {
        'content-type': 'application/json'
    })
    res.write(JSON.stringify(serverPayload))
    res.end()
}

const ApiA1 = (mysql, req, res, option) => {
    req.on('data', data => {
        p = data
    });

    req.on("end", () => {
        const clientPayload = new URLSearchParams(p.toString())

        const id = clientPayload.get('id')

        const cfname = clientPayload.get('c_fname')
        const cmname = clientPayload.get('c_mname')
        const clname = clientPayload.get('c_lname')
        const gender = clientPayload.get('gender')
        const birthPlace = clientPayload.get('place_of_birth')
        const birthday = clientPayload.get('birthday')
        const registrationDate = clientPayload.get('date_of_registration')
        const mfname = clientPayload.get('m_fname')
        const mmname = clientPayload.get('m_mname')
        const mlname = clientPayload.get('m_lname')
        const mnationality = clientPayload.get('m_nationality')
        const ffname = clientPayload.get('f_fname')
        const fmname = clientPayload.get('f_mname')
        const flname =  clientPayload.get('f_lname')
        const fnationality = clientPayload.get('f_nationality')
        const merriageDate = clientPayload.get('date_of_merriage')
        const merriagePlace = clientPayload.get('place_of_merriage')
        const issuedto = clientPayload.get('issuedto')
        const issuedToId = clientPayload.get('issuedToId')

        var con = mysql.createConnection({
            host: "db4free.net",
            user: "carljhonamasan",
            password: "carljhonamasan",
            database: "thesis0101"
        });

        if (option === 'add') {
            con.connect(function(err) {
                if (err) throw err;
                console.log(`ID: ${issuedToId} >> Register for 1A`);

                // check for existence
                var sqlcheck = `SELECT EXISTS (SELECT * FROM 1a WHERE child_fname = '${cfname}' AND child_mname = '${cmname}' AND child_lname = '${clname}' AND gender = '${gender}' AND place_of_birth = '${birthPlace}' AND m_fname = '${mfname}' AND m_mname = '${mmname}' AND m_lname = '${mlname}' AND m_nationality = '${mnationality}' AND f_fname = '${ffname}' AND f_mname = '${fmname}' AND f_lname = '${flname}' AND f_nationality = '${fnationality}' AND date_of_merriage = '${merriageDate}' AND place_of_merriage = '${merriagePlace}') AS cnt`
                con.query(sqlcheck, function(err, result){
                    if(result[0].cnt == 0){
                        // insertion
                        var sql =  "INSERT INTO `1a` (`child_fname`,`child_mname`, `child_lname`, `gender`, `place_of_birth`, `birthday`, `date_of_registration`, `m_fname`, `m_mname`, `m_lname`, `m_nationality`, `f_fname`, `f_mname`, `f_lname`, `f_nationality`, `date_of_merriage`, `place_of_merriage`, `issuedto`, `issuedToId`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
                        var value = [cfname, cmname, clname, gender, birthPlace, birthday, registrationDate, mfname, mmname, mlname, mnationality, ffname, fmname, flname, fnationality, merriageDate, merriagePlace, issuedto, issuedToId];
                        con.query(sql, value, function (err, result) {
                            if(err){
                                serverPayload = {
                                    success: false,
                                    data: err
                                }
                            } else {
                                var sql1 =  "INSERT INTO `supporting_dox_1a` (`id`,`issued_to_id`) VALUES (?,?)";
                                var valu1 = [result.insertId, issuedToId];
                                con.query(sql1, valu1, function (err) { if(err){ console.log(err) }});
        
                                serverPayload = {
                                    success: true,
                                    data: result
                                }
                                console.log("1A new record")
                            }
                            PageNotFound(res)
                        })

                    } else {
                        serverPayload = {
                            success: false,
                            message: 'duplicated'
                        }
                        PageNotFound(res)
                    }
                })


            })
        } if(option === 'get'){
            con.connect(function(err) {
                if (err) throw err;
                console.log(`ID: ${issuedToId} >> Get 1A docs`);
                var sql =  `SELECT 1a.id, 1a.child_fname, 1a.child_mname, 1a.child_lname, 1a.gender, 
                1a.place_of_birth, 1a.date_of_registration, 1a.m_fname, 1a.m_mname, 1a.m_lname, 
                1a.m_nationality, 1a.f_fname, 1a.f_mname, 1a.f_lname, 1a.f_nationality, 
                1a.date_of_merriage, 1a.place_of_merriage, 1a.issuedto, 1a.schedule, 1a.proced, 1a.done, 

                supporting_dox_1a.live_birth_certificate, supporting_dox_1a.valid_id, supporting_dox_1a.valid_id_back 
                
                FROM 1a 
                JOIN supporting_dox_1a 
                ON 1a.issuedToID = ${issuedToId} AND supporting_dox_1a.id = 1a.id`;
                con.query(sql, function (err, result) {
                    if (err) throw err;
                    if (result == ''){
                        console.log('no birth certificate')
                        serverPayload = {
                            success: false,
                            message: 'No birth Certificate!!'
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

        } if (option === 'addSupportingDox') {

            const valid_id = clientPayload.get('valid_id')
            const valid_id_back = clientPayload.get('valid_id_back')
            const live_birth_certificate = clientPayload.get('live_birth_certificate')

            con.connect(function(err) {
                if (err) throw err;
                console.log(`ID: ${id} >> Add supporting docs to >>`);
                var sql =  "UPDATE `supporting_dox_1a` SET `live_birth_certificate` = '"+ live_birth_certificate +"', `valid_id` = '"+ valid_id +"', `valid_id_back` = '"+ valid_id_back +"' WHERE `id` =" + id ;
                con.query(sql, function (err, result) {
                    if(err){
                        serverPayload = {
                            success: false,
                            data: err
                        }
                    } else {
                        serverPayload = {
                            success: true,
                            data: result
                        }
                        console.log(`ID: ${id} is Updated`)
                    }
                    PageNotFound(res)
                })
            })
        } if (option === 'sendProced') {

            const proced = clientPayload.get('proced')

            con.connect(function(err) {
                if (err) throw err;
                console.log(`ID: ${id} >> Proced... `);
                var sql =  "UPDATE `1a` SET `proced` = '"+ proced +"' WHERE `id` = " + id;
                con.query(sql, function (err, result) {
                    if(err){
                        serverPayload = {
                            success: false,
                            data: err
                        }
                    } else {

                        var sql1 = `SELECT account.email
                                    FROM account
                                    JOIN 1a
                                    WHERE 1a.issuedToID = account.id AND 1a.id = ${id}`

                        con.query(sql1, (err, result)=> {
                            if(proced == 'Reject'){
                                // send gmail notification
                                const mailOptions = {
                                    from: 'carljhonamasan01@gmail.com',
                                    to: result[0].email,
                                    subject: 'SORRY YOUR REQUEST IS REJECTED',
                                    text: 'Ang iyong request ay tinanggihan ng admin, kung ikaw ay may katanungan maari mong i chat ang admin, gamit ang ONLINE LCR APPLICATION'
                                }
                                transporter.sendMail(mailOptions, (err, info)=> {
                                    if(err){
                                        console.log(err)
                                    } else {
                                        console.log('Email sent: ' + info.response)
                                    }
                                })
                            }

                            if(proced == 'WrongDox'){
                                // send gmail notification
                                const mailOptions = {
                                    from: 'carljhonamasan01@gmail.com',
                                    to: result[0].email,
                                    subject: 'SORRY YOUR REQUEST HAS SOME WRONG DOCUMENTS',
                                    text: 'Ang iyong request ay ibinalik ng admin, kung ikaw ay may katanungan maari mong i chat ang admin, gamit ang ONLINE LCR APPLICATION'
                                }
                                transporter.sendMail(mailOptions, (err, info)=> {
                                    if(err){
                                        console.log(err)
                                    } else {
                                        console.log('Email sent: ' + info.response)
                                    }
                                })
                            }

                            if(proced == 'Expired'){
                                // send gmail notification
                                const mailOptions = {
                                    from: 'carljhonamasan01@gmail.com',
                                    to: result[0].email,
                                    subject: 'SORRY YOUR REQUEST HAS BEEN EXPIRED',
                                    text: 'Ang iyong request ay nag expired na, kung ikaw ay may katanungan maari mong i chat ang admin, gamit ang ONLINE LCR APPLICATION'
                                }
                                transporter.sendMail(mailOptions, (err, info)=> {
                                    if(err){
                                        console.log(err)
                                    } else {
                                        console.log('Email sent: ' + info.response)
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
        } if (option === 'getAll'){
            con.connect(function(err) {
                if (err) throw err;
                console.log(`ID: ${issuedToId} >> Get 1A docs`);
                var sql =  `SELECT 1a.id, 1a.child_fname, 1a.child_mname, 1a.child_lname, 1a.gender, 
                1a.place_of_birth, 1a.date_of_registration, 1a.m_fname, 1a.m_mname, 1a.m_lname, 
                1a.m_nationality, 1a.f_fname, 1a.f_mname, 1a.f_lname, 1a.f_nationality, 
                1a.date_of_merriage, 1a.place_of_merriage, 1a.issuedto, 1a.schedule, 1a.proced, 1a.done, 

                supporting_dox_1a.live_birth_certificate, supporting_dox_1a.valid_id , supporting_dox_1a.valid_id_back 
                
                FROM 1a 
                JOIN supporting_dox_1a 
                ON supporting_dox_1a.id = 1a.id` ;
                con.query(sql, function (err, result) {
                    if (err) throw err;
                    if (result == ''){
                        console.log('no birth certificate')
                        serverPayload = {
                            success: false,
                            message: 'No birth Certificate!!'
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

        } if (option === 'setSchedule') {

            const schedule = clientPayload.get('schedule')

            con.connect(function(err) {
                if (err) throw err;
                console.log(`ID: ${id} >> approve and setting schedule >>`);
                var sql =  "UPDATE `1a` SET `schedule` = '"+ schedule +"' WHERE `id` = " + id;
                con.query(sql, function (err, result) {
                    if(err){
                        serverPayload = {
                            success: false,
                            data: err
                        }
                    } else {

                        var sql1 = `SELECT account.email
                                    FROM account
                                    JOIN 1a
                                    WHERE 1a.issuedToID = account.id AND 1a.id = ${id}`
                        
                        con.query(sql1, (err, result)=> {
                            // send gmail notification
                            const mailOptions = {
                                from: 'carljhonamasan01@gmail.com',
                                to: result[0].email,
                                subject: 'YOUR REQUEST IS NOW APPROVED',
                                text: 'Salamat sa pag-aantay, maari ka na ngayong pumunta sa LCR upang i proseso ang iyong dokumento'
                            }
                            transporter.sendMail(mailOptions, (err, info)=> {
                                if(err){
                                    console.log(err)
                                } else {
                                    console.log('Email sent: ' + info.response)
                                }
                            })
                        })

                        serverPayload = {
                            success: true,
                            data: result
                        }
                    }
                    PageNotFound(res)
                })
            })
        } if (option === 'done') {
            
            con.connect(function(err) {
                if (err) throw err;
                console.log(`ID: ${id} >> Proced... `);
                var sql =  "UPDATE `1a` SET `done` = 'True' WHERE `id` = " + id;
                con.query(sql, function (err, result) {
                    if(err){
                        serverPayload = {
                            success: false,
                            data: err
                        }
                    } else {
                        var sql1 = `SELECT account.email
                                    FROM account
                                    JOIN 1a
                                    WHERE 1a.issuedToID = account.id AND 1a.id = ${id}`

                        con.query(sql1, (err, result)=> {
                            // send gmail notification
                            const mailOptions = {
                                from: 'carljhonamasan01@gmail.com',
                                to: result[0].email,
                                subject: 'YOUR REQUEST IS COMPLETED',
                                text: 'Ang iyong request ay tapos na'
                            }
                            transporter.sendMail(mailOptions, (err, info)=> {
                                if(err){
                                    console.log(err)
                                } else {
                                    console.log('Email sent: ' + info.response)
                                }
                            })
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

module.exports = ApiA1