const staticRemindersApp = 'reminders-app'
const assets = [
	'/',
	'/public/index.html',
	'/public/create_reminder.html',
	'/public/login.html',
    '/public/login.js',
    '/public/reminder-app.js',
    '/public/reminder-edit.js',
    '/public/reminder-functions.js',
]

self.addEventListener('install', installEvent => {
	installEvent.waitUntil(
		caches.open(staticRemindersApp).then(cache => {
			cache.addAll(assets)
		})
	)
})

//fetch assets from cache
self.addEventListener('fetch', fetchEvent => {
	fetchEvent.respondWith(
		caches.match(fetchEvent.request).then(res => {
			return res || fetch(fetchEvent.request)
		})
	)
})