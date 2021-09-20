import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import TokenContext from "../Context/TokenContext";
import Heading from "../Heading/Heading";
import ItemBar from "../ItemBar/ItemBar";
import ItemHeading from "../ItemHeading/ItemHeading";

export default function Recipes() {
	const [recipes, setRecipes] = useState([]);
	var token = useContext(TokenContext)[0];

	useEffect(() => {
		axios.get("https://roskilde-recipe-api.herokuapp.com/recipes").then((response) => {
			var fliteredList = response.data.filter((item) => item.author.id === token.user.id);
			console.log(response.data);
			setRecipes(fliteredList);
		});
	}, [token, setRecipes]);

	return (
		<div>
			<div>
				<Heading heading="Recipes" btnText="Create new recipe" />
			</div>
			<div>
				<ItemHeading title1="Recipes" title2="Protein" title3="Calories" />
				{recipes.map((recipe) => (
					<ItemBar key={recipe.id} id={recipe.id} text={recipe.title} protein={recipe.protein} kcal={recipe.kcal} />
				))}
			</div>
		</div>
	);
}
