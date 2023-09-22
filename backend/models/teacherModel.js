import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    remainingPeopleForPawn: {
      type: Number,
      required: true,
      default: 0,
    },

    remainingPeopleForBishop: {
      type: Number,
      required: true,
      default: 0,
    },

    remainingPeopleForQueen: {
      type: Number,
      required: true,
      default: 0,
    },

    contact: {
      type: String,
      required: true,
    }
},
{
  timestamps: true,
}
)

//create the Product table
const Teacher = mongoose.model("Teacher", teacherSchema);

export default Product;