<template>
  <div>
    <label v-if="!hideLabel">
      {{ label }}
      <!-- <span class="text-danger" v-if="required">*</span> -->
    </label>
    <dropdown
      class="select"
      v-model="selected"
      :value="value"
      :options="options"
      :optionLabel="optionLabel"
      :optionValue="optionValue"
    >
    </dropdown>
    <div class="text-danger">
      {{ error_message }}
    </div>
  </div>
</template>

<script>
import Dropdown from "primevue/dropdown";
import i18n from "@/i18n/i18n";

export default {
  name: "InputSelect",
  components: {
    Dropdown,
  },
  props: {
    value: { Type: [String, Number], default: null },
    label: { Type: String, required: true },
    hideLabel: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
    options: { type: Array, required: true },
    optionLabel: { Type: String, required: true },
    optionValue: { Type: String, required: true },
  },
  data() {
    return {
      selected: this.value,
      state: null,
      error_message: null,
    };
  },
  watch: {
    value(newValue) {
      this.selected = newValue;
    },
    selected() {
      this.$emit("update:modelValue", this.selected);
    },
  },
  methods: {
    validation() {
      if (this.required && !this.selected) {
        this.state = false;
        this.error_message = i18n.global.t("VALIDATION_FIELDS.REQUIRED", {
          label: this.label,
        });
        return false;
      }

      this.state = true;
      return true;
    },
  },
};
</script>
