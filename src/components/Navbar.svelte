<script lang="ts">
	import { Avatar, AvatarFallback, AvatarImage } from '$shad-ui/ui/avatar'
</script>

<div class="fixed inset-x-0 top-0 z-[10] h-fit border-b border-zinc-300 bg-zinc-100 py-2">
	<div class="container mx-auto flex h-full max-w-7xl items-center justify-between gap-2">
		<a href="/" class="flex items-center gap-2">
			<img src="/favicon.ico" alt="breadit logo" class="h-8 w-8 sm:h-6 sm:w-6" />
			<p class="hidden text-sm font-medium text-zinc-700 md:block">Breadit</p>
		</a>

		<Avatar>
			<AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
			<AvatarFallback>CN</AvatarFallback>
		</Avatar>
	</div>
</div>
