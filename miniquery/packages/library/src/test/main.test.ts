import { describe, expect, it, vi } from "vitest";
import { $ } from "../main";

describe("MiniQuery", () => {
  it("does nothing", () => {
    expect(true).toBe(true);
  });

  describe("length", () => {
    it("returns legnth correctly", () => {
      const div = document.createElement(`div`);
      div.innerHTML = `
        <button class="btn" type="button">button</button>
        <button class="btn" type="button">button</button>
        <button class="btn" type="button">button</button>
        <button class="btn" type="button">button</button>
        `;
      expect($(".btn", div).length()).toBe(4);
    });
  });

  describe("click", () => {
    it("attaches click event listener correctly", () => {
      const div = document.createElement(`div`);
      div.innerHTML = `
        <button class="btn" type="button">button</button>
        <button class="btn" type="button">button</button>
        <button class="btn" type="button">button</button>
        <button class="btn" type="button">button</button>
        `;
      const handler = vi.fn();
      $(".btn", div).click(handler);

      (div.querySelectorAll(".btn")[0] as HTMLElement).click();
      expect(handler).toBeCalledTimes(1);
    });
  });
});
