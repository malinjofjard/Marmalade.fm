import React from "react";
import { connect } from "react-redux";

import Mix from "./Mix";

const Home = ({ mixes = [], ...props }) => (
  <div className="flex flex-wrap justify-between mixes ph3 ph4-l mb5">
    {mixes.slice(0, 6).map((mix, i) => (
      <div className="mix mb4" key={`HomeMix${i}`}>
        <Mix {...props} {...mix} />
      </div>
    ))}
  </div>
);
export default connect(state => state)(Home);
