/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from "./vuetify";
import VueClipboard from "vue-clipboard2";
import ToastPlugin from "vue-toast-notification";
import "vue-toast-notification/dist/theme-default.css";
import confirm from "./confirm";

export function registerPlugins(app) {
  app.use(vuetify);
  app.use(VueClipboard);
  app.use(ToastPlugin, {
    position: "top",
    duration: 2000,
  });
  app.use(confirm, { vuetify });
}
