import React, { useEffect, useState } from 'react';
import { DURATIONS } from '../../config';
import { getAvatarPosition } from '../../utils/getAvatarPosition';
import './Player.css';

export const Player = ({
  avatar,
  index,
  isCurrent,
  isEnhanced,
  isHidden,
  isTarget,
  isKissing,
  playersCount,
}) => {
  const [flyingStarted, setFlyingStarted] = useState(false);
  const [kissEnhance, setKissEnhance] = useState(false);

  let playerXPercent;
  let playerYPercent;
  if (flyingStarted) {
    if (isTarget) {
      [playerXPercent, playerYPercent] = [45, 50];
    } else {
      [playerXPercent, playerYPercent] = [55, 50];
    }
  } else {
    [playerXPercent, playerYPercent] = getAvatarPosition(playersCount, index);
  }

  useEffect(() => {
    if (isKissing) {
      setTimeout(() => {
        setFlyingStarted(true);
      }, DURATIONS.START_FLIGHT);
      setTimeout(() => {
        setFlyingStarted(false);
      }, DURATIONS.RETURN_FLIGHT);
      setTimeout(() => {
        setKissEnhance(true);
      }, DURATIONS.PRE_FLIGHT_ENHANCE);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const classNames = ['player'];
  if (isCurrent) {
    classNames.push('player--current');
  }
  if (isEnhanced || kissEnhance) {
    classNames.push('player--enhanced');
  }
  if (isHidden) {
    classNames.push('player--hidden');
  }
  if (isKissing) {
    classNames.push('player--kissing');
  }

  return (
    <div
      className={classNames.join(' ')}
      style={{
        backgroundImage: `url('${avatar}')`,
        left: `${playerXPercent}%`,
        top: `${playerYPercent}%`,
      }}
    />
  );
};
