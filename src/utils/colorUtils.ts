function hashCode(data: string): number {
  var hash = 0
  for (var i = 0; i < data.length; i++) {
    hash = data.charCodeAt(i) + ((hash << 5) - hash)
  }

  return hash
}

function integerToRGB(integer: number) {
  var c = (integer & 0x00ffffff).toString(16).toUpperCase()

  return '00000'.substring(0, 6 - c.length) + c
}

export function deriveRGBColorFromString(data: string) {
  return integerToRGB(hashCode(data))
}
