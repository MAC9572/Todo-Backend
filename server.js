const express = require('express')
var cors = require('cors')
const app = express()
const port = 8000

app.use(cors({
    origin : 'http://localhost:3000',
}))

app.use(express.json())

const tasks =[
  {
  _id: 1,
  task : 'Buy Fruits',
},

{
 _id :2,
 task :'Buy Vegetables',
},

{
_id :3,
task : 'Buy Groceries',
},

{
  _id :4,
  task : 'Pay Amount'
}
  
]

app.get('/', (req, res) => {
    res.json(tasks)
  })

  app.post('/',(req, res)=>{
     console.log(req.body)
     const task =req.body.task
     if(task.length >0){
     tasks.push({
      task : task
     })
     res.status(200).json({"message" : "Task Added Successfully"})
    } else{
    res.send({"message" : "Task Not Added. Enter a Task"})
    }
  })

  app.delete('/task/:index',(req,res)=>{
    console.log(req.params.index)
    if(req.params.index < tasks.length){
    tasks.splice(req.params.index ,1)
    res.status(200).json({"message" : "Task Deleted Successfully"})
    }
    else{
      res.status(404).json({"message" : "Invalid Input"})
    }
  })

  app.put('/task/:index',(req,res)=>{
  console.log(req.params.index)
  const updatedTask =req.body.task
  console.log(updatedTask)
  if(tasks[req.params.index]){
   tasks[req.params.index].task =updatedTask;
   res.status(200).json({"message": "Task Updated Successfully"});
  }else{
    res.status(404).json({"message" : "No Task Found"})
  }
  })

  app.listen(port,()=>{
    console.log('Server Started')
  })