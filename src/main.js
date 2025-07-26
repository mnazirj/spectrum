import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

//PrimeVue UI
import PrimeVue from "primevue/config";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

//Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

//Custom Style
import "./assets/css/custom.css";

//Custom PrimeVue Preset
import MyPreset from "./assets/js/createPreset.js";

//Axios
import axios from "axios";
axios.defaults.baseURL = "https://publicws.spectrum.e-ibtikar.com/api/";

//i18n
import i18n from "./i18n";

createApp(App)
  .use(store)
  .use(router)
  .use(PrimeVue, {
    ripple: true,

    theme: {
      preset: MyPreset,

      options: {
        prefix: "p",
        darkModeSelector: ".my-app-dark",
      },
    },
  })
  .use(i18n)
  .mount("#app");
