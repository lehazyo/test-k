import React from 'react';
import { BASE_DIRECTORY } from '../../config';
import { getPlayerIndexById } from '../../utils/getPlayerIndexById';
import { Player } from '../Player/Player';
import './KissScene.css';

export const KissScene = ({
  players,
  currentPlayer,
  targetPlayer,
}) => {
  const audio = new Audio(`${BASE_DIRECTORY}/sound/kiss.mp3`);
  audio.play();

  const playersCount = players.length;
  const currentPlayerIndex = getPlayerIndexById(players, currentPlayer.id);
  const targetPlayerIndex = getPlayerIndexById(players, targetPlayer.id);

  const currentPlayerAvatar = (
    <Player
      avatar={currentPlayer.avatar}
      index={currentPlayerIndex}
      playersCount={playersCount}
      isCurrent
      isKissing
    />
  );
  const targetPlayerAvatar = (
    <Player
      avatar={targetPlayer.avatar}
      index={targetPlayerIndex}
      playersCount={playersCount}
      isTarget
      isKissing
    />
  );

  return (
    <div className='kissing__wrapper'>
      {currentPlayerAvatar}
      {targetPlayerAvatar}
      <div className='kissing__lips' />
    </div>
  );
}
