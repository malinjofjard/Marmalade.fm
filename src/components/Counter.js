import React from "react";
import CountUp from "react-countup";

const Counter = ({ start = 0, end = 0, ...props }) => (
  <div className="f1 b orange mb0 lh-1">
    <CountUp
      start={start}
      end={end}
      separator=","
      useEasing={true}
      useGroupings={true}
      {...props}
    />
  </div>
);
export default Counter;
