import { BufferStruct, parseType } from "bufferstruct-js"

const packet = new BufferStruct({
  x: "int16LE[2]",
  y: "int32LE[2]",
  message: 'bytes*',
})

describe('bufferscript testing', () => {
  test('proofs', () => {
    const packed = packet.pack({
      message: "A TypeError will be thrown if array is not an Array or another type appropriate for Buffer.from() variants.",
      x: 1,
      y: [2, 3],
    })

    // <Buffer 01 00 00 00 02 00 00 00 03 00 00 00 41 20 54 79 70 65 45 72 72 6f 72 20 77 69 6c 6c 20 62 65 20 74 68 72 6f 77 6e 20 69 66 20 61 72 72 61 79 20 69 73 ... 69 more bytes>
    // console.log(packed)
    // 119
    // console.log(packed.byteLength)
    expect(packed.byteLength).toBe(119)
    // A TypeError will be thrown if array is not an Array or another type appropriate for Buffer.from() variants.
    // console.log(packet.unpack(packed).message.toString())
  })
})
