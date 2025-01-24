import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './db/connection.js'
import Person from './models/person.js'

dotenv.config()

connectDB()

const app = express()
app.use(express.json())
app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :req-json'
  )
)
morgan.token('req-json', (req) => {
  return JSON.stringify(req.body)
})
app.use(cors())
app.use(express.static('dist'))

const trimValues = (person) => {
  person.name = person.name?.trim()
  person.number = person.number?.trim()
  return person
}

const getErrorTitle = (isAdd = true) => {
  return `Failed to ${isAdd ? 'add' : 'update'} person to phonebook`
}

const hasMissingIdOrSameName = async (person) => {
  const result = { hasErrors: false, messages: [], status: 400 }
  const persons = await Person.find({})
  const hasMissingId =
    person.id && !persons.find((p) => p._id.toString() === person.id)
  const hasSameNamePerson = persons
    .filter((p) => p._id.toString() !== person?.id)
    .some((p) => p.name === person.name)
  result.hasErrors = hasMissingId || hasSameNamePerson
  result.message = result.hasErrors ? getErrorTitle(!person.id) : null
  if (hasMissingId) {
    result.messages.push(`Person ${person.name} not found`)
    result.status = 404
  } else if (hasSameNamePerson) {
    result.messages.push(`${person.name} is already in the phonebook`)
  }
  return result
}

app.get('/test', (_req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/health', (_req, res) => {
  res.send('ok')
})

app.get('/info', (_req, res) => {
  Person.find({}).then((persons) =>
    res.send(
      `<p>Phonebook has info for ${
        persons.length
      } people</p><p>${new Date().toLocaleString()}</p>`
    )
  )
})

app.get('/api/persons', (_req, _res, next) => {
  Person.find({})
    .then((persons) => {
      next({ status: 200, persons: persons })
    })
    .catch((error) => {
      next({ status: 404, message: `Error getting persons: ${error}` })
    })
})

app.get('/api/persons/:id', async (req, res) => {
  Person.findById(req.params.id)
    .then((result) => {
      res.json(result)
    })
    .catch(() => {
      res.sendStatus(404)
    })
})

app.post('/api/persons', async (req, _res, next) => {
  const newPerson = trimValues(req.body)
  const errors = await hasMissingIdOrSameName(newPerson)
  if (errors.hasErrors) {
    next(errors)
  } else {
    const person = new Person({
      name: newPerson.name,
      number: newPerson.number,
    })
    person
      .save()
      .then(() =>
        next({
          status: 201,
          message: `Person ${newPerson.name} has been successfully added to the phonebook`,
          person: person,
        })
      )
      .catch((error) => {
        const messages = Object.values(error.errors).map((e) => e.message)
        next({ status: 400, message: error._message, messages: messages })
      })
  }
})

app.put('/api/persons', async (req, _res, next) => {
  const person = trimValues(req.body)
  const errors = await hasMissingIdOrSameName(person)
  if (errors.hasErrors) {
    next(errors)
  } else {
    Person.findByIdAndUpdate(
      person.id,
      {
        name: person.name,
        number: person.number,
      },
      { new: true, runValidators: true }
    )
      .then((person) => {
        next({
          message: `Person "${person.name}" has been updated successfully`,
          person: person,
        })
      })
      .catch((error) => {
        const messages = Object.values(error.errors).map((e) => e.message)
        next({ status: 400, message: error._message, messages: messages })
      })
  }
})

app.delete('/api/persons/:id', async (req, _res, next) => {
  const id = req.params.id
  Person.findByIdAndDelete(id)
    .then((person) => {
      if (person) {
        next({
          message: `Person "${person.name}" is removed from the phonebook`,
          person: person,
        })
      } else {
        next({
          status: 404,
          message: 'Person to be deleted cannot be found',
          messages: ['Person is removed from the list'],
        })
      }
    })
    .catch((error) => {
      console.log('Delete error', error)
    })
})

// Middleware for response
// eslint-disable-next-line no-unused-vars
app.use((result, _req, res, _next) => {
  res.status(result.status || 200).json({
    message: result.message,
    messages: result.messages,
    person: result.person,
    persons: result.persons,
    error: result.error,
  })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
