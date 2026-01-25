import Post from "../models/post.model";

export const getAll=async(req,res)=>{
    try{
        const posts = await Post.find();
        return res.json(posts)
    }catch(error){
        return res.status(400).json({
            message:error,
        });
    }
};


export const getOne=async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(!post){
        return res.status(404).json({
            message:"not found"
        });
        }
        return res.json(post);
    }catch(error){
        return res.status(400).json({
            message:error
        })
    }
}

export const createOne=async(req,res)=>{
    try{
        const post =await Post.create(req.body);
        return res.status(201).json(post);
    }catch(error){
        return res.status(400).json({
            message:error,
        });
    }
};

export const deleteOne=async(req,res)=>{
    try{
        await Post.findByIdAndDelete(req.params.id);
        return res.json({
            success:true,
        });
    }catch(error){
        return res.status(400).json({
            message:error,
        });
    }
};

export const updateOne=async(req,res)=>{
    try{
        const post = await Post.findByIdAndUpdate(req.params.id,req.body,{new:true});
        return res.json(post);
    }catch(error){
        return res.status(400).json({
            message:error,
        });
    }
}