const Blog = require("../models/blogsModel");
const mongoose = require("mongoose");

// get all blogs
const getBlogs = async(req, res) => { 
  const blogs = await Blog.find({}).sort({createdAt: -1})
  res.status(200).json(blogs)
 }

// get one blog
const getBlog = async(req, res) => { 
  const {id} = req.params 
  const blog = await Blog.findById(id)
  if(!mongoose.Types.ObjectId.isValid(id)){
  return res.status(400).json({error: "this blog does not exist"})
  }
  if(!blog){
    return res.status(400).json({error: "this blog does not exist"})
  }
  res.status(200).json(blog)
}

// create a blog
const createBlog = async(req, res) => { 
  const {title, body} = req.body
  try {
    const blog = await Blog.create({title, body})
    res.status(200).json(blog)
  } catch (error) {
    res.status(400).json({error: error.message})
    
  }
}



// delete a blog
const deleteBlog = async(req, res) => { 
  const {id} = req.params 

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(400).json({error: "this blog does not exist"})
  }
  const blog = await Blog.findOneAndDelete({_id: id})
  
  if(!blog){
    return res.status(400).json({error: "this blog does not exist"})
  }
  res.status(200).json(blog)
}


// update a blog
const updateBlog = async(req, res) => { 
  const {id} = req.params 

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(400).json({error: "this blog does not exist"})
  }
  const blog = await Blog.findOneAndUpdate({_id: id},{
    ...req.body
  })
  
  if(!blog){
    return res.status(400).json({error: "this blog does not exist"})
  }
  res.status(200).json(blog)
  
}


module.exports = {
  createBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog
}