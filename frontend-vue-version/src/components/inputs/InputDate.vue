<template>
  <div>
    <label :for="inputId" v-if="!hideLabel">
      {{ label }}
      <!-- <span class="text-danger" v-if="required">*</span> -->
    </label>
    <calendar
      :placeholder="placeholder"
      :id="inputId"
      :dateFormat="dateFormat"
      :showIcon="showIcon"
      class="input-date"
      inputClass="input"
      v-model="content"
      @input="input"
      @date-select="input"
    />
    <div class="text-danger">
      {{ error_message }}
    </div>
  </div>
</template>

<script>
import Calendar from "primevue/calendar";
import moment from "moment";

export default {
  name: "InputDate",
  components: {
    Calendar,
  },
  props: {
    placeholder: { type: String },
    value: { Type: [String, Number], default: null },
    label: { Type: String, required: true },
    hideLabel: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    maxDate: { type: Date, default: null },
    minDate: { type: Date, default: null },
    dateFormat: { type: String, default: "dd/mm/yy" },
    showIcon: { type: Boolean, default: false },
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
    // modelValue: {
    //   handler(modelValue) {
    //     this.content = moment(modelValue, "DD/MM/YYYY");
    //   },
    //   deep: true,
    //   immediate: true,
    // },
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
