/* global Mixcloud */
import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import FeaturedMix from "./FeaturedMix";
import Header from "./Header";
import Home from "./Home";
import Archive from "./Archive";
import About from "./About";
import mixesData from "../data/mixes.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false, //Music player is active
      currentMix: "", // Name of mix that is running
      mixIds: mixesData, // url to all mixes that we will be using
      mix: null, // json data about our mix
      mixes: []
    };
  }

  // Here we get our API request and transform it to manageable data (JSON)
  fetchMixed = async () => {
    const { mixIds } = this.state;
    mixIds.map(async id => {
      try {
        const response = await fetch(`https://api.mixcloud.com${id}`);
        const data = await response.json();
        this.setState((prevState, props) => ({
          mixes: [...prevState.mixes, data]
        }));
      } catch (error) {
        console.log(error);
      }
    });
  };

  // Here we get our music player that will be displayed in the bottom
  mountAudio = async () => {
    this.widget = Mixcloud.PlayerWidget(this.player);
    await this.widget.ready;
    this.widget.events.pause.on(() => this.setState({ playing: false }));
    this.widget.events.play.on(() => this.setState({ playing: true }));
  };

  // This will run immediately after App has been inserted into the tree - a.k.a. mounted  (Method built in to react)
  componentDidMount() {
    this.mountAudio();
    this.fetchMixed();
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
    const [firstMix = {}] = this.state.mixes;
    return (
      <Router>
        <div>
          <div className="flex justify-end">
            {/* TODO styling for FeaturedMix */}
            <FeaturedMix
              {...this.state}
              {...this.actions}
              id={firstMix.key}
              {...firstMix}
            />
            <div className="w-50-l relative z-1">
              {/* TODO styling for Header */}
              <Header />
              {/* TODO Routed page */}
              <Route
                exact
                path="/"
                render={() => <Home {...this.state} {...this.actions} />}
              />
              <Route
                path="/archive"
                render={() => <Archive {...this.state} {...this.actions} />}
              />
              <Route path="/about" render={() => <About {...this.state} />} />
            </div>
          </div>
          {/* TODO AudioPlayer */}

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
        </div>
      </Router>
    );
  }
}

export default App;
