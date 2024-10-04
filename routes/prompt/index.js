'use strict'

const OpenAI = require('openai')
// import OpenAI from 'openai'


module.exports = async function (fastify, opts) {
  fastify.post('/', async function (request, reply) {
    const data = request.body
    const results = await chatPrompt(data)
    return results
  })
}

async function chatPrompt (data) {
  // basic prompt
  const openAI = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  })

  const prompt = data
  const results = await openAI.chat.completions.create({
    messages: [
      {
        role: 'user',
        content: prompt
      }
    ],
    model: 'gpt-3.5-turbo',
  })
  return results.choices[0].message.content
}

