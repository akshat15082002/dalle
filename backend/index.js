import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import connectBD from './mongoDb/connectBD.js';
import postRoutes from './routes/post.routes.js';
import dalleRoutes from './routes/dalle.routes.js';
import faceRoutes from './routes/face.routes.js';
import bodyParser from 'body-parser';
import geminiRoutes from './routes/gemini.routes.js';

dotenv.config();

const app=express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.json({limit:"50mb"}));

app.use('/api/v1/posts',postRoutes);
app.use('/api/v1/dalle',dalleRoutes);
app.use('/api/v1/face',faceRoutes);
app.use('/api/v1/gemini',geminiRoutes);



app.get('/',(req,res)=>{
    res.send("Hello World");
});


const PORT=process.env.PORT||8080;

app.listen(PORT,()=>{
    console.log("Server is listening on port number", PORT);
    connectBD();
})