export interface Coordinate {
  lat: number
  lon: number
}

export function getDistanceBetweenCoordinates(
  from: Coordinate,
  to: Coordinate,
) {
  if (from.lat === to.lat && from.lon === to.lon) {
    return 0
  }

  const fromRadian = (Math.PI * from.lat) / 180
  const toRadian = (Math.PI * to.lat) / 180

  const theta = from.lon - to.lon
  const radTheta = (Math.PI * theta) / 180

  let dist =
    Math.sin(fromRadian) * Math.sin(toRadian) +
    Math.cos(fromRadian) * Math.cos(toRadian) * Math.cos(radTheta)

  if (dist > 1) {
    dist = 1
  }

  dist = Math.acos(dist)
  dist = (dist * 180) / Math.PI
  dist = dist * 60 * 1.1515
  dist = dist * 1.609344

  return dist
}
