import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Toast, { type PluginOptions } from "vue-toastification";
import "vue-toastification/dist/index.css";
import VueTelInput from "vue-tel-input";
import "vue-tel-input/vue-tel-input.css";

const app = createApp(App);

app.use(VueTelInput);
app.use(router);
app.use(Toast);

app.mount("#app");
