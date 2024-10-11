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
	<video width="1280" height="720" controls>
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
		border-radius: 8px;
	}
	button {
		margin-top: 20px;
		margin-bottom: 10px;
		padding: 10px;
		border: 1px solid #b5b5b5;
		border-radius: 5px;
        cursor: pointer;
		background-color: rgb(236, 236, 236);
		font-size: 1rem;
		transition: background-color 0.2s ease;
	}
	button:hover {
		background-color: rgb(217, 217, 217);

    }
</style>
