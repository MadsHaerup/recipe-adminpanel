import { Link } from "@reach/router";
import React from "react";
import "./CategoryItem.scss";

export default function CategoryItem({ ingredient, id }) {
	return (
		<div className="categoryItem">
			<Link to={"/admin/categories/" + id}>{ingredient}</Link>
		</div>
	);
}
