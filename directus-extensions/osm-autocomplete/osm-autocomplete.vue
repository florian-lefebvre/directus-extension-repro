<template>
  <div>
    <v-menu attached :disabled="disabled">
      <template #activator="{ activate }">
        <v-input
          :placeholder="placeholder"
          :disabled="disabled"
          :class="font"
          :model-value="value"
          :dir="direction"
          @update:model-value="onInput"
          @focus="activate"
        >
          <template v-if="iconLeft" #prepend
            ><v-icon :name="iconLeft"
          /></template>
          <template v-if="iconRight" #append
            ><v-icon :name="iconRight"
          /></template>
        </v-input>
      </template>

      <v-list v-if="results.length > 0">
        <v-list-item
          v-for="result of results"
          :key="result.osm_id"
          @click="
            () =>
              emitValue(JSON.stringify({ lat: result.lat, long: result.lon }))
          "
        >
          <v-list-item-content>{{ result.display_name }}</v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { throttle, debounce } from "lodash";
import { useApi } from "@directus/extensions-sdk";
import axios from "axios";

const computeURL = (value: string) =>
  `https://nominatim.openstreetmap.org/search.php?q=${encodeURIComponent(
    value
  )}&format=jsonv2`;

type Props = {
  value: JSON;
  trigger?: "debounce" | "throttle";
  rate: number | string;
  placeholder?: string;
  iconLeft?: string;
  iconRight?: string;
  font: "sans-serif" | "serif" | "monospace";
  disabled: boolean;
  direction: string;
};

type OSMResult = {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  readonly boundingbox: [string, string, string, string];
  lat: string;
  lon: string;
  display_name: string;
  place_rank: number;
  category: string;
  type: string;
  importance: number;
};

const props = withDefaults(defineProps<Props>(), {
  rate: 500,
  font: "sans-serif",
  disabled: false,
});

const emit = defineEmits<{
  (event: "input", value: string): void;
}>();

const api = useApi();

const results = ref<OSMResult[]>([]);

const fetchResultsRaw = async (value: string | null) => {
  if (!value) {
    results.value = [];
    return;
  }

  const url = computeURL(value);

  const res = await (url.startsWith("/") ? api.get(url) : axios.get(url));
  results.value = res.data;
};

const fetchResults =
  props.trigger === "debounce"
    ? debounce(fetchResultsRaw, Number(props.rate))
    : throttle(fetchResultsRaw, Number(props.rate));

function onInput(value: string) {
  emitValue(value);
  fetchResults(value);
}

function emitValue(value: string) {
  emit("input", value);
}
</script>

<style lang="scss" scoped>
.v-input {
  &.monospace {
    --v-input-font-family: var(--family-monospace);
  }

  &.serif {
    --v-input-font-family: var(--family-serif);
  }

  &.sans-serif {
    --v-input-font-family: var(--family-sans-serif);
  }
}
</style>
