import mongoose, { Document, Schema } from "mongoose";

// Define an interface for the Category document
interface ICategory extends Document {
  categoryName: string;
  userId:mongoose.Types.ObjectId;
}

// Create the category schema
const categorySchema: Schema<ICategory> = new Schema({
  categoryName: {
    type: String,
    required: true,
  },
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref :"User",
    required:true
  }
});

// Create the Category model
const Category = mongoose.model<ICategory>("Categories", categorySchema);

// Export the model
export default Category;
