import Color from "../../uni_modules/stellar-ui/utils/Color.js"

test("hex2rgba", () => {
  const rgba1 = Color.hex2rgba("#ff0000")
  expect(rgba1).toBe("rgba(255,0,0,1)")
})

test("rgba2hex", () => {
  const rgba2 = Color.hexa2rgba("#f008")
  expect(rgba2).toBe("rgba(255,0,0,0.53)")
})

test("rgb2rgba", () => {
  const rgba3 = Color.rgb2rgba("rgb(255,0,0)", 0.5)
  expect(rgba3).toBe("rgba(255,0,0,0.5)")
})

test("setRgbaDiaphaneity", () => {
  const rgba4 = Color.setRgbaDiaphaneity("rgba(255,0,0,0.5)", 0.6)
  expect(rgba4).toBe("rgba(255,0,0,0.6)")
})

test("formatColor", async () => {
  const rgba5 = Color.formatColor("rgb(255,0,0)")
  expect(rgba5).toBe("rgba(255,0,0,1)")
})