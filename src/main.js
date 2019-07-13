import App from './App.svelte';
const app = new App({
	target: document.body,
	hydrateable: true,
	props: {
		previewType: "live"
	}
});

window.app = app;

export default app;