import React from "react";
import "./Heading.scss";
import { Link } from "@reach/router";
export default function Heading({ heading, btnText }) {
	return (
		<div className="Heading">
			<h2>{heading}</h2>
			<Link to="/admin/create-recipe">+ {btnText}</Link>
		</div>
	);
}
