import React from "react";
import "./MainHeading.scss";

export default function MainHeading({ text }) {
	return (
		<div className="mainHeading">
			<h2>{text}</h2>
		</div>
	);
}
