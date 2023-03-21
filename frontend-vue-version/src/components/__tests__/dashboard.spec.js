import { beforeEach, afterEach } from "vitest";
import { shallowMount } from "@vue/test-utils";
import i18n from "@/i18n/i18n";
import Dashboard from "@/views/dashboard/Index.vue";

describe("Dashboard/Index.vue", () => {
  let wrapper = null;

  beforeEach(() => {
    i18n.global.t = (key) => key;

    wrapper = shallowMount(Dashboard, {
      global: {
        plugins: [i18n],
      },
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  test("Should renders inner text properly", () => {
    expect(wrapper.text()).toContain("GENERAL.WELCOME");
  });
});
