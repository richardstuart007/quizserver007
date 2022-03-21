//
//  Libraries
//
const express = require('express')
const bcrypt = require('bcrypt')
const cors = require('cors')
const knex = require('knex')
const { format } = require('date-fns')
//
//  Sub components
//
const Raw = require('./controllers/Raw')
const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
//..............................................................................
//.  Initialisation
//.............................................................................
//
//  Counter
//
let logCounter = 0
//
// Constants
//
const {
  PORT,
  KNEX_CLIENT,
  KNEX_HOST,
  KNEX_USER,
  KNEX_PWD,
  KNEX_DATABASE,
  URL_SIGNIN,
  URL_QUESTIONS,
  URL_REGISTER,
  URL_PROFILE
} = require('./quizServerConstants.js')
//
// Knex
//
const db = knex({
  client: KNEX_CLIENT,
  connection: {
    host: KNEX_HOST,
    user: KNEX_USER,
    password: KNEX_PWD,
    database: KNEX_DATABASE
  }
})
//
// Express & Cors
//
const app = express()
app.use(express.json())
app.use(cors())
//.............................................................................
//.  Routes - Questions
//.............................................................................
app.get(URL_QUESTIONS, (req, res) => {
  logRawQuestions(req, 'GET', 'RAW')
  Raw.handleRaw(req, res, db)
})

app.post(URL_QUESTIONS, (req, res) => {
  logRawQuestions(req, 'POST', 'RAW')
  Raw.handleRaw(req, res, db)
})

app.delete(URL_QUESTIONS, (req, res) => {
  logRawQuestions(req, 'DELETE', 'RAW')
  Raw.handleRaw(req, res, db)
})

app.put(URL_QUESTIONS, (req, res) => {
  logRawQuestions(req, 'PUT', 'RAW')
  Raw.handleRaw(req, res, db)
})
//.............................................................................
//.  Routes - Register/SignIn
//.............................................................................
app.get(`${URL_PROFILE}/:id`, (req, res) => {
  logRawSignIn(req, 'GET Profile')
  profile.handleProfileGet(req, res, db)
})

app.post(URL_SIGNIN, (req, res) => {
  logRawSignIn(req, 'POST Signin')
  signin.handleSignin(req, res, db, bcrypt)
})

app.post(URL_REGISTER, (req, res) => {
  logRawSignIn(req, 'POST Register')
  register.handleRegister(req, res, db, bcrypt)
})
//..............................................................................
//.  Start Server
//.............................................................................
app.listen(PORT, () => {
  console.log(`Quiz Server running on port ${PORT}`)
})
//.............................................................................
//.  Log the Body to the console
//.............................................................................
function logRawQuestions(req, fetchAction, fetchRoute) {
  //
  //  Destructure Parameters
  //
  const {
    sqlClient,
    sqlAction,
    sqlString,
    sqlTable,
    sqlWhere,
    sqlRow,
    sqlKeyName
  } = req.body
  //
  //  Timestamp and Counter
  //
  const TimeStamp = format(new Date(), 'HHmmss')
  logCounter = logCounter + 1
  //
  //  Format Message & Log
  //
  let logMessage = `${logCounter} Time:${TimeStamp} sqlClient(${sqlClient}) fetchAction(${fetchAction}) fetchRoute(${fetchRoute}) sqlAction(${sqlAction}) `
  if (sqlTable) logMessage = logMessage + ` sqlTable(${sqlTable}) `
  if (sqlString) logMessage = logMessage + ` sqlString(${sqlString}) `
  if (sqlWhere) logMessage = logMessage + ` sqlWhere(${sqlWhere}) `
  if (sqlRow) logMessage = logMessage + ` sqlRow(Data) `
  if (sqlKeyName) logMessage = logMessage + ` sqlKeyName(${sqlKeyName}) `

  console.log(logMessage)
}
//.............................................................................
//.  Log the Body to the console
//.............................................................................
function logRawSignIn(req, fetchAction) {
  //
  //  Destructure Parameters
  //
  const { email, name, sqlClient } = req.body
  const { id } = req.params
  //
  //  Counter
  //
  const TimeStamp = format(new Date(), 'HHmmss')
  logCounter = logCounter + 1
  //
  // Format message & Log
  //
  let logMessage = `${logCounter} Time:${TimeStamp} sqlClient(${sqlClient}) fetchAction(${fetchAction}) Email(${email}) `
  if (name) logMessage.concat(` Name(${name})`)
  if (id) logMessage.concat(` ID(${id})`)
  console.log(logMessage)
}
