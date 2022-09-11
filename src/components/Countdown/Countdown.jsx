import React from 'react';
import './Countdown.css';

export const Countdown = ({ visible }) => {
  return (
    <div className={`countdown__wrapper${visible ? ' countdown__wrapper--visible' : ''}`}>
      <div className='countdown__digit'>3</div>
      <div className='countdown__digit'>2</div>
      <div className='countdown__digit'>1</div>
    </div>
  )
}
