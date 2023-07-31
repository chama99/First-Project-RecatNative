const mongoose = require("mongoose");
const PostSchema = new mongoose.Schema(
    {
        userId: 
            String,
        
        desc:  String,
          
        img: Array,
      
        likes:  Array,
        
        
        comments: Array,
        
    },
    { timestamps: true }
);
module.exports = mongoose.model("Post", PostSchema);
