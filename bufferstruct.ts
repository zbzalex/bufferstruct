import type { RawStruct } from "./types"

export default class BufferStruct<T extends RawStruct> {
  private struct: T

  constructor(struct: T) {
    this.struct = struct
  }

  getSize(): number {
    let size = 0
    let keys = Object.keys(this.struct)
    for (const key of keys) {
      size += this.getTypeSize(this.struct[key])
    }

    return size
  }

  getTypeSize(type: string): number {
    let m: RegExpMatchArray | null = null

    if ((m = type.match(/^(\w+)\[(\d+)\]$/)) !== null) {
      const type = m[1]
      const size = Number(m[2])

      return this.getTypeSize(type) * size
    } else {
      switch (type) {
        case "bytes":
          return 1
        case "int16LE":
        case "int16BE":
        case "uint16LE":
        case "uint16BE":
          return 2
        case "int32LE":
        case "int32BE":
        case "uint32LE":
        case "uint32BE":
        case "floatLE":
        case "floatBE":
          return 4
        case "int64LE":
        case "int64BE":
        case "uint64LE":
        case "uint64BE":
        case "doubleLE":
        case "doubleBE":
          return 8
      }
    }

    return 0
  }

  pack<Props extends { [P in keyof T]: string | number | bigint | Buffer | Array<number> }>(data: Props): Buffer {
    let buf = Buffer.alloc(this.getSize())
    let offset = 0
    let keys = Object.keys(this.struct)
    
    if (JSON.stringify(Object.keys(data).sort()) !== JSON.stringify(Object.keys(this.struct).sort()))
      throw new Error("Structure mismatch");

    for (const key of keys) {

      const type = this.struct[key].split('[')[0]
      const size = this.getTypeSize(this.struct[key])

      let i: number
      let ii: number
      let dataArr = Array.isArray(data[key]) ? data[key] : [data[key]]

      switch (type) {
        case "bytes":

          if (typeof data[key] === 'object') {
            for (
              i = 0, ii = size;
              i < ii;
              i++
            ) {
              buf.writeUint8(data[key][i], offset)

              offset++
            }
          } else {

            for (
              i = 0, ii = size;
              i < ii;
              i++
            ) {
              // @ts-ignore
              buf.writeUint8(data[key].length > i ? data[key].charCodeAt(i) : 0, offset)

              offset++
            }
          }
          break;
        case "int16LE":
          for (
            i = 0, ii = size / 2;
            i < ii;
            i++
          ) {
            buf.writeInt16LE(
              Number(dataArr[i]),
              offset
            )

            offset += 2
          }
          break;
        case "int16BE":
          for (
            i = 0, ii = size / 2;
            i < ii;
            i++
          ) {
            buf.writeInt16BE(
              Number(dataArr[i]),
              offset
            )

            offset += 2
          }
          break;
        case "uint16LE":
          for (
            i = 0, ii = size / 2;
            i < ii;
            i++
          ) {
            buf.writeUint16LE(
              Number(dataArr[i]),
              offset
            )

            offset += 2
          }
          break;
        case "uint16BE":
          for (
            i = 0, ii = size / 2;
            i < ii;
            i++
          ) {
            buf.writeUint16BE(
              Number(dataArr[i]),
              offset
            )

            offset += 2
          }
          break;
        case "int32LE":
          for (
            i = 0, ii = size / 4;
            i < ii;
            i++
          ) {
            buf.writeInt32LE(
              Number(dataArr[i]),
              offset
            )

            offset += 4
          }
          break;
        case "int32BE":
          for (
            i = 0, ii = size / 4;
            i < ii;
            i++
          ) {
            buf.writeInt32BE(
              Number(dataArr[i]),
              offset
            )

            offset += 4
          }
          break;
        case "uint32LE":
          for (
            i = 0, ii = size / 4;
            i < ii;
            i++
          ) {
            buf.writeUint32LE(
              Number(dataArr[i]),
              offset
            )

            offset += 4
          }
          break;
        case "uint32BE":
          for (
            i = 0, ii = size / 4;
            i < ii;
            i++
          ) {
            buf.writeUint32BE(
              Number(dataArr[i]),
              offset
            )

            offset += 4
          }
          break;
        case "floatLE":
          for (
            i = 0, ii = size / 4;
            i < ii;
            i++
          ) {
            buf.writeFloatLE(
              Number(dataArr[i]),
              offset
            )

            offset += 4
          }
          break;
        case "floatBE":
          for (
            i = 0, ii = size / 4;
            i < ii;
            i++
          ) {
            buf.writeFloatBE(
              Number(dataArr[i]),
              offset
            )

            offset += 4
          }
          break;
        case "int64LE":
          for (
            i = 0, ii = size / 8;
            i < ii;
            i++
          ) {
            buf.writeBigInt64LE(
              BigInt(dataArr[i] as string),
              offset
            )

            offset += 8
          }
          break;
        case "int64BE":
          for (
            i = 0, ii = size / 8;
            i < ii;
            i++
          ) {
            buf.writeBigInt64BE(
              BigInt(dataArr[i] as string),
              offset
            )

            offset += 8
          }
          break;
        case "uint64LE":
          for (
            i = 0, ii = size / 8;
            i < ii;
            i++
          ) {
            buf.writeBigUint64LE(
              BigInt(dataArr[i] as string),
              offset
            )

            offset += 8
          }
          break;
        case "uint64BE":
          for (
            i = 0, ii = size / 8;
            i < ii;
            i++
          ) {
            buf.writeBigUint64BE(
              BigInt(dataArr[i] as string),
              offset
            )

            offset += 8
          }
          break;
        case "doubleLE":
          for (
            i = 0, ii = size / 8;
            i < ii;
            i++
          ) {
            buf.writeDoubleLE(
              Number(dataArr[i]),
              offset
            )

            offset += 8
          }
          break;
        case "doubleBE":
          for (
            i = 0, ii = size / 8;
            i < ii;
            i++
          ) {
            buf.writeDoubleBE(
              Number(dataArr[i]),
              offset
            )

            offset += 8
          }
          break;
      }

    }

    return buf
  }

