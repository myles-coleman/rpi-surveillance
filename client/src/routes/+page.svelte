<script>
	import Hls from 'hls.js';
	let videoUrl;
	let streamUrl;
	let isRecording = false;
	let serverDown = false;
	let videoElement;
	let serverIp = '';

	async function recordVideo() {
		isRecording = true;
		try {
			if (!serverIp) {
				alert("Please enter the server IP.");
				return;
			}
			const response = await fetch(`http://${serverIp}:3000/record`);
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

	async function fetchStream() {
		try {
			if (!serverIp) {
				alert("Please enter the server IP.");
				return;
			}
			const streamUrl = `http://${serverIp}:3000/stream`;
			if (!videoElement) {
				videoElement = document.createElement("video");
				videoElement.width = 640;
				videoElement.height = 360;
				videoElement.controls = true;
				videoElement.autoplay = true;
				videoElement.classList.add("video-stream");
				document.querySelector("main").appendChild(videoElement);
			}
			if (Hls.isSupported()) {
				const hls = new Hls({ debug: true });
				hls.loadSource(streamUrl);
				hls.attachMedia(videoElement);
			} else {
				alert("HLS is not supported in your browser.");
			}
			serverDown = false;
		} catch (error) {
			serverDown = true;
			console.error("Error fetching stream URL or initializing playback:", error);
		}
	}

</script>

<main>
	<input type="text" bind:value={serverIp} placeholder="Enter server IP address" />

	<button on:click={recordVideo} disabled={isRecording}>
		{isRecording ? 'Recording...' : 'Record Video'}
	</button>

	<button on:click={fetchStream} disabled={isRecording}>
		Start Live Stream
	</button>

	{#if videoUrl}
		<video bind:this={videoElement} width="1280" height="720" controls autoplay>
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
	input {
        margin-top: 20px;
        padding: 10px;
        border: 1px solid #b5b5b5;
        border-radius: 5px;
        font-size: 1rem;
        width: 300px;
    }
</style>