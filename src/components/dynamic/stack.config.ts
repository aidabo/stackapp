import { PageResources } from "../layout/StackEvent";
import { PageComponents } from "./autogenerated/PageComponents";
import { PageHandlers } from "./autogenerated/PageHandlers";
import { PageStores } from "./autogenerated/PageStores";

const config = {
  layoutStore: "DefaultLayoutStore",
  eventHandler: "DefaultHandler",
  dataStore: "DefaultDataStore",

  resources: {
    components: PageComponents,
    handlers: PageHandlers,
    stores: PageStores,
  } as PageResources,
};

export default config;
