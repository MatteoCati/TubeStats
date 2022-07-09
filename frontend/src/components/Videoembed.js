import React from "react";
import PropTypes from "prop-types";

const YoutubeEmbed = ({ embedId, className }) => {
  return <div className={className} style={{paddingBottom: "56.25%", position: "relative"}}>
    <iframe
      src={`https://www.youtube.com/embed/${embedId}`}
      style={{width: "100%", height: "100%", position: "absolute", top: "0px", left: "0px"}}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </div>
};

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired
};

export default YoutubeEmbed;