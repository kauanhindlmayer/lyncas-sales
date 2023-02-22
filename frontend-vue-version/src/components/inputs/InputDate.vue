<template>
  <div>
    <label :for="inputId" v-if="!hideLabel">
      {{ label }}
      <!-- <span class="text-danger" v-if="required">*</span> -->
    </label>
    <the-input-mask
      :placeholder="placeholder"
      :mask="mask"
      :slotChar="slotChar"
      :autoClear="false"
      :id="inputId"
      class="input"
      v-model="content"
      @input="input"
    />
    <div class="text-danger">
      {{ error_message }}
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "InputDate",
  props: {
    placeholder: { type: String },
    mask: { type: String, default: "99/99/9999" },
    slotChar: { type: String, default: "dd/mm/aaaa" },
    value: { Type: [String, Number], default: null },
    label: { Type: String, required: true },
    hideLabel: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
    minlength: { Type: Number },
    maxlength: { Type: Number },
  },
  data() {
    return {
      content: this.value,
      state: null,
      error_message: null,
    };
  },
  computed: {
    inputId() {
      return `input-${this.label.toLowerCase()}`;
    },
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

      this.error_message = null;
      this.state = true;
      return true;
    },
    input() {
      this.$emit("update:modelValue", moment(this.content, "YYYY-MM-DD"));
    },
  },
};
</script>
