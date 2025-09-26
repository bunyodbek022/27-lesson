import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const postpath = path.join(__dirname, "../database/post.json");
const now = new Date().toISOString()

// Get All
const getAllPosts = async (req, res) => {
    const readData = await fs.readFile(postpath, "utf-8")
    const posts = JSON.parse(readData)
    res.status(200).json(posts)
}

// bitta Post
const getOnePost = async (req, res) => {
    const {id} = req.params
    const readData = await fs.readFile(postpath, "utf-8")
    const posts = JSON.parse(readData)    
    const post = posts.find((post)=> String(post.id)=== String(id));
    if(!post){
        res.status(404).json({message: "post is not found"})
        return 
    }
    res.status(200).json(post)
}


// Post 
const addPost = async (req, res) => {
    try {
        const { title, content, category, tags } = req.body;
        const readData = await fs.readFile(postpath, "utf-8");
        const posts = JSON.parse(readData);   
        if (!title || !content || !category || !tags) {
            return res.status(400).json({ message: "Ma'lumot kiritilmadi" });
        }
        const newpost = {
            id: posts.length + 1,
            title,
            content,
            category,
            tags,
            createdAt: now
        };
        posts.push(newpost);
        await fs.writeFile(postpath, JSON.stringify(posts, null, 2));

        res.status(201).json({ message: "Muvaffaqqiyatli qo'shildi!", post: newpost });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server xatosi" });
    }
};

// PUT
 const  updatePost = async (req, res) => {
    try {
        const {id} = req.params
        const updateData = req.body;

        if (!updateData) {
            return res.status(400).json({ message: "Ma'lumot kiritilmadi" });
        }
        const readData = await fs.readFile(postpath, "utf-8");
        const posts = JSON.parse(readData);

        const index = posts.findIndex((post)=> String(post.id) === String(id));
         if(index === -1){
            return res.status(404).json({message: "Bunday id dagi post topilmadi"});
         }
        const oldpost = posts[index];
        const updatedpost = Object.assign(oldpost, updateData);
         updatedpost["updatedAt"] = now;
         posts[index] = updatedpost;
        await fs.writeFile(postpath, JSON.stringify(posts, null, 2));

       res.status(201).json({ message: "Post yangilandi!", post: updatedpost });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server xatosi" });
    }
};

const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const readData = await fs.readFile(postpath, "utf-8");
        const posts = JSON.parse(readData);

        const index = posts.findIndex((post) => String(post.id) === String(id));
        if (index === -1) {
            return res.status(404).json({ message: "Bunday id dagi post topilmadi" });
        }
        posts.splice(index, 1)
        await fs.writeFile(postpath, JSON.stringify(posts, null, 2));
        res.status(200).json({ message: "Post o'chirildi!"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server xatosi" });
    }
};

export {getAllPosts, getOnePost, addPost, updatePost, deletePost}