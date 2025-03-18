const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();
const path = require("path");
const app = express();
connectDb()



const port = process.env.PORT || 5002 ; 

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Merhba bljami3 ');
  });
  
  
  app.use(express.static(path.join(__dirname, "public")));


app.use("/api/users" , require("./routes/userRoutes"))
app.use("/api/events" , require("./routes/eventRoutes"));

app.use(errorHandler)


app.listen(port , ()=>{
    console.log(`server running on port  ${port}`);
})