<template>
  <div>
    <label v-if="!hideLabel">{{ label }}</label>
    <select class="select" v-model="content" @input="input">
      <option v-for="{ name, id } in options" :value="id" :key="id">
        {{ name }}
      </option>
    </select>
    <div class="error-message">
      {{ error_message }}
    </div>
  </div>
</template>

<script>
export default {
  name: "InputSelect",
  props: {
    value: { Type: [String, Number], default: null },
    label: { Type: String },
    hideLabel: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
    options: { type: Array, required: true },
  },
  data() {
    return {
      content: this.value,
      state: null,
      error_message: null,
    };
  },
  watch: {
    value(newValue) {
      this.content = newValue;
    },
  },
  methods: {
    validation() {
      if (this.required && !this.content) {
        this.state = false;
        this.error_message = `Campo ${this.label} é obrigatório`;
        return false;
      }

      this.state = true;
      return true;
    },
    input() {
      this.$emit("update:modelValue", this.content);
    },
  },
};
</script>
