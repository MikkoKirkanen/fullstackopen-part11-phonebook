import mongoose from 'mongoose'

mongoose.set('strictQuery', false)

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: [3, 'Name minimum length is 3 characters'],
  },
  number: {
    type: String,
    required: [true, 'Number is required'],
    minlength: [8, 'Number minimum length is 8 characters'],
    validate: {
      validator: (v) => {
        return /\d{2,3}-\d{7,8}/.test(v)
      },
      message: (props) => `${props.value} is not a valid number!`,
    },
  },
})

const Person = mongoose.model('Person', personSchema)

personSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
  },
})

export default Person
