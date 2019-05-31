import App from './App.svelte';
const app = new App({
	target: document.body,
	props: {
    theme: 'vs-dark',
	}
});

window.app = app;

export default app;