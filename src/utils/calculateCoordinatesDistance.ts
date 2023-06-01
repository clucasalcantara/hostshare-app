export type CoordnatesShape = {
  from: { latitude: number; longitude: number };
  to: { latitude: number; longitude: number };
};

export default function getDistance({ from, to }: CoordnatesShape) {
  let y = from.longitude - to.longitude;
  let x = from.latitude - to.latitude;

  const result = Math.floor(Math.sqrt(x * x + y * y));

  return !isNaN(result) ? result : 0;
}
