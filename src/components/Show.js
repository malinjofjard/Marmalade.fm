import React, { Component } from "react";
import { connect } from "react-redux";

import Stat from "./Stat";
import differenceInDays from "date-fns/difference_in_days";

import actions from "../store/actions";

const Tag = ({ name, url }) => (
  <div className="mr2 mb2 o-70">
    <a
      className="block f6 link blue b ba bw1 b--blue br2 pv1 ph2 lh-title"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      {name}
    </a>
  </div>
);

const Tags = ({ tags = [] }) => (
  <div className="tags flex flex-wrap">
    {tags.map(tag => (
      <Tag {...tag} />
    ))}
  </div>
);

class Show extends Component {
  componentDidMount() {
    const { setFeaturedMix, id } = this.props;
    setFeaturedMix(id);
  }
  componentWillUnmount() {
    const { setFeaturedMix } = this.props;
    setFeaturedMix(false);
  }

  render() {
    const {
      tags,
      description,
      play_count,
      created_time,
      audio_length
    } = this.props;

    return (
      <div className="ph3 ph4-l pad-bottom">
        <div className="measure center 1h-copy">
          <Tags tags={tags} />
          <p>{description}</p>

          <Stat statName="Plays" stat={play_count || 0} statWord="times" />
          <Stat
            statName="Uploaded"
            stat={differenceInDays(
              new Date().toISOString(),
              created_time || new Date().toISOString()
            )}
            statWord="days ago"
          />
          <Stat
            statName="Lasting for"
            stat={(audio_length || 0) / 60}
            statWord="minutes"
          />
        </div>
      </div>
    );
  }
}

// This is a selector
const getMix = (mixes, slug) => {
  const [mix = {}] = mixes.filter(mix => mix.slug === slug);
  return mix;
};

export default connect(
  (state, props) => ({
    ...getMix(state.mixes, props.match.params.slug)
  }),
  actions
)(Show);
