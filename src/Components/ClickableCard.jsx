import React, { useEffect, useState } from 'react';

//NOTE JS AND JSX FILES ARE BASICALLY THE SAME BUT IT'S RECOMMEND TO USE JSX FILES INSTEAD 

function ClickableCard({ title = "Hammer Curls", type = "Strength", difficultly = "Beginner", description = "Lorem, ipsum dolor sit amet consectetur adi", muscle = "" }) {

  return (
    <div className="card-wrapper">
      <div className="card">

        <div className='cardDivider'>
          <div className='overlay'>Description: {description} 
            
            
          <div className='clickinfo'>Click For More</div>
            
             </div>

          <p className="cardtitle">{title}</p>
        </div>

        <hr />
        <div className='cardInfoWrapper'>
          <p className="cardinfo">Muscle: {muscle}</p>
          <p className="cardinfo">Type: {type}</p>
          <p className='cardDiff'>{difficultly} </p>
        </div>
      </div>
    </div>

  );
};




export default ClickableCard;