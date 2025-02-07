import { expect, test } from 'vitest';
import utils from "../../uni_modules/stellar-ui/utils/utils.js"

test('utils', () => {
  const bg1 = utils.bg2style('https://img1.baidu.com/it/u=3238258566,4257158723&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500')
  expect(bg1.backgroundImage).toBe('url(https://img1.baidu.com/it/u=3238258566,4257158723&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500)')
  const bg2 = utils.bg2style("#fff")
  expect(bg2.backgroundColor).toBe("#fff")
  const bg3 = utils.bg2style("linear-gradient(45deg, #ff0000, #00ff00, #0000ff)")
  expect(bg3.backgroundImage).toBe("linear-gradient(45deg, #ff0000, #00ff00, #0000ff)")

  const isNumber1 = utils.isNumber(100)
  expect(isNumber1).toBe(true)
  const isNumber2 = utils.isNumber("100")
  expect(isNumber2).toBe(true)
  const isNumber3 = utils.isNumber("100px")
  expect(isNumber3).toBe(false)

  const f = utils.fenToYuan(230)
  expect(f).toBe("2.3")
  const f2 = utils.fenToYuan(231)
  expect(f2).toBe("2.31")

  const isEmpty = utils.isEmpty("")
  expect(isEmpty).toBe(true)
  const isEmpty2 = utils.isEmpty(" ")
  expect(isEmpty2).toBe(false)

  const obj1 = { a: 1, b: 2, c: { a: 1, b: 2 } }
  const bool1 = utils.deepEqual(obj1, { a: 1, b: 2, c: { a: 1, b: 2 } })
  expect(bool1).toBe(true)
  const bool2 = utils.deepEqual(obj1, { a: 1, b: 2, c: { a: 1, b: 3 } })
  expect(bool2).toBe(false)

  

})