const express = require("express");
const router = express.Router();
const { 
  createBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog
  
 } = require("../controllers/blogsController");

 
// get all blogs
router.get('/', getBlogs);

// get one blog
router.get('/:id', getBlog);

// create a blog
router.post('/', createBlog );

// delete a blog
router.delete('/:id', deleteBlog);

// update a blog
router.patch('/:id', updateBlog);





module.exports = router