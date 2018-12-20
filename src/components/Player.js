/* global Mixcloud */
import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "../store/actions";

class Player extends Component {
  componentWillReceiveProps(nextProps) {
    if (!nextProps.widgetReady) {
      return;
    }

    if (nextProps.currentMix !== this.props.currentMix) {
      this.widget.load(nextProps.currentMix, true);
    } else if (!nextProps.fromMixcloud) {
      this.widget.togglePlay();
    }
  }

  // Here we get our music player that will be displayed in the bottom
  mountAudio = async () => {
    const { playMix, setWidgetReady } = this.props;
    this.widget = Mixcloud.PlayerWidget(this.player);

    // wait til widget is ready
    await this.widget.ready;

    // set state to ready
    setWidgetReady(true);

    this.widget.events.pause.on(() =>
      playMix({ playing: false, fromMixcloud: true })
    );
    this.widget.events.play.on(() =>
      playMix({ playing: true, fromMixcloud: true })
    );
  };

  // This will run immediately after Player has been inserted into the tree - a.k.a. mounted  (Method built in to react)
  componentDidMount() {
    this.mountAudio();
  }

  //actions contains the methods that will be run on the component 'PlayMix' (Home -> Mix -> PlayMix)
  actions = {
    // Toggle music between play and pause
    togglePlay: () => {
      this.widget.togglePlay();
    },

    // Start a new 'mix'
    playMix: mixName => {
      const { currentMix } = this.state;

      if (mixName === currentMix) {
        return this.widget.togglePlay(); // We use return so it won't continue in this function
      }
      this.setState({ currentMix: mixName });
      this.widget.load(mixName, true);
    }
  };

  render() {
    return (
      <iframe
        width="100%"
        height="60"
        src="https://www.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&feed=%2Fmorgonpassetip3%2Ftjuvlyssna-p%C3%A5-stan-att-vara-l%C3%A4kare-uppe-p%C3%A5-kilimanjaro-och-darth-vader-i-eu%2F"
        frameBorder="0"
        className="player db fixed bottom-0 z-5"
        title="bottomPlayer"
        allow="autoplay"
        ref={player => (this.player = player)}
      />
    );
  }
}

export default connect(
  store => store,
  actions
)(Player);
