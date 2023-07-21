let serverPayload = { success: false }
let p = ''

const PageNotFound = (res) => {
    res.writeHead(200, {
        'content-type': 'application/json'
    })
    res.write(JSON.stringify(serverPayload))
    res.end()
}

const Api2A = (mysql, req, res, option) => {
    req.on('data', data => {
        p = data
    });

    req.on("end", () => {
        const clientPayload = new URLSearchParams(p.toString())

        const id = clientPayload.get('id')


        // husband info
        const h_fname = clientPayload.get('h_fname')
        const h_mname = clientPayload.get('h_mname')
        const h_lname = clientPayload.get('h_lname')
        const h_age = clientPayload.get('h_age')
        const h_nationality = clientPayload.get('h_nationality')
        const h_civilStatus = clientPayload.get('h_civilStatus')
        const h_m_fname = clientPayload.get('h_m_fname') // husband mother firstname
        const h_m_mname = clientPayload.get('h_m_mname')
        const h_m_lname = clientPayload.get('h_m_lname')
        const h_f_fname = clientPayload.get('h_f_fname') // husband father firstname
        const h_f_mname = clientPayload.get('h_f_mname')
        const h_f_lname = clientPayload.get('h_f_lname')

        // wife info
        const w_fname = clientPayload.get('w_fname')
        const w_mname = clientPayload.get('w_mname')
        const w_lname = clientPayload.get('w_lname')
        const w_age = clientPayload.get('w_age')
        const w_nationality = clientPayload.get('w_nationality')
        const w_civilStatus = clientPayload.get('w_civilStatus')
        const w_m_fname = clientPayload.get('w_m_fname') // wife mother firstname
        const w_m_mname = clientPayload.get('w_m_mname')
        const w_m_lname = clientPayload.get('w_m_lname')
        const w_f_fname = clientPayload.get('w_f_fname') // wife father firstname
        const w_f_mname = clientPayload.get('w_f_mname')
        const w_f_lname = clientPayload.get('w_f_lname')

        const date_of_registration = clientPayload.get('date_of_registration')
        const date_of_marriage = clientPayload.get('date_of_marriage')
        const place_of_marriage = clientPayload.get('place_of_marriage')

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
                console.log(`ID: ${issuedToId} >> Register for 2A`);

                var sqlcheck = `SELECT EXISTS (SELECT * FROM 3a WHERE h_fname = '${h_fname}' AND h_mname = '${h_mname}' AND h_lname = '${h_lname}' AND h_age = '${h_age}' AND h_nationality = '${h_nationality}' AND h_civil_status = '${h_civilStatus}' AND h_f_fname = '${h_f_fname}' AND h_f_mname = '${h_f_mname}' AND h_f_lname = '${h_f_lname}' AND h_m_fname = '${h_m_fname}' AND h_m_mname = '${h_m_mname}' AND h_m_lname = '${h_m_lname}' AND w_fname = '${w_fname}' AND w_mname = '${w_mname}' AND w_lname = '${w_lname}' AND w_age = '${w_age}' AND w_nationality = '${w_nationality}' AND w_civil_status = '${w_civilStatus}' AND w_f_fname = '${w_f_fname}' AND w_f_mname = '${w_f_mname}' AND w_f_lname = '${w_f_lname}' AND w_m_fname = '${w_m_fname}' AND w_m_mname = '${w_m_mname}' AND w_m_lname = '${w_m_lname}' AND  place_of_marriage = '${place_of_marriage}') AS cnt`
                
                con.query(sqlcheck, (err, result)=> {

                    if(result[0].cnt == 0){
                        
                        var sql =  "INSERT INTO `3a` (`h_fname`, `h_mname`, `h_lname`, `h_age`, `h_nationality`, `h_civil_status`, `h_f_fname`, `h_f_mname`, `h_f_lname`, `h_m_fname`, `h_m_mname`, `h_m_lname`, `w_fname`, `w_mname`, `w_lname`, `w_age`, `w_nationality`, `w_civil_status`, `w_f_fname`, `w_f_mname`, `w_f_lname`, `w_m_fname`, `w_m_mname`, `w_m_lname`, `date_of_registration`, `date_of_marriage`, `place_of_marriage`, `issued_to`, `issued_to_id`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
                        var value = [h_fname, h_mname, h_lname, h_age, h_nationality, h_civilStatus, h_f_fname, h_f_mname, h_f_lname, h_m_fname, h_m_mname, h_m_lname, w_fname, w_mname, w_lname, w_age, w_nationality, w_civilStatus, w_f_fname, w_f_mname, w_f_lname, w_m_fname, w_m_mname, w_m_lname, date_of_registration, date_of_marriage, place_of_marriage, issuedto, issuedToId];
                        con.query(sql, value, function (err, result) {
                            if(err){
                                serverPayload = {
                                    success: false,
                                    data: err
                                }
                            } else {
                                var sql1 =  "INSERT INTO `supporting_dox_3a` (`id`,`issued_to_id`) VALUES (?,?)";
                                var valu1 = [result.insertId, issuedToId];
                                con.query(sql1, valu1, function (err) { if(err){ console.log(err) }});
        
                                serverPayload = {
                                    success: true,
                                    data: result
                                }
                                console.log("3A new record")
                            }
                            PageNotFound(res)
                        })

                    }else {
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
                console.log(`ID: ${issuedToId} >> Get 2A docs`);
                var sql =  `SELECT 3a.id, 3a.h_fname, 3a.h_mname, 3a.h_lname, 3a.h_age, 3a.h_nationality, 3a.h_civil_status, 3a.h_f_fname, 3a.h_f_mname, 3a.h_f_lname, 3a.h_m_fname, 3a.h_m_mname, 3a.h_m_lname, 3a.w_fname, 3a.w_mname, 3a.w_lname, 3a.w_age, 3a.w_nationality, 3a.w_civil_status, 3a.w_f_fname, 3a.w_f_mname, 3a.w_f_lname, 3a.w_m_fname, 3a.w_m_mname, 3a.w_m_lname, 3a.date_of_registration, 3a.date_of_marriage, 3a.place_of_marriage, 3a.issued_to, 
                3a.schedule, 3a.proced, 3a.done, 
                
                supporting_dox_3a.h_birth_certificate, supporting_dox_3a.h_cenomar, supporting_dox_3a.h_cedula, 
                supporting_dox_3a.h_barangay_certificate, supporting_dox_3a.h_valid_id, supporting_dox_3a.h_valid_id_back,
                supporting_dox_3a.w_birth_certificate, supporting_dox_3a.w_cenomar, supporting_dox_3a.w_cedula, 
                supporting_dox_3a.w_barangay_certificate, supporting_dox_3a.w_valid_id , supporting_dox_3a.w_valid_id_back
                
                FROM 3a 
                JOIN supporting_dox_3a 
                ON 3a.issued_to_id = ${issuedToId} AND supporting_dox_3a.id = 3a.id`;
                con.query(sql, function (err, result) {
                    if (err) throw err;
                    if (result == ''){
                        console.log('no marriage certificate')
                        serverPayload = {
                            success: false,
                            message: 'No Marriage Certificate!!'
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

            const h_birth_certificate = clientPayload.get('h_birth_certificate')
            const h_cenomar = clientPayload.get('h_cenomar')
            const h_cedula = clientPayload.get('h_cedula')
            const h_barangay_certificate = clientPayload.get('h_barangay_certificate')
            const h_valid_id = clientPayload.get('h_valid_id')
            const h_valid_id_back = clientPayload.get('h_valid_id_back')

            const w_birth_certificate = clientPayload.get('w_birth_certificate')
            const w_cenomar = clientPayload.get('w_cenomar')
            const w_cedula = clientPayload.get('w_cedula')
            const w_barangay_certificate = clientPayload.get('w_barangay_certificate')
            const w_valid_id = clientPayload.get('w_valid_id')
            const w_valid_id_back = clientPayload.get('w_valid_id_back')

            con.connect(function(err) {
                if (err) throw err;
                console.log(`ID: ${id} >> Add supporting docs to >>`);
                var sql =  "UPDATE `supporting_dox_3a` SET `h_birth_certificate` = '"+ h_birth_certificate +"', `h_cenomar` = '"+ h_cenomar +"', `h_cedula` = '"+ h_cedula +"', `h_barangay_certificate` = '"+ h_barangay_certificate +"', `h_valid_id` = '"+ h_valid_id +"',`h_valid_id_back` = '"+ h_valid_id_back +"', `w_birth_certificate` = '"+ w_birth_certificate +"', `w_cenomar` = '"+ w_cenomar +"', `w_cedula` = '"+ w_cedula +"', `w_barangay_certificate` = '"+ w_barangay_certificate +"', `w_valid_id` = '"+ w_valid_id +"', `w_valid_id_back` = '"+ w_valid_id_back +"' WHERE `id` = " + id;
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
                var sql =  "UPDATE `3a` SET `proced` = '"+ proced +"' WHERE `id` = " + id;
                con.query(sql, function (err, result) {
                    if(err){
                        serverPayload = {
                            success: false,
                            data: err
                        }
                    } else {
                        var sql1 = `SELECT account.email
                                    FROM account
                                    JOIN 3a
                                    WHERE 3a.issuedToID = account.id AND 3a.id = ${id}`

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
                console.log(`ID: ${issuedToId} >> Get 2A docs`);
                var sql =  `SELECT 3a.id, 3a.h_fname, 3a.h_mname, 3a.h_lname, 3a.h_age, 3a.h_nationality, 3a.h_civil_status, 3a.h_f_fname, 3a.h_f_mname, 3a.h_f_lname, 3a.h_m_fname, 3a.h_m_mname, 3a.h_m_lname, 3a.w_fname, 3a.w_mname, 3a.w_lname, 3a.w_age, 3a.w_nationality, 3a.w_civil_status, 3a.w_f_fname, 3a.w_f_mname, 3a.w_f_lname, 3a.w_m_fname, 3a.w_m_mname, 3a.w_m_lname, 3a.date_of_registration, 3a.date_of_marriage, 3a.place_of_marriage, 3a.issued_to, 
                3a.schedule, 3a.proced, 3a.done, 
                
                supporting_dox_3a.h_birth_certificate, supporting_dox_3a.h_cenomar, supporting_dox_3a.h_cedula, 
                supporting_dox_3a.h_barangay_certificate, supporting_dox_3a.h_valid_id, 
                supporting_dox_3a.w_birth_certificate, supporting_dox_3a.w_cenomar, supporting_dox_3a.w_cedula, 
                supporting_dox_3a.w_barangay_certificate, supporting_dox_3a.w_valid_id 
                
                FROM 3a 
                JOIN supporting_dox_3a 
                ON supporting_dox_3a.id = 3a.id`;
                con.query(sql, function (err, result) {
                    if (err) throw err;
                    if (result == ''){
                        console.log('no marriage certificate')
                        serverPayload = {
                            success: false,
                            message: 'No marriage Certificate!!'
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
                var sql =  "UPDATE `3a` SET `schedule` = '"+ schedule +"' WHERE `id` = " + id;
                con.query(sql, function (err, result) {
                    if(err){
                        serverPayload = {
                            success: false,
                            data: err
                        }
                    } else {
                        var sql1 = `SELECT account.email
                                    FROM account
                                    JOIN 3a
                                    WHERE 3a.issuedToID = account.id AND 3a.id = ${id}`
                        
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
                var sql =  "UPDATE `3a` SET `done` = 'True' WHERE `id` = " + id;
                con.query(sql, function (err, result) {
                    if(err){
                        serverPayload = {
                            success: false,
                            data: err
                        }
                    } else {
                        var sql1 = `SELECT account.email
                                    FROM account
                                    JOIN 3a
                                    WHERE 3a.issuedToID = account.id AND 3a.id = ${id}`

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

module.exports = Api2A