import { PERCENT_MARGIN } from "../config";

const sinCosToFloat = (value) => {
  return (1 + parseFloat(value.toFixed(3))) * ((100 - PERCENT_MARGIN * 2) / 100);
}

export const getAvatarPosition = (playersCount, index) => {
  const piPerPlayer = Math.PI * 2 / playersCount;
  const playerAngle = piPerPlayer * (index - playersCount * 0.25);
  const playerX = sinCosToFloat(Math.cos(playerAngle));
  const playerY = sinCosToFloat(Math.sin(playerAngle));
  const playerXPercent = PERCENT_MARGIN + playerX * 50;
  const playerYPercent = PERCENT_MARGIN + playerY * 50;

  return [playerXPercent, playerYPercent];
}