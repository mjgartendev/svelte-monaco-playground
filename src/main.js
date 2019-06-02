import App from './App.svelte';
const app = new App({
	target: document.body,
	hydrateable: true,
	props: {
		name: 'SvelteMonaco Playground',
		previewType: "live"
	}
});

window.app = app;

export default app;