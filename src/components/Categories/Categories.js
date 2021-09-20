import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import TokenContext from "../Context/TokenContext";
import MainHeading from "../MainHeading/MainHeading";
import CategoryItem from "./CategoryItem";
import "./Categories.scss";

export default function Categories() {
	var token = useContext(TokenContext)[0];
	const [content, setContent] = useState([]);

	useEffect(() => {
		axios
			.get("https://roskilde-recipe-api.herokuapp.com/categories", {
				headers: {
					Authorization: `Bearer ${token.jwt}`,
				},
			})
			.then((response) => {
				console.log(response.data);
				setContent(response.data);
			});
	}, [setContent]);

	return (
		<div>
			<MainHeading text="Categories" />

			<div className="container">
				{content.map((content) => (
					<CategoryItem ingredient={content.name} id={content.id} key={content.id} />
				))}
			</div>
		</div>
	);
}
