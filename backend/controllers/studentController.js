import Student from "../models/student.js";

export function createStudents (req , res) {
    console.log(req.body);
    const newStudent = new Student({
        name: req.body.name,
        age: req.body.age,
        city: req.body.city
    });
    newStudent.save().then (() => {
        res.json({
        message: "Student saved successfully",
    });
    }).catch((err) => {
        console.log(err.message);
    });
    
}

export async function createstudentsAsync(){
    try{
         const newStudent = new Student({
        name: req.body.name,
        age: req.body.age,
        city: req.body.city
    });
await newStudent.save()
        res.json({
        message: "Student saved successfully",
    });
    

    }catch(err){
        console.log("Error creating student:", err.message);
    }
    
}

export function getStudents (req, res){
    Student.find()
        .then((students) => {
            res.json(students);
        })
        .catch((err) => {
            console.error("Error fetching students:", err.message);
            res.status(500).json({ error: "Internal Server Error" });
        });
}