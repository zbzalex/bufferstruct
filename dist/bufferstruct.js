"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BufferStruct = void 0;
var _utils = require("./utils");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var BufferStruct = exports.BufferStruct = /*#__PURE__*/function () {
  function BufferStruct(struct) {
    _classCallCheck(this, BufferStruct);
    _defineProperty(this, "struct", void 0);
    this.struct = struct;
  }
  return _createClass(BufferStruct, [{
    key: "getTypeSize",
    value: function getTypeSize(type) {
      switch (type) {
        case "bytes":
          return 1;
        case "int16LE":
        case "int16BE":
        case "uint16LE":
        case "uint16BE":
          return 2;
        case "int32LE":
        case "int32BE":
        case "uint32LE":
        case "uint32BE":
        case "floatLE":
        case "floatBE":
          return 4;
        case "int64LE":
        case "int64BE":
        case "uint64LE":
        case "uint64BE":
        case "doubleLE":
        case "doubleBE":
          return 8;
      }
      return 0;
    }
  }, {
    key: "pack",
    value: function pack(data) {
      var buf = Buffer.alloc(0);
      var keys = Object.keys(this.struct);
      if (JSON.stringify(Object.keys(data).sort()) !== JSON.stringify(Object.keys(this.struct).sort())) throw new Error("Structure mismatch");
      for (var _i = 0, _keys = keys; _i < _keys.length; _i++) {
        var key = _keys[_i];
        var dataArr = Array.isArray(data[key]) ? data[key] : [data[key]];
        var type = (0, _utils.parseType)(this.struct[key]);
        var typeSize = this.getTypeSize(type.datatype);
        var i = void 0,
          ii = void 0;
        var bytesSize = type.size === 0 ? dataArr.length * typeSize : typeSize * type.size;
        var buf2 = Buffer.alloc(bytesSize);
        var buf3 = void 0;
        var offset = 0;
        switch (type.datatype) {
          case "bytes":
            var sourceBuffer = typeof data[key] === 'string' ? Buffer.from(data[key]) : data[key];
            bytesSize = type.size === 0 ? sourceBuffer.byteLength : typeSize * type.size;
            buf2 = Buffer.alloc(bytesSize);
            for (i = 0, ii = bytesSize; i < ii; i++) {
              buf2.writeUint8(sourceBuffer[i], offset);
              offset++;
            }
            break;
          case "int16LE":
            for (i = 0, ii = bytesSize / 2; i < ii; i++) {
              buf2.writeInt16LE(Number(dataArr[i]), offset);
              offset += 2;
            }
            break;
          case "int16BE":
            for (i = 0, ii = bytesSize / 2; i < ii; i++) {
              buf2.writeInt16BE(Number(dataArr[i]), offset);
              offset += 2;
            }
            break;
          case "uint16LE":
            for (i = 0, ii = bytesSize / 2; i < ii; i++) {
              buf2.writeUint16LE(Number(dataArr[i]), offset);
              offset += 2;
            }
            break;
          case "uint16BE":
            for (i = 0, ii = bytesSize / 2; i < ii; i++) {
              buf2.writeUint16BE(Number(dataArr[i]), offset);
              offset += 2;
            }
            break;
          case "int32LE":
            for (i = 0, ii = bytesSize / 4; i < ii; i++) {
              buf2.writeInt32LE(Number(dataArr[i]), offset);
              offset += 4;
            }
            break;
          case "int32BE":
            for (i = 0, ii = bytesSize / 4; i < ii; i++) {
              buf2.writeInt32BE(Number(dataArr[i]), offset);
              offset += 4;
            }
            break;
          case "uint32LE":
            for (i = 0, ii = bytesSize / 4; i < ii; i++) {
              buf2.writeUint32LE(Number(dataArr[i]), offset);
              offset += 4;
            }
            break;
          case "uint32BE":
            for (i = 0, ii = bytesSize / 4; i < ii; i++) {
              buf2.writeUint32BE(Number(dataArr[i]), offset);
              offset += 4;
            }
            break;
          case "floatLE":
            for (i = 0, ii = bytesSize / 4; i < ii; i++) {
              buf2.writeFloatLE(Number(dataArr[i]), offset);
              offset += 4;
            }
            break;
          case "floatBE":
            for (i = 0, ii = bytesSize / 4; i < ii; i++) {
              buf2.writeFloatBE(Number(dataArr[i]), offset);
              offset += 4;
            }
            break;
          case "int64LE":
            for (i = 0, ii = bytesSize / 8; i < ii; i++) {
              buf2.writeBigInt64LE(BigInt(dataArr[i]), offset);
              offset += 8;
            }
            break;
          case "int64BE":
            for (i = 0, ii = bytesSize / 8; i < ii; i++) {
              buf2.writeBigInt64BE(BigInt(dataArr[i]), offset);
              offset += 8;
            }
            break;
          case "uint64LE":
            for (i = 0, ii = bytesSize / 8; i < ii; i++) {
              buf2.writeBigUint64LE(BigInt(dataArr[i]), offset);
              offset += 8;
            }
            break;
          case "uint64BE":
            for (i = 0, ii = bytesSize / 8; i < ii; i++) {
              buf2.writeBigUint64BE(BigInt(dataArr[i]), offset);
              offset += 8;
            }
            break;
          case "doubleLE":
            for (i = 0, ii = bytesSize / 8; i < ii; i++) {
              buf2.writeDoubleLE(Number(dataArr[i]), offset);
              offset += 8;
            }
            break;
          case "doubleBE":
            for (i = 0, ii = bytesSize / 8; i < ii; i++) {
              buf2.writeDoubleBE(Number(dataArr[i]), offset);
              offset += 8;
            }
            break;
        }

        // Create buf
        buf3 = Buffer.alloc(buf.byteLength + bytesSize);

        // Copy original buf
        buf.copy(buf3);
        // Copy new buf
        buf2.copy(buf3, buf.byteLength);
        buf2 = null;

        // Set net buffer
        buf = buf3;
        buf3 = null;
      }
      return buf;
    }
  }, {
    key: "unpack",
    value: function unpack(fromBuffer) {
      var offset = 0;
      var obj = {};
      var keys = Object.keys(this.struct);
      for (var _i2 = 0, _keys2 = keys; _i2 < _keys2.length; _i2++) {
        var key = _keys2[_i2];
        var type = (0, _utils.parseType)(this.struct[key]);
        var typeSize = this.getTypeSize(type.datatype);
        var i = void 0;
        var ii = void 0;
        var arr = [];
        var bytesSize = type.size === 0 ? fromBuffer.byteLength - offset : typeSize * type.size;
        switch (type.datatype) {
          case "bytes":
            for (i = 0, ii = bytesSize; i < ii; i++) {
              arr.push(fromBuffer.readUint8(offset));
              offset++;
            }
            obj[key] = Buffer.from(arr);
            break;
          case "int16LE":
            for (i = 0, ii = bytesSize / 2; i < ii; i++) {
              arr.push(fromBuffer.readUint16LE(offset));
              offset += 2;
            }
            obj[key] = arr.length === 1 ? arr[0] : arr;
            break;
          case "int16BE":
            for (i = 0, ii = bytesSize / 2; i < ii; i++) {
              arr.push(fromBuffer.readUint16BE(offset));
              offset += 2;
            }
            obj[key] = arr.length === 1 ? arr[0] : arr;
            break;
          case "int32LE":
            for (i = 0, ii = bytesSize / 4; i < ii; i++) {
              arr.push(fromBuffer.readUint32LE(offset));
              offset += 4;
            }
            obj[key] = arr.length === 1 ? arr[0] : arr;
            break;
          case "int32BE":
            for (i = 0, ii = bytesSize / 4; i < ii; i++) {
              arr.push(fromBuffer.readUint32BE(offset));
              offset += 4;
            }
            obj[key] = arr.length === 1 ? arr[0] : arr;
            break;
          case "floatLE":
            for (i = 0, ii = bytesSize / 4; i < ii; i++) {
              arr.push(fromBuffer.readFloatLE(offset) || 0);
              offset += 4;
            }
            obj[key] = arr.length === 1 ? arr[0] : arr;
            break;
          case "floatBE":
            for (i = 0, ii = bytesSize / 4; i < ii; i++) {
              arr.push(fromBuffer.readFloatBE(offset) || 0);
              offset += 4;
            }
            obj[key] = arr.length === 1 ? arr[0] : arr;
            break;
          case "int64LE":
            for (i = 0, ii = bytesSize / 8; i < ii; i++) {
              arr.push(fromBuffer.readBigInt64LE(offset));
              offset += 8;
            }
            obj[key] = arr.length === 1 ? arr[0] : arr;
            break;
          case "int64BE":
            for (i = 0, ii = bytesSize / 8; i < ii; i++) {
              arr.push(fromBuffer.readBigInt64BE(offset));
              offset += 8;
            }
            obj[key] = arr.length === 1 ? arr[0] : arr;
            break;
          case "doubleLE":
            for (i = 0, ii = bytesSize / 8; i < ii; i++) {
              arr.push(fromBuffer.readDoubleLE(offset) || 0);
              offset += 8;
            }
            obj[key] = arr.length === 1 ? arr[0] : arr;
            break;
          case "doubleBE":
            for (i = 0, ii = bytesSize / 8; i < ii; i++) {
              arr.push(fromBuffer.readDoubleBE(offset) || 0);
              offset += 8;
            }
            obj[key] = arr.length === 1 ? arr[0] : arr;
            break;
        }
      }
      return obj;
    }
  }]);
}();