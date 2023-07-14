import { Configuration, OpenAIApi } from 'openai-edge'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import { OPENAI_API_KEY } from '$env/static/private'
import type { RequestHandler } from '@sveltejs/kit'

const config = new Configuration({
	apiKey: OPENAI_API_KEY
})
const openai = new OpenAIApi(config)

export const POST: RequestHandler = async ({ request }) => {
	const { prompt, type } = await request.json()

	console.log('type', type)

	// Ask OpenAI for a streaming completion given the prompt
	const response = await openai.createCompletion({
		model: 'text-davinci-003',
		stream: true,
		temperature: 0.6,
		prompt: `proofread the following reddit post: ${prompt}
		the result is:`
	})

	// Convert the response into a friendly text-stream
	const stream = OpenAIStream(response)
	// Respond with the stream
	return new StreamingTextResponse(stream)
}
