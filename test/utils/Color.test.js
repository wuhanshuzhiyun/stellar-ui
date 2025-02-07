import { expect, test, vi } from 'vitest';
import Color from "../../uni_modules/stellar-ui/utils/Color.js"

test("Color", async () => {
  const rgba = Color.hex2rgba("#ff0000")
  expect(rgba).toBe("rgba(255,0,0,1)")
})