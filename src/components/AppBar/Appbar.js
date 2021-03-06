import React, { useContext } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import { Button } from "@material-ui/core";
import { Redirect } from "@reach/router";
import TokenContext from "../Context/TokenContext";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	tool: {
		backgroundColor: "#343a40",
		display: "flex",
		flexWrap: "wrap",
	},
	button: {
		[theme.breakpoints.down("sm")]: {
			marginTop: "1rem",
		},
		[theme.breakpoints.up("sm")]: {
			marginTop: "0rem",
		},
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,

		[theme.breakpoints.down("sm")]: {
			marginBottom: "1rem",
		},
		[theme.breakpoints.up("sm")]: {
			marginBottom: "0rem",
		},
	},
	search: {
		"position": "relative",
		"borderRadius": theme.shape.borderRadius,
		"backgroundColor": fade(theme.palette.common.white, 0.15),
		"&:hover": {
			backgroundColor: fade(theme.palette.common.white, 0.55),
		},
		"marginLeft": 0,
		"width": "100%",
		[theme.breakpoints.up("sm")]: {
			marginLeft: theme.spacing(1),
			width: "auto",
		},
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: "100%",
		position: "absolute",
		pointerEvents: "none",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	inputRoot: {
		color: "inherit",
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("sm")]: {
			"width": "12ch",
			"&:focus": {
				width: "20ch",
			},
		},
	},
}));

export default function SearchAppBar() {
	const classes = useStyles();
	var setToken = useContext(TokenContext)[1];

	function logout() {
		var confirm = window.confirm("Are you sure you want to logout?");
		if (confirm) {
			setToken({}); //reset token
			document.cookie = `recipe_token=""; expires=${new Date().toUTCString()}`; //reset cookie
			return <Redirect to="/" />;
		}
	}

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar className={classes.tool}>
					<Typography className={classes.title} variant="h6" noWrap>
						Recipe Planet
					</Typography>
					<div className={classes.search}>
						<div className={classes.searchIcon}>
							<SearchIcon />
						</div>
						<InputBase
							placeholder="Search???"
							classes={{
								root: classes.inputRoot,
								input: classes.inputInput,
							}}
							inputProps={{ "aria-label": "search" }}
						/>
					</div>
					<Button color="inherit" className={classes.button} onClick={() => logout()}>
						Log Out
					</Button>
				</Toolbar>
			</AppBar>
		</div>
	);
}
