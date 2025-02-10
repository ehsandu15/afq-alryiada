import { createVCodeBlock } from "@wdns/vue-code-block";

export default defineNuxtPlugin((props) => {
  const app = props.vueApp;
  const VCodeBlock = createVCodeBlock({});
  app.use(VCodeBlock);
});
