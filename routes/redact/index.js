'use strict'

const OpenAI = require('openai')
// import OpenAI from 'openai'

module.exports = async function (fastify, opts) {
  fastify.post('/', async function (request, reply) {
    const data = request.body
    const results = await redactPiiFromTest(data)
    return results
  })
}

async function redactPiiFromTest (data) {
  // This is a very simple example of redacting PI from a string
  const openAI = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  })

  const prompt = `replace any personally identifiable information  (PII) 
  such as names, addresses, phone numbers, and email addresses, social security numbers, date of birth, credit card numbers and any other sensitive data in the following text with the word "[REDACTED]":
  ${data}
  `
  const results = await openAI.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: 'I am messaging system that really values privacy'
      },
      {
        role: 'user',
        content: prompt
      }
    ],
    model: 'gpt-3.5-turbo',
  })
  return results.choices[0].message.content
}

