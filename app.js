'use strict'
const http = require('http')
const Bot = require('messenger-bot')

let bot = new Bot({
  token: 'EAAGrXoSazs4BAOjsnsS6kILmpZCAcY4oaOaxYjUKjrgogzwLYzogQZCS7bvwTQuQFZADBc1WqpEqZA9mOD6lI0jbxcp7adqlwfuY7YoyeCMZAxqr7WomfZCkGPg1OuqRZAQvNdOocZBd7Td045LG1mnVNGpDitjrOiJO02gKqdJOL5vzQD2ZAk5Pd',
  verify: 'VERIFY_TOKEN'
})

bot.on('error', (err) => {
  console.log(err.message)
})

bot.on('message', (payload, reply) => {
  let text = payload.message.text

  bot.getProfile(payload.sender.id, (err, profile) => {
    if (err) throw err

    reply({ text }, (err) => {
      if (err) throw err

      console.log(`Echoed back to ${profile.first_name} ${profile.last_name}: ${text}`)
    })
  })
})

http.createServer(bot.middleware()).listen(3000)
console.log('0verdose rodando na porta 3000.')
