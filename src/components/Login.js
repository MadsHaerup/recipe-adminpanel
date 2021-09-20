import "./Login.scss";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { Alert } from "@material-ui/lab";
import { Button, Checkbox, FormControlLabel, Typography, TextField } from "@material-ui/core";
import { navigate } from "@reach/router";
import { useContext } from "react";
import TokenContext from "./Context/TokenContext";

export default function Login() {
	const { handleSubmit, control } = useForm();
	var setToken = useContext(TokenContext)[1];

	const onSubmit = (data) => {
		axios
			.post("https://roskilde-recipe-api.herokuapp.com/auth/local", {
				identifier: data.name,
				password: data.password,
			})
			.then((response) => {
				setToken(response.data);

				if (data.remember) {
					var d = new Date();
					d.setTime(d.getTime() + 30 * 24 * 60 * 60 * 1000);
					document.cookie = `recipe_token=${JSON.stringify(response.data)}; expires = ${d.toUTCString()}`;
				}
				navigate("/admin");
			})
			.catch((error) => {
				console.log(error);
			});
		console.log(data);
	};

	return (
		<form className="form" onSubmit={handleSubmit(onSubmit)}>
			<Typography component="h1" variant="h4" align="center">
				Sign in
			</Typography>
			<Controller
				control={control}
				name="name"
				defaultValue=""
				rules={{ required: true }}
				render={({ field, fieldState: { error, invalid } }) => (
					<>
						<TextField {...field} label="Username" placeholder="Username" error={error ? true : false} margin="dense" />
						{invalid && <Alert severity="error">Please fill in your username</Alert>}
					</>
				)}
			/>
			<Controller
				control={control}
				name="password"
				defaultValue=""
				rules={{ required: true }}
				render={({ field, fieldState: { error, invalid } }) => (
					<>
						<TextField
							label="Password"
							error={error ? true : false}
							{...field}
							type="password"
							placeholder="Password"
							margin="dense"
						/>

						{invalid && <Alert severity="error">Please fill in your password</Alert>}
					</>
				)}
			/>

			<Controller
				control={control}
				name="remember"
				defaultValue={false}
				render={({ field }) => (
					<>
						<FormControlLabel
							control={<Checkbox {...field} value={false ? true : false} />}
							label="Remember me"
							style={{ placeSelf: "center" }}
						/>
					</>
				)}
			/>
			<Button color="primary" type="submit" variant="contained" style={{ marginTop: "1rem" }} onSubmit={onSubmit}>
				Sign in
			</Button>
		</form>
	);
}
