import { extend } from 'vee-validate'
import { required, email } from 'vee-validate/dist/rules'

// Install required rule and message.
extend('required', required)

// Install email rule and message.
extend('email', email)

// Install min rule and message.
extend('min', {
  params: ['min', 'message'],
  validate (value, { min }) {
    return +value >= +min
  },
  message: '{message}'
})

extend('password', {
  params: ['min', 'message'],
  validate (value, { min }) {
    return +value.length >= +min
  },
  message: '{message}'
})

extend('role', {
  params: ['role', 'message'],
  validate (value, { role }) {
    return value !== role
  },
  message: '{message}'
})

extend('bus', {
  params: ['min', 'message'],
  validate (value, { min }) {
    return value !== min
  },
  message: '{message}'
})
