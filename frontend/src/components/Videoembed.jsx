import React from "react";

const YoutubeEmbed = ({ embedId, className, style }) => {
	return <div className={className} style={{...style, paddingBottom: "56.25%", position: "relative"}}>
		<iframe
			src={`https://www.youtube.com/embed/${embedId}`}
			style={{width: "100%", height: "100%", position: "absolute", top: "0px", left: "0px", borderRadius: "8px"}}
			frameBorder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			allowFullScreen
			title="Embedded youtube"
		/>
	</div>;
};


export default YoutubeEmbed;