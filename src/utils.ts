export function parseType(type: string) {
  let m: RegExpMatchArray = type.match(/^(bytes|(float|double|u?int[16|32|64]+)[L|B]+E)(\[(\d+)\]|\*)?$/)
  return m !== null
    ?
    {
      datatype: m[1],
      size: Number(m[3] ? m[3] === '*' ? 0 : Number(m[4]) === 0 ? 1 : m[4] : 1)
    }
    :
    null
}
