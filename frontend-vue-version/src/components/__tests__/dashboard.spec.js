import { shallowMount, config } from "@vue/test-utils";
import { expect } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useI18n } from "vue-i18n";
import Index from "@/views/dashboard/Index.vue";

vi.mock("vue-i18n");

useI18n.mockReturnValue({
  t: (tKey) => tKey,
});

config.global.mocks = {
  $t: (tKey) => tKey,
};

describe("Dashboard/Index.vue", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  test("Should renders inner text properly", () => {
    const wrapper = shallowMount(Index);

    expect(wrapper.text()).toContain("GENERAL.WELCOME");
  });
});
