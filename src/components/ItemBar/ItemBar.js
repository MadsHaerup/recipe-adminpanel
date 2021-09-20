import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import "./ItemBar.scss";
import { Link } from "@reach/router";

export default function ItemBar({ text, protein, kcal, id }) {
	return (
		<div className="itembar" key={id}>
			<div className="itembar__buttons">
				<Link to={"/admin/edit-recipe/" + id}>
					<FaEdit />
				</Link>

				<Link to={"/admin/delete-recipe/" + id}>
					<FaTrashAlt />
				</Link>
			</div>
			<ul className="itembar__list">
				<li className="itembar__list__listItem">{text}</li>
				<li className="itembar__list__listItem">{protein}</li>
				<li className="itembar__list__listItem">{kcal}</li>
			</ul>
		</div>
	);
}
