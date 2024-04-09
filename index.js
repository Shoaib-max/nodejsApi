const express = require("express");

const mongoose = require("./config/mongoConfig");
const Doctor = require("./model/doctors");
const appointment = require("./model/appointment")
const axios = require("axios")
const revenue = require("./model/revenue")

const app = express();
app.use(express.json());

app.get("/" , (req,res)=>{
    res.send({"data" : "api is running"});
})

// doctor booking appointment api
app.post("/bookingSlot" , async(req,res)=>{
    const data = req.body;
    console.log(data)

   const detail = new Doctor({
    name :data.name,
    docId : data.docId
   });
    console.log(detail)
    try{

        await detail.save();

    } catch(err){
        console.log(err);
    }

    res.status(201).send({detail})

})

// api for appointment

app.post("/appointment",async(req,res)=>{
    const data = req.body;
    const appDetails = new appointment({
        "refId" : data.refId,
        "BookedOn" : data.BookedOn,
        "TimeSlot" : data.TimeSlot
    })

    await appDetails.save();

    res.status(201).send({appDetails});

})

//api for fetch docors on the basis of time slot
//task 2
app.get("/doctorsDetails" ,async (req,res)=>{
    const data = req.body;
    console.log(data)

    const reqData = await Doctor.aggregate([

        {
           "$lookup" : {
            from : "appointments",
            foreignField : "refId",
            localField : "docId",
            as : "doctorData"
           } 
        },

    ]);


    res.send(reqData);


})

async function datafetch(){
    const resData = await fetch("http://localhost:4000/");
    const data = resData.json();
    return data;

}

async function datafetch2(){
    const resData = await fetch("http://localhost:4000/");
    const data = resData.json();
    return data;
    
}
//task 1
app.get("/calling",async(req,res)=>{

    const [details1,details2] = await Promise.all([datafetch(),datafetch2()]);
    res.send({details1,details2})

})

//task 3

app.get("/apiData" ,async(req,res)=>{

    try{
        // const user = new revenue({
        //     "month" : "2024-02-09",
        //     "revenue" : 1000
        // });
        // await user.save();
        const start = new Date("2024-01-01");
        start.setHours(0,0,0,0);
        const end = new Date("2024-03-31");
        end.setHours(23,59,59,999);
        const ds = await revenue.find({});
        console.log(start.getFullYear());
        const data = await revenue.aggregate([

            {
                "$match"  : {"month" : {
                    "$gt" : start.getTime(), "$lt" : end.getTime()
                }}
            },
            {
                "$group" : {
                    "_id" : "$month",
                    total : {"$sum" : "$revenue"}
                }
            }
        ]);

        const detail = [];
        let sum=0;
        for(let item in data ){
            const time = item["_id"];
            const timDate = new Date(time);
            if(timDate.getMonth>=1 && timDate.getMonth<=3){
                sum += item["revenue"];
            }

        }
        res.send({"revenue" : sum})

    } catch(err){
        console.log(err);
        
    }
   

})

app.listen(4000,(req,res)=>{
    console.log("server started ");
})