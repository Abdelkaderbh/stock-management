import mongoose, { Document, Schema } from "mongoose";

interface IProduct extends Document {
  nom: string;
  quantite: number;
  prix: number;
  status?: boolean;
  images: string[];
  Promo?: {
    InPromo?: boolean,
    Percentage?: number,
  };
  CatId: mongoose.Types.ObjectId;
  SupplierId: mongoose.Types.ObjectId;
  userId:mongoose.Types.ObjectId;
}

const productSchema: Schema<IProduct> = new Schema({
  nom: {
    type: String,
    required: true,
  },

  quantite: {
    type: Number,
    required: true,
  },
  prix: {
    type: Number,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  images: {
    type: [String],
    required: true,
  },

  Promo: {
    InPromo: { type: Boolean, default: false },
    Percentage: { type: Number },
  },
  CatId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categories",
    required: true,
  },
  SupplierId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Supplier",
    required: true,
  },
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref :"User",
    required:true
  }
});

const Product = mongoose.model < IProduct > ("Product", productSchema);

export default Product;
