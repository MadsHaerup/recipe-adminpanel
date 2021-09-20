import React from "react";
import "./ItemHeading.scss";

export default function ItemHeading({ title1, title2, title3 }) {
	return (
		<div className="itemHeading">
			<p>{title1}</p>
			<p>{title2} </p>
			<p>{title3} </p>
		</div>
	);
}