  unpack(fromBuffer: Buffer) {
    let offset = 0
    let obj: { [key: string]: number | BigInt | number[] | BigInt[] | Buffer } = {}
    let keys = Object.keys(this.struct)

    for (const key of keys) {

      const type = this.struct[key].split('[')[0]
      const size = this.getTypeSize(this.struct[key])

      let i: number
      let ii: number
      let arr: any[] = []

      switch (type) {
        case "bytes":

          for (
            i = 0, ii = size;
            i < ii;
            i++
          ) {
            arr.push(fromBuffer.readUint8(offset))

            offset++
          }

          obj[key] = Buffer.from(arr)

          break;
        case "int16LE":
          for (
            i = 0, ii = size / 2;
            i < ii;
            i++
          ) {
            arr.push(fromBuffer.readUint16LE(offset))

            offset += 2
          }

          obj[key] = arr.length === 1 ? arr[0] : arr

          break;
        case "int16BE":
          for (
            i = 0, ii = size / 2;
            i < ii;
            i++
          ) {
            arr.push(fromBuffer.readUint16BE(offset))

            offset += 2
          }

          obj[key] = arr.length === 1 ? arr[0] : arr

          break;
        case "int32LE":
          for (
            i = 0, ii = size / 4;
            i < ii;
            i++
          ) {
            arr.push(fromBuffer.readUint32LE(offset))

            offset += 4
          }

          obj[key] = arr.length === 1 ? arr[0] : arr

          break;
        case "int32BE":
          for (
            i = 0, ii = size / 4;
            i < ii;
            i++
          ) {
            arr.push(fromBuffer.readUint32BE(offset))

            offset += 4
          }

          obj[key] = arr.length === 1 ? arr[0] : arr

          break;
        case "floatLE":
          for (
            i = 0, ii = size / 4;
            i < ii;
            i++
          ) {
            arr.push(fromBuffer.readFloatLE(offset) || 0)

            offset += 4
          }

          obj[key] = arr.length === 1 ? arr[0] : arr

          break;
        case "floatBE":
          for (
            i = 0, ii = size / 4;
            i < ii;
            i++
          ) {
            arr.push(fromBuffer.readFloatBE(offset) || 0)

            offset += 4
          }

          obj[key] = arr.length === 1 ? arr[0] : arr

          break;
        case "int64LE":
          for (
            i = 0, ii = size / 8;
            i < ii;
            i++
          ) {
            arr.push(fromBuffer.readBigInt64LE(offset))

            offset += 8
          }

          obj[key] = arr.length === 1 ? arr[0] : arr

          break;
        case "int64BE":
          for (
            i = 0, ii = size / 8;
            i < ii;
            i++
          ) {
            arr.push(fromBuffer.readBigInt64BE(offset))

            offset += 8
          }

          obj[key] = arr.length === 1 ? arr[0] : arr

          break;
        case "doubleLE":
          for (
            i = 0, ii = size / 8;
            i < ii;
            i++
          ) {
            arr.push(fromBuffer.readDoubleLE(offset) || 0)

            offset += 8
          }

          obj[key] = arr.length === 1 ? arr[0] : arr

          break;
        case "doubleBE":
          for (
            i = 0, ii = size / 8;
            i < ii;
            i++
          ) {
            arr.push(fromBuffer.readDoubleBE(offset) || 0)

            offset += 8
          }

          obj[key] = arr.length === 1 ? arr[0] : arr

          break;
      }

    }

    return obj
  }

  toType(): string {
    return "bytes[" + this.getSize() + "]"
  }
}
