import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";

import FeaturedMix from "./FeaturedMix";
import Header from "./Header";
import Home from "./Home";
import Archive from "./Archive";
import About from "./About";
import Show from "./Show";
import Player from "./Player";

import mixesData from "../data/mixes";
import actions from "../store/actions";

class App extends Component {
  // Here we get our API request and transform it to manageable data (JSON)
  fetchMixed = async () => {
    const { addMix } = this.props;
    mixesData.map(async id => {
      try {
        const response = await fetch(`https://api.mixcloud.com${id}`);
        const data = await response.json();
        addMix(data);
      } catch (error) {
        console.log(error);
      }
    });
  };
  // This will run immediately after App has been inserted into the tree - a.k.a. mounted  (Method built in to react)
  componentDidMount() {
    this.fetchMixed();
  }

  render() {
    return (
      <Router>
        <div>
          <div className="flex-l justify-end">
            {/* TODO styling for FeaturedMix */}
            <FeaturedMix />
            <div className="w-50-l relative z-1">
              {/* TODO styling for Header */}
              <Header />
              {/* TODO Routed page */}
              <Route exact path="/" component={Home} />
              <Route path="/archive" component={Archive} />
              <Route path="/about" component={About} />
              <Route path="/show/:slug" component={Show} />
            </div>
            <Player />
          </div>
          {/* TODO AudioPlayer */}
        </div>
      </Router>
    );
  }
}

export default connect(
  state => state,
  actions
)(App);
