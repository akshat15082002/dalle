import express from 'express';
import dotenv from "dotenv";
import {v2 as cloudinary} from "cloudinary";
import Post from '../models/post.models.js';

dotenv.config();

const router = express.Router();

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME , 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

//get all posts
router.route('/').get(async(req,res)=>{
    try{
        const posts=await Post.find({});
        res.status(200).json({success:true,posts});
    }
    catch(error){
        console.error("Error getting posts:",error);
        res.status(500).json({error:"Something went wrong"});
    }
});
//create a post
router.route('/').post(async(req,res)=>{
    try{
        const {name,prompt,photo}=req.body;
        if(!name||!prompt||!photo){
            return res.status(400).json({error:"Name, prompt, and photo are required"});
        }
        const photoUrl=await cloudinary.uploader.upload(photo);
        const newPost=new Post({name,prompt,photoUrl:photoUrl.secure_url});
        await newPost.save();
        res.status(201).json({success:true,newPost});
    }
    catch(error){
        console.error("Error creating post:",error);
        res.status(500).json({error:"Something went wrong"});
    }
});

export default router;