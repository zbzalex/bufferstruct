import type { RawStruct } from "./types";
export declare class BufferStruct<T extends RawStruct> {
    private struct;
    constructor(struct: T);
    getTypeSize(type: string): number;
    pack<Props extends {
        [P in keyof T]: string | number | bigint | Buffer | Array<number>;
    }>(data: Props): Buffer;
    unpack(fromBuffer: Buffer): {
        [key: string]: number | number[] | BigInt | Buffer | BigInt[];
    };
}
