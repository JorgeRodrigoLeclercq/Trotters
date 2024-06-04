const express = require('express');
//const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = express();
//app.use(cors());
const port = 3000;
const peopleRouter = require("./routers/people")

dotenv.config();
mongoose.connect(process.env.MONGO_URL).then(() => console.log('db connected')).catch((err) => console.log(err))

app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({limit: '10mb', extended: true}));

app.use('/api/people', peopleRouter)

app.listen(process.env.PORT || port, () => console.log(`Example app listening on port ${process.env.PORT}!`))