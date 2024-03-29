const express = require('express');
const cors = require("cors");
const rootRouter = require("./routes/index");


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", rootRouter);


app.listen(process.env.PORT,()=>{
    console.log('Server active at PORT :',process.env.PORT);
});


