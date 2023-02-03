import { defineInterface } from "@directus/extensions-sdk";
import InterfaceInputAutocompleteAPI from "./osm-autocomplete.vue";

export default defineInterface({
  id: "osm-autocomplete",
  name: "Open Street Map Autocomplete",
  icon: "find_in_page",
  description: "Search an address and get related coordinates.",
  component: InterfaceInputAutocompleteAPI,
  types: ["json"],
  localTypes: ["standard"],
  group: "standard",
  recommendedDisplays: ["formatted-value"],
  options: [
    {
      field: "trigger",
      name: "trigger",
      type: "string",
      schema: {
        default_value: "throttle",
      },
      meta: {
        width: "half",
        interface: "select-dropdown",
        options: {
          choices: [
            {
              text: "Throttle",
              value: "throttle",
            },
            {
              text: "Debounce",
              value: "debounce",
            },
          ],
        },
      },
    },
    {
      field: "rate",
      name: "rate",
      type: "integer",
      schema: {
        default_value: 500,
      },
      meta: {
        width: "half",
        interface: "input",
      },
    },
    {
      field: "placeholder",
      name: "placeholder",
      meta: {
        width: "half",
        interface: "system-input-translated-string",
        options: {
          placeholder: "Enter a placeholer",
        },
      },
    },
    {
      field: "font",
      name: "font",
      type: "string",
      meta: {
        width: "half",
        interface: "select-dropdown",
        options: {
          choices: [
            { text: "Sans serif", value: "sans-serif" },
            { text: "Monospace", value: "monospace" },
            { text: "Serif", value: "serif" },
          ],
        },
      },
      schema: {
        default_value: "sans-serif",
      },
    },
    {
      field: "iconLeft",
      name: "icon_left",
      type: "string",
      meta: {
        width: "half",
        interface: "select-icon",
      },
    },
    {
      field: "iconRight",
      name: "icon_right",
      type: "string",
      meta: {
        width: "half",
        interface: "select-icon",
      },
    },
  ],
});
