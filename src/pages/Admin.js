import React, { useContext } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Appbar from "../components/AppBar/Appbar";
import { Router, navigate } from "@reach/router";
import "./Admin.scss";
import AdminPanel from "../components/AdminPanel/AdminPanel";
import Sites from "../components/sites/Sites";
import Recipes from "../components/Recipes/Recipes";
import User from "../components/User/User";
import Categories from "../components/Categories/Categories";
import TokenContext from "../components/Context/TokenContext";
import Login from "../components/Login";
import RecipeForm from "./RecipeForm";
import SingleCategory from "../components/Categories/SingleCategory";

export default function Admin() {
	var token = useContext(TokenContext)[0];
	if (!token.jwt) {
		navigate("/");
		return <Login />;
	}
	return (
		<div className="admin">
			<div className="admin__appbar">
				<Appbar />
			</div>
			<div className="admin__content">
				<Router>
					<AdminPanel path="/admin/adminpanel" />
					<Sites path="/admin/site" />
					<Recipes path="/admin/recipes" />
					<User path="admin/users" />
					<Categories path="admin/categories" />
					<SingleCategory path="/admin/categories/:id" />
					<RecipeForm path="/admin/create-recipe" mode="create" />
					<RecipeForm path="/admin/edit-recipe/:id" mode="edit" />
					<RecipeForm path="/admin/delete-recipe/:id" mode="delete" />
				</Router>
			</div>
			<div className="admin__sidebar">
				<Sidebar />
			</div>
		</div>
	);
}
