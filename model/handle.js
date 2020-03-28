const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const sql = require("mssql");
const config = {
    user: 'sa',
    password: 'P@d0rU123',
    server: '167.71.200.91',
    database: 'Padoru'
};

const err = sql.connect(config)
if (err) console.log(err);
app.use(bodyParser.json());

class Covids{
    async showPatients(req){
        return new Promise(async function (resolve, reject) {
            try {
                var request = new sql.Request();
                var message = ""
                var statusCode = 0
                var total_patient = `SELECT P.HNID,Firstname,Lastname,Status FROM farDB.dbo.PATIENTS P , farDB.dbo.PATIENT_COVID_STATUS S
                WHERE P.HNID = S.HNID AND S.Status = 'Positive' `
                var result = await request.query(total_patient)
                console.log(result.recordset)
                message = {
                    message : result.recordset,
                    statusCode : 200
                }
                resolve(message)
            }
            catch (err){
                let  messageError = {message: err.message || ` CREATE failed [Error] ${err}`,
                statusCode: err.statusCode || 500}
                reject(messageError)
            }
        })
}

async numtotalPatients(req){
    return new Promise(async function (resolve, reject) {
        try {
            var request = new sql.Request();
            var message = ""
            var statusCode = 0
            var numtotal_patient = `SELECT H.HID, COUNT(*) as count  FROM farDB.dbo.PATIENTS P , farDB.dbo.PATIENT_COVID_STATUS S,
            farDB.dbo.HOSPITALS H
            WHERE P.HNID = S.HNID  AND  Status = 'Positive' AND H.HID = P.HID 
            GROUP BY H.HID
            ORDER BY H.HID`
            var result = await request.query(numtotal_patient)
            

            message = {
                message : result.recordset
                ,statusCode : 200
            }
            resolve(message)
        }
        catch (err){
            let  messageError = {message: err.message || ` CREATE failed [Error] ${err}`,
            statusCode: err.statusCode || 500}
            reject(messageError)
        }
    })
}

async Rankcovid(req){
    return new Promise(async function (resolve, reject) {
        try {
            var request = new sql.Request();
            var message = ""
            var statusCode = 0
            var rank_patient = `SELECT H.HID FROM farDB.dbo.PATIENTS P , farDB.dbo.PATIENT_COVID_STATUS S,
            farDB.dbo.HOSPITALS H
            WHERE P.HNID = S.HNID  AND  Status = 'Positive' AND H.HID = P.HID 
            GROUP BY H.HID
            ORDER BY COUNT(*) DESC `
            var result = await request.query(rank_patient)
            console.log(result.recordset)
            message = {
                message : result.recordset,
                statusCode : 200
            }
            resolve(message)
        }
        catch (err){
            let  messageError = {message: err.message || ` CREATE failed [Error] ${err}`,
            statusCode: err.statusCode || 500}
            reject(messageError)
        }
    })
}

}
module.exports = Covids