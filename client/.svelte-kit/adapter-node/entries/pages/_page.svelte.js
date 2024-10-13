import { c as create_ssr_component } from "../../chunks/ssr.js";
import { e as escape } from "../../chunks/escape.js";
const css = {
  code: "main.svelte-ju0r7p{display:flex;flex-direction:column;align-items:center}video.svelte-ju0r7p{margin-top:20px}button.svelte-ju0r7p{margin-bottom:20px}",
  map: `{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script>\\r\\n\\tlet videoUrl = '';\\r\\n\\tlet isRecording = false;\\r\\n\\r\\n\\tasync function recordVideo() {\\r\\n\\t\\tisRecording = true;\\r\\n\\t\\t\\r\\n\\t\\ttry {\\r\\n\\t\\t\\tconst response = await fetch('http://10.0.0.143:3000');\\r\\n\\t\\t\\tconst data = await response.json();\\r\\n\\t\\t\\tvideoUrl = data.url;\\r\\n\\t\\t} catch (error) {\\r\\n\\t\\t\\tconsole.error('Error fetching video URL:', error);\\r\\n\\t\\t} finally {\\r\\n\\t\\t\\tisRecording = false;\\r\\n\\t\\t}\\r\\n\\t}\\r\\n<\/script>\\r\\n\\r\\n<main>\\r\\n\\t<!-- record video -->\\r\\n\\t<button on:click={recordVideo} disabled={isRecording}>\\r\\n\\t\\t{isRecording ? 'Recording...' : 'Record Video'}\\r\\n\\t</button>\\r\\n\\r\\n\\t<!-- display video -->\\r\\n\\t{#if videoUrl}\\r\\n\\t<video width=\\"640\\" height=\\"480\\" controls>\\r\\n\\t\\t<source src={videoUrl} type=\\"video/mp4\\" />\\r\\n\\t\\t<track kind=\\"captions\\" />\\r\\n\\t\\tYour browser does not support the video tag.\\r\\n\\t</video>\\r\\n\\t{/if}\\r\\n</main>\\r\\n\\r\\n<style>\\r\\n\\tmain {\\r\\n\\t\\tdisplay: flex;\\r\\n\\t\\tflex-direction: column;\\r\\n\\t\\talign-items: center;\\r\\n\\t}\\r\\n\\tvideo {\\r\\n\\t\\tmargin-top: 20px;\\r\\n\\t}\\r\\n\\tbutton {\\r\\n\\t\\tmargin-bottom: 20px;\\r\\n\\t}\\r\\n</style>\\r\\n"],"names":[],"mappings":"AAoCC,kBAAK,CACJ,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,WAAW,CAAE,MACd,CACA,mBAAM,CACL,UAAU,CAAE,IACb,CACA,oBAAO,CACN,aAAa,CAAE,IAChB"}`
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<main class="svelte-ju0r7p"> <button ${""} class="svelte-ju0r7p">${escape("Record Video")}</button>  ${``} </main>`;
});
export {
  Page as default
};
