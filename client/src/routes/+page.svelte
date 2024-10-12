<script>
	let videoUrl;
	let isRecording = false;
	let serverDown = false;
	let videoElement;
	pingServer();

	async function pingServer() {
		try {
			await fetch('http://10.0.0.143:3000');
		} catch (error) {
			serverDown = true;
			console.error('Error pinging server:', error);
		}
	}

	async function recordVideo() {
		isRecording = true;
		try {
			const response = await fetch('http://10.0.0.143:3000');
			const data = await response.json();
			videoUrl = data.url;
			serverDown = false;
			if (videoElement) {
				videoElement.load();
			}
		} catch (error) {
			serverDown = true;
			console.error('Error fetching video URL:', error);
		} finally {
			isRecording = false;
		}
	}

</script>

<main>
	<button on:click={recordVideo} disabled={isRecording}>
		{isRecording ? 'Recording...' : 'Record Video'}
	</button>

	{#if videoUrl}
		<video bind:this={videoElement} width="640" height="480" controls>
			<source src={videoUrl} type="video/mp4" />
			<track kind="captions" />
		</video>
	{/if}

	{#if serverDown}
		<h1>Server is down</h1>
	{/if}

	{#if isRecording}
		<div class="loading-icon"></div>
	{/if}
</main>

<style>
	* {
        font-family: Arial, sans-serif;
        box-sizing: border-box;
    }
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	video {
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
	.loading-icon {
        width: 640px;
        height: 480px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 24px;
        color: #333;
    }
	@keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
    .loading-icon::before {
        content: '';
        border: 8px solid #f3f3f3;
        border-top: 8px solid #000000;
        border-radius: 50%;
        width: 80px;
        height: 80px;
        animation: spin 1s linear infinite;
    }
</style>

