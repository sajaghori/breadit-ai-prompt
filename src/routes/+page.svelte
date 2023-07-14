<script lang="ts">
	import Button from '$shad-ui/ui/button/Button.svelte'
	import Card from '$shad-ui/ui/card/Card.svelte'
	import CardContent from '$shad-ui/ui/card/CardContent.svelte'
	import CardDescription from '$shad-ui/ui/card/CardDescription.svelte'
	import CardFooter from '$shad-ui/ui/card/CardFooter.svelte'
	import CardHeader from '$shad-ui/ui/card/CardHeader.svelte'
	import CardTitle from '$shad-ui/ui/card/CardTitle.svelte'
	import Textarea from '$shad-ui/ui/textarea/Textarea.svelte'
	import { Check, Loader2, ClipboardX } from 'lucide-svelte'
	import { tick } from 'svelte'
	import type { Prompt } from '$lib/prompt.model'
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore TODO: correctly import the component with types
	import Confetti from 'svelte-confetti'

	let input = ''
	let isLoading = false

	async function sendRequest(prompt: string) {
		isLoading = true
		const response = await fetch('/api/completion', {
			method: 'POST',
			body: JSON.stringify({ prompt }),
			headers: {
				'content-type': 'application/json'
			}
		})

		input = await response.text()
		isLoading = false
	}

	const submit = (e: Event, promptType: Prompt) => {
		e.preventDefault()
		showConfetti()

		const prompt =
			promptType === 'proofread'
				? `Proofread the following text:\n\n${input}`
				: `Summarize the following text:\n\n${input}`
		sendRequest(prompt)
	}

	let active = false
	const showConfetti = async () => {
		active = false
		await tick()
		active = true
	}

	const handleDiscard = () => (input = '')
</script>

<svelte:head>
	<title>Breadit - Create Post</title>
</svelte:head>

<Card class="w-[512px]">
	<CardHeader>
		<CardTitle>Create Post</CardTitle>
		<CardDescription>Write your breadit post and take advantage of AI Toolings</CardDescription>
	</CardHeader>
	<CardContent class="grid gap-4">
		<form class="grid gap-2">
			<Textarea bind:value={input} placeholder="Write your post ..." />
			<div>
				<Button
					disabled={isLoading}
					variant="link"
					type="submit"
					on:click={(e) => submit(e, 'proofread')}
					>{#if isLoading}
						<Loader2 class="mr-2 h-4 w-4 animate-spin" />
					{:else if active}
						<Confetti />
					{/if} Proofread
				</Button>
				<Button
					disabled={isLoading}
					variant="link"
					type="submit"
					on:click={(e) => submit(e, 'summarize')}
					>{#if isLoading}
						<Loader2 class="mr-2 h-4 w-4 animate-spin" />
					{:else if active}
						<Confetti />
					{/if} Summarize
				</Button>
			</div>
		</form>
	</CardContent>
	<CardFooter>
		<div class="flex w-full justify-between gap-2">
			<Button class="w-full">
				<Check class="mr-2 h-4 w-4" /> Post
			</Button>
			<Button variant="secondary" on:click={handleDiscard}
				><ClipboardX class="mr-2 h-4 w-4" /> Discard</Button
			>
		</div>
	</CardFooter>
</Card>
