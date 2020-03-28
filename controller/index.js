const express = require('express')
const app = express()
const covid = require('../model/handle')

app.post('/datapatients',async(req,res)=>{
    try{
         var total_patients = await new covid().showPatients(req.body)
         res.json(total_patients);
    }
     catch(error){
         res.send(error)
     }
 })

 app.post('/totalpatients',async(req,res)=>{
    try{
         var numtotal_patients = await new covid().numtotalPatients(req.body)
         res.json(numtotal_patients);
    }
     catch(error){
         res.send(error)
     }
 })

 app.post('/rankpatients',async(req,res)=>{
    try{
         var rank_patients = await new covid().Rankcovid(req.body)
         res.json(rank_patients);
    }
     catch(error){
         res.send(error)
     }
 })

 

module.exports = app