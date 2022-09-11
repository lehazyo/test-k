import React from "react";
import './Counter.css';

export const Counter = ({ value, isAnimated }) =>
  <div className={`counter${isAnimated ? ' counter--animated' : ''}`}>{value}</div>