import React from "react";
import './Bottle.css';

const FULL_CIRCLE_DEGREES = 360;
const NUMBER_OF_ROTATIONS = 4;

export const Bottle = ({
  isSpinning,
  targetPlayerIndex,
  playersCount,
}) => {
  const audio = new Audio('/sound/spinning.mp3');
  if (isSpinning) {
    audio.play();
  }

  const anglePerPlayer = FULL_CIRCLE_DEGREES / playersCount;
  const targetPlayerDegrees = anglePerPlayer * targetPlayerIndex;
  const finalDegrees = NUMBER_OF_ROTATIONS * FULL_CIRCLE_DEGREES + targetPlayerDegrees;

  const styleTextContent = `
    .bottle {
      transform: rotate(${targetPlayerDegrees}deg);
    }
    .bottle--spinning {
      transform: rotate(${finalDegrees}deg);
    }
  `

  return (
    <>
      <div className={`bottle${isSpinning ? ' bottle--spinning' : ''}`} />
      <style>
        {styleTextContent}
      </style>
    </>
  )
}
