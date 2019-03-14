import React from "react";
const InterestList = ({ bubbles }) => {
  // if the user has a ton of bubbles just get the top 4 to render on their profile
  const topBubbles = bubbles.length >= 5 ? bubbles.slice(0, 4) : bubbles;
  return (
    <ul className="interests">
      {topBubbles.map(bubble => (
        <li key={bubble.id}>{bubble.bubble}</li>
      ))}
    </ul>
  );
};

export default InterestList;
