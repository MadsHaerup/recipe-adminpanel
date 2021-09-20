import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import TokenContext from "../Context/TokenContext";

export default function SingleCategory({ id }) {
	var token = useContext(TokenContext)[0];
	const [content, setContent] = useState([]);
	const [recipeContent, setRecipeContent] = useState([]);

	useEffect(() => {
		axios
			.get("https://roskilde-recipe-api.herokuapp.com/categories/" + id, {
				headers: {
					Authorization: `Bearer ${token.jwt}`,
				},
			})
			.then((response) => {
				console.log(response.data);
				setContent(response.data);
			});
	}, [setContent]);

	useEffect(() => {
		axios
			.get("https://roskilde-recipe-api.herokuapp.com/recipes/", {
				headers: {
					Authorization: `Bearer ${token.jwt}`,
				},
			})
			.then((response) => {
				console.log(response.data);
				setRecipeContent(response.data);
			});
	}, [setRecipeContent]);
	return (
		<div>
			<h1>{content.name}</h1>
			{recipeContent.map((recipe) => (
				<div>
					{recipe.categories.map((category) => (category.name === content.name ? <p>{recipe.title}</p> : null))}
				</div>
			))}
		</div>
	);
}
