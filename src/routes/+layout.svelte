<script>
	import '../app.postcss'
	import Navbar from '$components/Navbar.svelte'
</script>

<body class="min-h-screen bg-slate-50 antialiased">
	<Navbar />
	<main class="flex h-screen items-center justify-center">
		<slot />
	</main>
</body>
