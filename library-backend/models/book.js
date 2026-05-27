import { Schema, model } from 'mongoose'

const schema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
  },
  published: {
    type: Number,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Author',
  },
  genres: [{ type: String }],
})

export default model('Book', schema)