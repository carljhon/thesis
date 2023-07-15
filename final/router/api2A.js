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

        const d_fname = clientPayload.get('d_fname')
        const d_mname = clientPayload.get('d_mname')
        const d_lname = clientPayload.get('d_lname')
        const gender = clientPayload.get('gender')
        const deathPlace = clientPayload.get('place_of_death')
        const date_of_death = clientPayload.get('date_of_death')
        const mfname = clientPayload.get('m_fname')
        const mmname = clientPayload.get('m_mname')
        const mlname = clientPayload.get('m_lname')
        const mnationality = clientPayload.get('m_nationality')
        const ffname = clientPayload.get('f_fname')
        const fmname = clientPayload.get('f_mname')
        const flname =  clientPayload.get('f_lname')
        const fnationality = clientPayload.get('f_nationality')
        const issuedto = clientPayload.get('issuedto')
        const issuedToId = clientPayload.get('issuedToId')

        var con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "thesis"
        });

        if (option === 'add') {
            con.connect(function(err) {
                if (err) throw err;
                console.log(`ID: ${issuedToId} >> Register for 2A`);


                var sqlcheck = `SELECT EXISTS (SELECT * FROM 2a WHERE d_fname = '${d_fname}' AND d_mname = '${d_mname}' AND d_lname = '${d_lname}' AND gender = '${gender}' AND place_of_death = '${deathPlace}' AND m_fname = '${mfname}' AND m_mname = '${mmname}' AND m_lname = '${mlname}' AND m_nationality = '${mnationality}' AND f_fname = '${ffname}' AND f_mname = '${fmname}' AND f_lname = '${flname}' AND f_nationality = '${fnationality}') AS cnt`
                con.query(sqlcheck, (err, result)=> {

                    if(result[0].cnt == 0){

                        var sql =  "INSERT INTO `2a` (`d_fname`,`d_mname`, `d_lname`, `gender`, `place_of_death`, `date_of_death`, `m_fname`, `m_mname`, `m_lname`, `m_nationality`, `f_fname`, `f_mname`, `f_lname`, `f_nationality`, `issuedto`, `issuedToId`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
                        var value = [d_fname, d_mname, d_lname, gender, deathPlace, date_of_death, mfname, mmname, mlname, mnationality, ffname, fmname, flname, fnationality, issuedto, issuedToId];
                        con.query(sql, value, function (err, result) {
                            if(err){
                                serverPayload = {
                                    success: false,
                                    data: err
                                }
                            } else {
                                var sql1 =  "INSERT INTO `supporting_dox_2a` (`id`,`issued_to_id`) VALUES (?,?)";
                                var valu1 = [result.insertId, issuedToId];
                                con.query(sql1, valu1, function (err) { if(err){ console.log(err) }});
        
                                serverPayload = {
                                    success: true,
                                    data: result
                                }
                                console.log("2A new record")
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
                console.log(`ID: ${issuedToId} >> Get 3A docs`);
                var sql =  `SELECT 2a.id, 2a.d_fname, 2a.d_mname, 2a.d_lname, 2a.gender, 2a.place_of_death, 2a.date_of_death, 2a.m_fname, 2a.m_mname, 2a.m_lname, 2a.m_nationality, 2a.f_fname, 2a.f_mname, 2a.f_lname, 2a.f_nationality, 2a.issuedto, 2a.proced, 2a.schedule, 2a.done, supporting_dox_2a.hospital_certificate, supporting_dox_2a.barangay_certificate, supporting_dox_2a.police_clearance, supporting_dox_2a.valid_id , supporting_dox_2a.valid_id_back 
                
                FROM 2a 
                JOIN supporting_dox_2a 
                ON 2a.issuedToId = ${issuedToId} AND supporting_dox_2a.id = 2a.id`;
                con.query(sql, function (err, result) {
                    if (err) throw err;
                    if (result == ''){
                        console.log('no death certificate')
                        serverPayload = {
                            success: false,
                            message: 'No death Certificate!!'
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

        }  if (option === 'addSupportingDox') {

            const hospital_certificate = clientPayload.get('hospital_certificate')
            const barangay_certificate = clientPayload.get('barangay_certificate')
            const police_clearance = clientPayload.get('police_clearance')
            const valid_id = clientPayload.get('valid_id')
            const valid_id_back = clientPayload.get('valid_id_back')

            con.connect(function(err) {
                if (err) throw err;
                console.log(`ID: ${id} >> Add supporting docs to >>`);
                var sql =  "UPDATE `supporting_dox_2a` SET `hospital_certificate` = '"+ hospital_certificate +"', `barangay_certificate` = '"+ barangay_certificate +"', `police_clearance` = '"+ police_clearance +"', `valid_id` = '"+ valid_id +"', `valid_id_back` = '"+ valid_id_back +"' WHERE `id` =" + id ;
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
                var sql =  "UPDATE `2a` SET `proced` = '"+ proced +"' WHERE `id` = " + id;
                con.query(sql, function (err, result) {
                    if(err){
                        serverPayload = {
                            success: false,
                            data: err
                        }
                    } else {
                        var sql1 = `SELECT account.email
                                    FROM account
                                    JOIN 2a
                                    WHERE 2a.issuedToID = account.id AND 2a.id = ${id}`

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
        } if(option === 'getAll'){
            con.connect(function(err) {
                if (err) throw err;
                console.log(`ID: ${issuedToId} >> Get 1A docs`);
                var sql =  `SELECT 2a.id, 2a.d_fname, 2a.d_mname, 2a.d_lname, 2a.gender, 2a.place_of_death, 2a.date_of_death, 2a.m_fname, 2a.m_mname, 2a.m_lname, 2a.m_nationality, 2a.f_fname, 2a.f_mname, 2a.f_lname, 2a.f_nationality, 2a.issuedto, 2a.proced, 2a.schedule, 2a.done, 
                
                supporting_dox_2a.hospital_certificate, supporting_dox_2a.barangay_certificate, 
                supporting_dox_2a.police_clearance, supporting_dox_2a.valid_id 
                
                FROM 2a 
                JOIN supporting_dox_2a 
                ON supporting_dox_2a.id = 2a.id`;
                con.query(sql, function (err, result) {
                    if (err) throw err;
                    if (result == ''){
                        console.log('no death certificate')
                        serverPayload = {
                            success: false,
                            message: 'No death Certificate!!'
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
                var sql =  "UPDATE `2a` SET `schedule` = '"+ schedule +"' WHERE `id` = " + id;
                con.query(sql, function (err, result) {
                    if(err){
                        serverPayload = {
                            success: false,
                            data: err
                        }
                    } else {
                        var sql1 = `SELECT account.email
                                    FROM account
                                    JOIN 2a
                                    WHERE 2a.issuedToID = account.id AND 2a.id = ${id}`
                        
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
                var sql =  "UPDATE `2a` SET `done` = 'True' WHERE `id` = " + id;
                con.query(sql, function (err, result) {
                    if(err){
                        serverPayload = {
                            success: false,
                            data: err
                        }
                    } else {
                        var sql1 = `SELECT account.email
                                    FROM account
                                    JOIN 2a
                                    WHERE 2a.issuedToID = account.id AND 2a.id = ${id}`

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