import { beforeEach, afterEach } from "vitest";
import { shallowMount } from "@vue/test-utils";
import { setActivePinia, createPinia } from "pinia";
import i18n from "@/i18n/i18n";
import Formulary from "@/views/customers/Formulary.vue";

describe("Customers/Formulary.vue", () => {
  let wrapper = null;

  beforeEach(() => {
    setActivePinia(createPinia());

    i18n.global.t = (key) => key;

    const $route = {
      params: {
        id: "0aa76329-6266-4379-52cf-08dadc43d567",
      },
    };

    wrapper = shallowMount(Formulary, {
      global: {
        plugins: [i18n],
      },
      mocks: { $route },
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  test("Should create a new customer", () => {});
});
