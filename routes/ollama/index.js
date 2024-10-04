'use strict'

const ollama = require('ollama')
// import ollama from 'ollama'

module.exports = async function (fastify, opts) {

  fastify.post('/', async function (request, reply) {

    const response = await ollama.chat({
      model: 'llama3.1',
      messages: [{ role: 'user', content: 'Why is the sky blue?' }],
    })
    console.log(response.message.content)
    return response.message.content
  })
}
