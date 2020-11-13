import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { VueSocketPlugin } from "./plugins/socket";

createApp(App)
  .use(store)
  .use(router)
  .use(VueSocketPlugin, {
    connection: "http://localhost:3030"
  })
  .mount("#app");
