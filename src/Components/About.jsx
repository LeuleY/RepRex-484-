import React, { useState } from 'react';
import NavBar from './NavBar';
import Plot from "react-plotly.js";

const testVals = [
  {x:new Date("2024-11-01T04:10:20.000+00:00"), y:3},
  {x:new Date("2024-11-02T04:10:20.000+00:00"), y:2},
  {x:new Date("2024-11-06T04:10:20.000+00:00"), y:6},
  {x:new Date("2024-11-09T04:10:20.000+00:00"), y:0},
  {x:new Date("2024-11-03T04:10:20.000+00:00"), y:10}
]
testVals.sort((a, b) => (a.x - b.x));
console.log(testVals);
const data = [{
  x:[testVals[0].x, testVals[1].x, testVals[2].x, testVals[3].x, testVals[4].x],
  y:[testVals[0].y, testVals[1].y, testVals[2].y, testVals[3].y, testVals[4].y],
  type:"scatter",
}];
const About = () => {
  
  // plot(data);

  return (
    <div>
      <NavBar />
      {true && <Plot data={data} config={{displayModeBar:false, staticPlot:true}} layout={{width:320, 
                                                                                           height:240, 
                                                                                           title:"A test plot", 
                                                                                           xaxis:{title:{text:"Test x"}}, 
                                                                                           yaxis:{title:{text:"Test y"}}}}/>}
      <h2>REXLOG</h2>
      <p>RepRex is your ultimate fitness companion app...</p>
    </div>
  );
};

export default About;
