import { expect, test } from 'vitest';
import Color from "../../uni_modules/stellar-ui/utils/Color.js"

test("Color", async () => {
  const rgba1 = Color.hex2rgba("#ff0000")
  expect(rgba1).toBe("rgba(255,0,0,1)")
  const rgba2 = Color.hexa2rgba("#f008")
  expect(rgba2).toBe("rgba(255,0,0,0.53)")
  const rgba3 = Color.rgb2rgba("rgb(255,0,0)", 0.5)
  expect(rgba3).toBe("rgba(255,0,0,0.5)")
  const rgba4 = Color.setRgbaDiaphaneity("rgba(255,0,0,0.5)", 0.6)
  expect(rgba4).toBe("rgba(255,0,0,0.6)")
  const rgba5 = Color.formatColor("rgb(255,0,0)")
  expect(rgba5).toBe("rgba(255,0,0,1)")
})