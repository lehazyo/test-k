export const getNextPlayerId = (players, currentPlayerId) => {
  const currentPlayerIndex = players.findIndex(player => player.id === currentPlayerId);
  const nextIndex = currentPlayerIndex + 1 === players.length
    ? 0
    : currentPlayerIndex + 1;
  return players[nextIndex].id;
}