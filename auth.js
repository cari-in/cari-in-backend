const express = require('express');
const app = express();
const firebase = require("./firebase")
const db = firebase.firestore()
// register
exports.register = (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(200).json({
      error: true,
      message: 'Email and password is required'
    })
  }

  if (req.body.passwordConfirmation !== req.body.password) {
    return res.status(200).json({
      error: true,
      message: 'Password didnt match'
    })
  }

  firebase
    .auth()
    .createUserWithEmailAndPassword(req.body.email, req.body.password)
    .then((data) => {
      return res.status(201).json({
        error: false,
        message: 'User created',
        data
      })
    })
    .catch(function (error) {
      const errorCode = error.code
      const errorMessage = error.message
      if (errorCode === 'auth/weak-password') {
        return res.status(200).json({
          error: true,
          message: errorMessage
        })
      } else {
        return res.status(500).json({
          error: true,
          message: errorMessage
        })
      }
    })
}

// login
exports.login = (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(200).json({
      error: true,
      message: 'Email and password is required'
    })
  }
  firebase
    .auth()
    .signInWithEmailAndPassword(req.body.email, req.body.password)
    .then((user) => {
      return res.status(200).json({
        error: false,
        message: 'User logged in',
        user
      })
    })
    .catch(function (error) {
      const errorCode = error.code
      const errorMessage = error.message
      if (errorCode === 'auth/weak-password') {
        return res.status(200).json({
          error: true,
          message: errorMessage
        })
      } else {
        return res.status(500).json({
          error: true,
          message: errorMessage
        })
      }
    })
}

// logout
exports.logout = (req, res) => {
  const user = firebase.auth().currentUser

  if (user) {
    firebase
      .auth()
      .signOut()
      .then((user) => {
        return res.status(200).json({
          error: false,
          message: 'Logout Successfully!',
          user
        })
      })
      .catch(function (error) {
        const errorCode = error.code
        const errorMessage = error.message
        if (errorCode === 'auth/too-many-requests') {
          return res.status(200).json({
            error: true,
            message: errorMessage
          })
        }
      })
  } else {
    return res.status(200).json({
      error: true,
      message: 'User not found!'
    })
  }
}

exports.question = (req, res) => {
const userId = req.body.userId
const { where, panoramic, type} = req.body
const userData = {
  where : where,
  panoramic : panoramic,
  type : type
}
if (!where || !panoramic || !type) {
  return res.status(200).json({
    error: true,
    message: 'Required.'

    
  })
}
const docRef = db.collection('users').doc(userId)

  docRef.get().then(() => {
    docRef.set(userData)
      .then(() => {
        return res.status(200).json({
          error: false,
          message: 'Information saved successfully!'
        })
      })
      .catch((e) => {
        return res.status(500).json({
          error: true,
          message: e
        })
      })
  })
}