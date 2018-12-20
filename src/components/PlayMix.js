import React from "react";
import { connect } from "react-redux";
import classNames from "classnames";

import actions from "../store/actions";

const PlayMix = ({
  playMix,
  currentMix,
  playing,
  children,
  className,
  id,
  fromMixcloud
}) => (
  <div
    className={classNames({
      [className]: className,
      playing: id === currentMix && playing && fromMixcloud,
      loading: id === currentMix && !playing && !fromMixcloud
    })}
    onClick={() => playMix({ currentMix: id, fromMixcloud: false })}
  >
    {children}
  </div>
);
export default connect(
  state => state,
  actions
)(PlayMix);
