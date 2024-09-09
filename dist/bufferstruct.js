"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BufferStruct = void 0;
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
    key: "getSize",
    value: function getSize() {
      var size = 0;
      var keys = Object.keys(this.struct);
      for (var _i = 0, _keys = keys; _i < _keys.length; _i++) {
        var key = _keys[_i];
        size += this.getTypeSize(this.struct[key]);
      }
      return size;
    }
  }, {
    key: "getTypeSize",
    value: function getTypeSize(type) {
      var m = null;
      if ((m = type.match(/^(\w+)\[(\d+)\]$/)) !== null) {
        var _type = m[1];
        var size = Number(m[2]);
        return this.getTypeSize(_type) * size;
      } else {
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
      }
      return 0;
    }
  }, {
    key: "pack",
    value: function pack(data) {
      var buf = Buffer.alloc(this.getSize());
      var offset = 0;
      var keys = Object.keys(this.struct);
      if (JSON.stringify(Object.keys(data).sort()) !== JSON.stringify(Object.keys(this.struct).sort())) throw new Error("Structure mismatch");
      for (var _i2 = 0, _keys2 = keys; _i2 < _keys2.length; _i2++) {
        var key = _keys2[_i2];
        var type = this.struct[key].split('[')[0];
        var size = this.getTypeSize(this.struct[key]);
        var i = void 0;
        var ii = void 0;
        var dataArr = Array.isArray(data[key]) ? data[key] : [data[key]];
        switch (type) {
          case "bytes":
            if (_typeof(data[key]) === 'object') {
              for (i = 0, ii = size; i < ii; i++) {
                buf.writeUint8(data[key][i], offset);
                offset++;
              }
            } else {
              for (i = 0, ii = size; i < ii; i++) {
                // @ts-ignore
                buf.writeUint8(data[key].length > i ? data[key].charCodeAt(i) : 0, offset);
                offset++;
              }
            }
            break;
          case "int16LE":
            for (i = 0, ii = size / 2; i < ii; i++) {
              buf.writeInt16LE(Number(dataArr[i]), offset);
              offset += 2;
            }
            break;
          case "int16BE":
            for (i = 0, ii = size / 2; i < ii; i++) {
              buf.writeInt16BE(Number(dataArr[i]), offset);
              offset += 2;
            }
            break;
          case "uint16LE":
            for (i = 0, ii = size / 2; i < ii; i++) {
              buf.writeUint16LE(Number(dataArr[i]), offset);
              offset += 2;
            }
            break;
          case "uint16BE":
            for (i = 0, ii = size / 2; i < ii; i++) {
              buf.writeUint16BE(Number(dataArr[i]), offset);
              offset += 2;
            }
            break;
          case "int32LE":
            for (i = 0, ii = size / 4; i < ii; i++) {
              buf.writeInt32LE(Number(dataArr[i]), offset);
              offset += 4;
            }
            break;
          case "int32BE":
            for (i = 0, ii = size / 4; i < ii; i++) {
              buf.writeInt32BE(Number(dataArr[i]), offset);
              offset += 4;
            }
            break;
          case "uint32LE":
            for (i = 0, ii = size / 4; i < ii; i++) {
              buf.writeUint32LE(Number(dataArr[i]), offset);
              offset += 4;
            }
            break;
          case "uint32BE":
            for (i = 0, ii = size / 4; i < ii; i++) {
              buf.writeUint32BE(Number(dataArr[i]), offset);
              offset += 4;
            }
            break;
          case "floatLE":
            for (i = 0, ii = size / 4; i < ii; i++) {
              buf.writeFloatLE(Number(dataArr[i]), offset);
              offset += 4;
            }
            break;
          case "floatBE":
            for (i = 0, ii = size / 4; i < ii; i++) {
              buf.writeFloatBE(Number(dataArr[i]), offset);
              offset += 4;
            }
            break;
          case "int64LE":
            for (i = 0, ii = size / 8; i < ii; i++) {
              buf.writeBigInt64LE(BigInt(dataArr[i]), offset);
              offset += 8;
            }
            break;
          case "int64BE":
            for (i = 0, ii = size / 8; i < ii; i++) {
              buf.writeBigInt64BE(BigInt(dataArr[i]), offset);
              offset += 8;
            }
            break;
          case "uint64LE":
            for (i = 0, ii = size / 8; i < ii; i++) {
              buf.writeBigUint64LE(BigInt(dataArr[i]), offset);
              offset += 8;
            }
            break;
          case "uint64BE":
            for (i = 0, ii = size / 8; i < ii; i++) {
              buf.writeBigUint64BE(BigInt(dataArr[i]), offset);
              offset += 8;
            }
            break;
          case "doubleLE":
            for (i = 0, ii = size / 8; i < ii; i++) {
              buf.writeDoubleLE(Number(dataArr[i]), offset);
              offset += 8;
            }
            break;
          case "doubleBE":
            for (i = 0, ii = size / 8; i < ii; i++) {
              buf.writeDoubleBE(Number(dataArr[i]), offset);
              offset += 8;
            }
            break;
        }
      }
      return buf;
    }
  }, {
    key: "unpack",
    value: function unpack(fromBuffer) {
      var offset = 0;
      var obj = {};
      var keys = Object.keys(this.struct);
      for (var _i3 = 0, _keys3 = keys; _i3 < _keys3.length; _i3++) {
        var key = _keys3[_i3];
        var type = this.struct[key].split('[')[0];
        var size = this.getTypeSize(this.struct[key]);
        var i = void 0;
        var ii = void 0;
        var arr = [];
        switch (type) {
          case "bytes":
            for (i = 0, ii = size; i < ii; i++) {
              arr.push(fromBuffer.readUint8(offset));
              offset++;
            }
            obj[key] = Buffer.from(arr);
            break;
          case "int16LE":
            for (i = 0, ii = size / 2; i < ii; i++) {
              arr.push(fromBuffer.readUint16LE(offset));
              offset += 2;
            }
            obj[key] = arr.length === 1 ? arr[0] : arr;
            break;
          case "int16BE":
            for (i = 0, ii = size / 2; i < ii; i++) {
              arr.push(fromBuffer.readUint16BE(offset));
              offset += 2;
            }
            obj[key] = arr.length === 1 ? arr[0] : arr;
            break;
          case "int32LE":
            for (i = 0, ii = size / 4; i < ii; i++) {
              arr.push(fromBuffer.readUint32LE(offset));
              offset += 4;
            }
            obj[key] = arr.length === 1 ? arr[0] : arr;
            break;
          case "int32BE":
            for (i = 0, ii = size / 4; i < ii; i++) {
              arr.push(fromBuffer.readUint32BE(offset));
              offset += 4;
            }
            obj[key] = arr.length === 1 ? arr[0] : arr;
            break;
          case "floatLE":
            for (i = 0, ii = size / 4; i < ii; i++) {
              arr.push(fromBuffer.readFloatLE(offset) || 0);
              offset += 4;
            }
            obj[key] = arr.length === 1 ? arr[0] : arr;
            break;
          case "floatBE":
            for (i = 0, ii = size / 4; i < ii; i++) {
              arr.push(fromBuffer.readFloatBE(offset) || 0);
              offset += 4;
            }
            obj[key] = arr.length === 1 ? arr[0] : arr;
            break;
          case "int64LE":
            for (i = 0, ii = size / 8; i < ii; i++) {
              arr.push(fromBuffer.readBigInt64LE(offset));
              offset += 8;
            }
            obj[key] = arr.length === 1 ? arr[0] : arr;
            break;
          case "int64BE":
            for (i = 0, ii = size / 8; i < ii; i++) {
              arr.push(fromBuffer.readBigInt64BE(offset));
              offset += 8;
            }
            obj[key] = arr.length === 1 ? arr[0] : arr;
            break;
          case "doubleLE":
            for (i = 0, ii = size / 8; i < ii; i++) {
              arr.push(fromBuffer.readDoubleLE(offset) || 0);
              offset += 8;
            }
            obj[key] = arr.length === 1 ? arr[0] : arr;
            break;
          case "doubleBE":
            for (i = 0, ii = size / 8; i < ii; i++) {
              arr.push(fromBuffer.readDoubleBE(offset) || 0);
              offset += 8;
            }
            obj[key] = arr.length === 1 ? arr[0] : arr;
            break;
        }
      }
      return obj;
    }
  }, {
    key: "toType",
    value: function toType() {
      return "bytes[" + this.getSize() + "]";
    }
  }]);
}();