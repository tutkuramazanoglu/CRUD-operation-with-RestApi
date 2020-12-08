const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
app.use(express.static("public"));
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));

app.listen(2000,()=>{
    console.log("App is running on port 2000")
});

mongoose.connect("mongodb+srv://testDB:tutkuutku@tutku.wzgti.mongodb.net/BestBuy?retryWrites=true&w=majority",{
    useNewUrlParser: true ,
    useUnifiedTopology: true

},(error)=>{
    if(error){
        console.log("MongoDB not connected.");
        console.log(error);
    }
    else{
        console.log("MongoDB connected successfully!");

    }
});

//schema
const empSchema=mongoose.Schema({
    name:String,
    city:String,
    contact:String,
    email:String,
    salary:Number
});

//model
const emp=mongoose.model("emp",empSchema)


//create
// emp.create({
//     name:"Ashley",
//     city:"Londan",
//     contact:"22334",
//     email:"ashley@ashley.com",
//     salary:3000
// },(error,empCreated)=>{
//     if(error){
//         console.log(error);
//         console.log("Employee Document not created. Please try again!");
//     }

//     else{
//         console.log("Employee document created."+empCreated)
//     }
// });

app.get("/all",(req,res)=>{
    emp.find({},(error,dataFound)=>{
        if(error){
            console.log(error);
            console.log("Data not Retrieved from MongoDB");
        }
        else{
            console.log("Data retrieved succesfully!"+dataFound);
            res.render("display",{
                emps:dataFound
            });
        }
    });
});

app.get("/delete/:id",(req,res)=>{
    const id=req.params.id;
    emp.findOneAndDelete(id,(error,empDeleted)=>{

        if(error){
            console.log(error);
            console.log("Employee not deleted");
        }
        else{
            console.log("Employee is deleted.");
            console.log("Deleted Employee record is here:"+empDeleted);
            res.redirect("/all");
        }
    });
});

app.get("/edit/:id",(req,res)=>{
    const id=req.params.id;
    emp.findById(id,(error,empFound)=>{
        if(error){
            console.log(error);
            console.log("Emplpyee not updated.")
        }
        else{
            console.log("Employee found "+empFound);
            res.render("edit",{
                em :empFound
            });
        }
    });
});

app.post("/update/:id",(req,res)=>{

    const id=req.params.id;
    const upd_emp=req.body;

    console.log(upd_emp);
    emp.findByIdAndUpdate(id,{
        name:upd_emp.name,
        city:upd_emp.city,
        contact:upd_emp.contact,
        email:upd_emp.email,
        salary:upd_emp.salary
    },(error,updatedEmp)=>{
        if(error){
            console.log(error);
            console.log("Employee not Updated.")
        }
        else{
            console.log("Employee updated succesfully as "+ updatedEmp);
            res.redirect("/all");
        }

    });
});

app.get("/add",(req,res)=>{
    res.render("add");
});

app.post("/add",(req,res)=>{
    const staff=req.body; // it takes staff which user insert it
    emp.create({
        name:staff.name,
        city:staff.city,
        contanct:staff.contact,
        email:staff.email,
        salary:staff.salary
    },(error,empCreated)=>{
        if(error){
            console.log(error);
            console.log("Employee not inserted!")
        }
        else{
            console.log("Emloyee inserted Succesfully as "+empCreated);
            res.redirect("/all");
        }
    });
});
