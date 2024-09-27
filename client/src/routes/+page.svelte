<script>
	let videoUrl = '';
	let isRecording = false;

	async function recordVideo() {
		isRecording = true;
		
		try {
			const response = await fetch('http://10.0.0.143:3000');
			const data = await response.json();
			videoUrl = data.url;
		} catch (error) {
			console.error('Error fetching video URL:', error);
		} finally {
			isRecording = false;
		}
	}
</script>

<main>
	<!-- record video -->
	<button on:click={recordVideo} disabled={isRecording}>
		{isRecording ? 'Recording...' : 'Record Video'}
	</button>

	<!-- display video -->
	{#if videoUrl}
	<video width="640" height="480" controls>
		<source src={videoUrl} type="video/mp4" />
		<track kind="captions" />
		Your browser does not support the video tag.
	</video>
	{/if}
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	video {
		margin-top: 20px;
	}
	button {
		margin-bottom: 20px;
	}
</style>
