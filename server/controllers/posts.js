//이 안에 ../routes/posts 의 라우터에 대한 handler(req-res logic)를 정의할 것이다.
// import express from 'express'
// import mongoose from 'mongoose';

import PostMessage from "../models/postMessage.js"

export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find(); //async

        console.log(postMessages)

        res.status(200).json(postMessages) // JSON 형태로 res 객체에 담아보낸다.
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const createPost = async (req, res) => {
    const post = req.body
    const newPost = new PostMessage(post)

    try {
        await newPost.save()
        
        res.status(201).json(newPost)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}