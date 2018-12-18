import React from "react";

const Stat = ({ statName, stat, statWord }) => (
  <div
    className="w-third tc pa3 ba bw2 b--light-gray"
    style={{ marginRight: -2 }}
  >
    <div className="f6 biryani ttu">{statName} </div>
    <div className="f5 biryani-black ttu tracked">
      {stat} {statWord}
    </div>
  </div>
);

const About = ({ mixes }) => (
  <div className="ph3 ph4-l">
    <div className="measure center 1h-copy f4 ph3">
      <p className="mt0">
        Marmalade.fm features the latest and greatest in grooves, beats and
        world music.
      </p>
      <p className="mt0">
        Whether you’re into hip hop, trip hop, classic jazz, fusion jazz, afro
        beat or break beat… we have you covered!
      </p>
      <div className="flex pt3">
        <Stat statName="Featuring..." stat={mixes.length} statWord="mixes" />
        <Stat
          statName="Played..."
          stat={mixes.reduce((accum, current) => accum + current.play_count, 0)}
          statWord="times"
        />
        <Stat
          statName="With..."
          stat={mixes.reduce(
            (accum, current) => accum + current.audio_length,
            0
          )}
          statWord="seconds"
        />
      </div>
    </div>
  </div>
);

export default About;
