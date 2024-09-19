import { ja } from "@formkit/i18n";
import { rootClasses } from "./formkit.theme";
import { genesisIcons } from "@formkit/icons";
import { defaultConfig } from "@formkit/vue";

export default defaultConfig({
  locales: { ja },
  locale: "ja",
  config: {
    rootClasses,
  },
  icons: {
    ...genesisIcons,
  },
  plugins: [],
});
