import type { RawStruct } from "./types"
import { parseType } from "./utils"

export class BufferStruct<T extends RawStruct> {
  private struct: T

  constructor(struct: T) {
    this.struct = struct
  }

  getTypeSize(type: string): number {
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

    return 0
  }

  pack<Props extends { [P in keyof T]: string | number | bigint | Buffer | Array<number> }>(data: Props): Buffer {
    let buf = Buffer.alloc(0)
    let keys = Object.keys(this.struct)

    if (JSON.stringify(Object.keys(data).sort()) !== JSON.stringify(Object.keys(this.struct).sort()))
      throw new Error("Structure mismatch");

    for (const key of keys) {
      const dataArr = Array.isArray(data[key]) ? data[key] : [data[key]]
      const type = parseType(this.struct[key])
      const typeSize = this.getTypeSize(type.datatype)

      let i, ii
      let bytesSize = type.size === 0 ? dataArr.length * typeSize : typeSize * type.size
      let buf2 = Buffer.alloc(bytesSize)
      let buf3
      let offset = 0

      switch (type.datatype) {
        case "bytes":
          const sourceBuffer = typeof data[key] === 'string' ? Buffer.from(data[key] as string) : data[key] as Buffer

          bytesSize = type.size === 0 ? sourceBuffer.byteLength : typeSize * type.size
          buf2 = Buffer.alloc(bytesSize)

          for (
            i = 0, ii = bytesSize;
            i < ii;
            i++
          ) {
            buf2.writeUint8(sourceBuffer[i], offset)

            offset++
          }

          break;

        case "int16LE":
          for (
            i = 0, ii = bytesSize / 2;
            i < ii;
            i++
          ) {
            buf2.writeInt16LE(
              Number(dataArr[i]),
              offset
            )

            offset += 2
          }
          break;
        case "int16BE":
          for (
            i = 0, ii = bytesSize / 2;
            i < ii;
            i++
          ) {
            buf2.writeInt16BE(
              Number(dataArr[i]),
              offset
            )

            offset += 2
          }
          break;
        case "uint16LE":
          for (
            i = 0, ii = bytesSize / 2;
            i < ii;
            i++
          ) {
            buf2.writeUint16LE(
              Number(dataArr[i]),
              offset
            )

            offset += 2
          }
          break;
        case "uint16BE":
          for (
            i = 0, ii = bytesSize / 2;
            i < ii;
            i++
          ) {
            buf2.writeUint16BE(
              Number(dataArr[i]),
              offset
            )

            offset += 2
          }
          break;
        case "int32LE":
          for (
            i = 0, ii = bytesSize / 4;
            i < ii;
            i++
          ) {
            buf2.writeInt32LE(
              Number(dataArr[i]),
              offset
            )

            offset += 4
          }
          break;
        case "int32BE":
          for (
            i = 0, ii = bytesSize / 4;
            i < ii;
            i++
          ) {
            buf2.writeInt32BE(
              Number(dataArr[i]),
              offset
            )

            offset += 4
          }
          break;
        case "uint32LE":
          for (
            i = 0, ii = bytesSize / 4;
            i < ii;
            i++
          ) {
            buf2.writeUint32LE(
              Number(dataArr[i]),
              offset
            )

            offset += 4
          }
          break;
        case "uint32BE":
          for (
            i = 0, ii = bytesSize / 4;
            i < ii;
            i++
          ) {
            buf2.writeUint32BE(
              Number(dataArr[i]),
              offset
            )

            offset += 4
          }
          break;
        case "floatLE":
          for (
            i = 0, ii = bytesSize / 4;
            i < ii;
            i++
          ) {
            buf2.writeFloatLE(
              Number(dataArr[i]),
              offset
            )

            offset += 4
          }
          break;
        case "floatBE":
          for (
            i = 0, ii = bytesSize / 4;
            i < ii;
            i++
          ) {
            buf2.writeFloatBE(
              Number(dataArr[i]),
              offset
            )

            offset += 4
          }
          break;
        case "int64LE":
          for (
            i = 0, ii = bytesSize / 8;
            i < ii;
            i++
          ) {
            buf2.writeBigInt64LE(
              BigInt(dataArr[i] as string),
              offset
            )

            offset += 8
          }
          break;
        case "int64BE":
          for (
            i = 0, ii = bytesSize / 8;
            i < ii;
            i++
          ) {
            buf2.writeBigInt64BE(
              BigInt(dataArr[i] as string),
              offset
            )

            offset += 8
          }
          break;
        case "uint64LE":
          for (
            i = 0, ii = bytesSize / 8;
            i < ii;
            i++
          ) {
            buf2.writeBigUint64LE(
              BigInt(dataArr[i] as string),
              offset
            )

            offset += 8
          }
          break;
        case "uint64BE":
          for (
            i = 0, ii = bytesSize / 8;
            i < ii;
            i++
          ) {
            buf2.writeBigUint64BE(
              BigInt(dataArr[i] as string),
              offset
            )

            offset += 8
          }
          break;
        case "doubleLE":
          for (
            i = 0, ii = bytesSize / 8;
            i < ii;
            i++
          ) {
            buf2.writeDoubleLE(
              Number(dataArr[i]),
              offset
            )

            offset += 8
          }
          break;
        case "doubleBE":
          for (
            i = 0, ii = bytesSize / 8;
            i < ii;
            i++
          ) {
            buf2.writeDoubleBE(
              Number(dataArr[i]),
              offset
            )

            offset += 8
          }
          break;
      }

      // Create buf
      buf3 = Buffer.alloc(buf.byteLength + bytesSize)

      // Copy original buf
      buf.copy(buf3)
      // Copy new buf
      buf2.copy(buf3, buf.byteLength)

      buf2 = null

      // Set net buffer
      buf  = buf3

      buf3 = null
      
    }

    return buf
  }

  unpack(fromBuffer: Buffer) {
    let offset = 0
    let obj: { [key: string]: number | BigInt | number[] | BigInt[] | Buffer } = {}
    let keys = Object.keys(this.struct)

    for (const key of keys) {

      const type = parseType(this.struct[key])
      const typeSize = this.getTypeSize(type.datatype)

      let i
      let ii
      let arr: any[] = []
      let bytesSize = type.size === 0
        ? fromBuffer.byteLength - offset
        : typeSize * type.size

      switch (type.datatype) {
        case "bytes":

          for (
            i = 0, ii = bytesSize;
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
            i = 0, ii = bytesSize / 2;
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
            i = 0, ii = bytesSize / 2;
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
            i = 0, ii = bytesSize / 4;
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
            i = 0, ii = bytesSize / 4;
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
            i = 0, ii = bytesSize / 4;
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
            i = 0, ii = bytesSize / 4;
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
            i = 0, ii = bytesSize / 8;
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
            i = 0, ii = bytesSize / 8;
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
            i = 0, ii = bytesSize / 8;
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
            i = 0, ii = bytesSize / 8;
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
}
