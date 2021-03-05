import App from './App.svelte';

if('serviceWorker' in navigator){
  navigator.serviceWorker.register('/service-worker.js')
    .then(reg => console.log('[SERVICE WORKER] registered'))
    .catch(err => console.log('[SERVICE WORKER] not registered', err));
}

const app = new App({
	target: document.body
});

export default app;