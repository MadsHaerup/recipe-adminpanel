import React, { useEffect, useState } from "react";
import { useContext } from "react";
import TokenContext from "../components/Context/TokenContext";
import { useForm } from "react-hook-form";
import "./RecipeForm.scss";
import axios from "axios";

export default function RecipeForm({ mode, id }) {
	var token = useContext(TokenContext)[0];

	var {
		setValue,
		handleSubmit,
		register,
		unregister,
		formState: { error },
	} = useForm();

	var [content, setContent] = useState({});
	const [list, setList] = useState(0);

	const saveRecipe = (data) => {
		const upload_res = axios.post("https://roskilde-recipe-api.herokuapp.com/recipes", {
			headers: {
				Authorization: `Bearer ${token.jwt}`,
			},
		});

		console.log(upload_res);
		console.log(data);

		mode === "create" &&
			axios.post(
				"https://roskilde-recipe-api.herokuapp.com/recipes",
				{
					title: data.title,
					description: data.description,
					procedure: data.procedure,
					kcal: data.kcal,
					protein: data.protein,
					fat: data.fat,
					carbs: data.carbs,
					author: token.user.id,
					ingredients: data.ingredients,
				},
				{
					headers: {
						Authorization: `Bearer ${token.jwt}`,
					},
				}
			);

		mode === "edit" &&
			axios.put(
				"https://roskilde-recipe-api.herokuapp.com/recipes/" + id,
				{
					title: data.title,
					description: data.description,
					procedure: data.procedure,
					kcal: data.kcal,
					protein: data.protein,
					fat: data.fat,
					carbs: data.carbs,
					author: token.user.id,
					ingredients: data.ingredients,
				},
				{
					headers: {
						Authorization: `Bearer ${token.jwt}`,
					},
				}
			);
		mode === "delete" &&
			axios.delete("https://roskilde-recipe-api.herokuapp.com/recipes/" + id, {
				headers: {
					Authorization: `Bearer ${token.jwt}`,
				},
			});
	};
	useEffect(() => {
		axios.get("https://roskilde-recipe-api.herokuapp.com/recipes/" + id).then((response) => {
			setContent(response.data);
		});
	}, [setContent, id]);

	useEffect(() => {
		if (content) {
			setList(content.ingredients?.length || 0);
			setValue("title", content.title);
			setValue("description", content.description);
			setValue("procedure", content.procedure);
			setValue("kcal", content.kcal);
			setValue("protein", content.protein);
			setValue("fat", content.fat);
			setValue("carbs", content.carbs);
			content.ingredients?.map((ingredient, i) => setValue(`ingredients[${i}]`, ingredient));
		}
	}, [content, setValue]);

	return (
		<div>
			<h1>{window.location.pathname}</h1>

			<form className="editForm" onSubmit={handleSubmit(saveRecipe)}>
				<div className="inputGroup">
					<label htmlFor="title">Title</label>
					<input type="text" {...register("title")} id="title" />
				</div>

				<div className="inputGroup">
					<label htmlFor="description">Description</label>
					<textarea type="text" {...register("description")} id="description"></textarea>
				</div>

				<div className="inputGroup">
					<label htmlFor="procedure">Procedure</label>
					<textarea type="text" {...register("procedure")} id="procedure"></textarea>
				</div>

				<div className="inputGroup">
					<fieldset>
						<legend>Nutritional Facts</legend>
						<label htmlFor="kcal">KCAL</label>
						<input type="number" {...register("kcal")} id="kcal" step="0.1" />

						<label htmlFor="fat">Fat</label>
						<input type="number" {...register("protein")} id="protein" step="0.1" />

						<label htmlFor="carbs">Carbs</label>
						<input type="number" {...register("carbs")} id="carbs" step="0.1" />
					</fieldset>
				</div>
				<div className="inputGroup">
					<fieldset>
						<legend>Ingredients</legend>

						{[...Array(list)].map((ingredient, i) => (
							<input type="text" {...register(`ingredients[${i}]`)} />
						))}

						<div className="instructions">
							<button type="button" className="add" onClick={() => setList(list + 1)}>
								Add
							</button>
							<button
								type="button"
								className="remove"
								onClick={() => {
									unregister(`ingredients[${list > 0 ? list - 1 : 0}]`);
									setList(list > 0 ? list - 1 : 0);
								}}>
								Remove
							</button>
						</div>
					</fieldset>
				</div>
				<button type="submit">{mode === "delete" ? "Delete" : "Save"}</button>
			</form>
		</div>
	);
}
