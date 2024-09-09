import { BufferStruct } from "bufferstruct-js"

const secondPacket = new BufferStruct({
  x: "int32LE",
  y: "int32LE",
})

const packet = new BufferStruct({
  message: 'bytes[5]', // 4 + 1 byte zero terminator
  x: "int32LE",
  secondMessage: secondPacket.toType(), // bytes[8]
  bn: "int64LE",
})

describe('bufferscript testing', () => {
  test('proofs', () => {

    const packed = packet.pack({
      message: "hello",
      x: 1,
      secondMessage: secondPacket.pack({ x: 5, y: 7 }),
      bn: "123"
    })

    // <Buffer 68 65 6c 6c 6f 01 00 00 00 05 00 00 00 07 00 00 00 7b 00 00 00 00 00 00 00>
    // console.log(packed)

    const unpacked = packet.unpack(packed)

    // {
    //   message: <Buffer 68 65 6c 6c 6f>,
    //   x: 1,
    //   secondMessage: <Buffer 05 00 00 00 07 00 00 00>,
    //   bn: 123n
    // }
    // console.log(unpacked)

    const messageBuffer = unpacked.message
    const messageString = messageBuffer.toString()

    const secondMessageOrBuffer = secondPacket.unpack(unpacked.secondMessage as Buffer)

    expect(messageString).toEqual("hello")
    expect(unpacked.x).toBe(1)
    expect(secondMessageOrBuffer.x).toBe(5)
    expect(secondMessageOrBuffer.y).toBe(7)

  })
})
