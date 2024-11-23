import mongoose, { Document, Schema } from "mongoose";

interface ISupplier extends Document {
  suppName: string;
  userId:mongoose.Types.ObjectId;
  logo?: string; 
  description?: string; 
}

const supplierSchema: Schema<ISupplier> = new Schema({
  suppName: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
  },
  description: {
    type: String,
  },
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref :"User",
    required:true
  }
});

const Supplier = mongoose.model<ISupplier>("Supplier", supplierSchema);
export default Supplier;
