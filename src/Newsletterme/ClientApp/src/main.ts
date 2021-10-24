import { createApp } from 'vue';
import App from './app/app.vue';
import router from './router';

import 'bootstrap/dist/css/bootstrap.css';

createApp(App).use(router)
    .use(router)
    .mount('#app');
