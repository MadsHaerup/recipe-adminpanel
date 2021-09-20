import "./Sidebar.scss";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import { Bookmarks, Home, MenuBook, Person, ShoppingBasket } from "@material-ui/icons";
import { Typography } from "@material-ui/core";
import { Link } from "@reach/router";

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		height: "100vh",
		maxWidth: "360px",
		backgroundColor: theme.palette.background.paper,
		borderRight: "1px solid rgba(0, 0, 0, 0.12);",
	},
}));

export default function Sidebar() {
	const classes = useStyles();
	const [selectedIndex, setSelectedIndex] = React.useState(1);

	const handleListItemClick = (event, index) => {
		setSelectedIndex(index);
	};

	return (
		<div className={classes.root}>
			<List component="nav" aria-label="main admin folders">
				<ListItem
					button
					selected={selectedIndex === 0}
					onClick={(event) => handleListItemClick(event, 0)}
					component={Link}
					to="/admin/adminpanel">
					<ListItemIcon>
						<Home />
					</ListItemIcon>
					<ListItemText primary="Admin-Panel" />
				</ListItem>
				<ListItem
					button
					selected={selectedIndex === 1}
					onClick={(event) => handleListItemClick(event, 1)}
					component={Link}
					to="/admin/site">
					<ListItemIcon>
						<Bookmarks />
					</ListItemIcon>
					<ListItemText primary="Sites" />
				</ListItem>
				<ListItem
					button
					selected={selectedIndex === 2}
					onClick={(event) => handleListItemClick(event, 2)}
					component={Link}
					to="/admin/recipes">
					<ListItemIcon>
						<ShoppingBasket />
					</ListItemIcon>
					<ListItemText primary="Recipes" />
				</ListItem>
				<ListItem
					button
					selected={selectedIndex === 3}
					onClick={(event) => handleListItemClick(event, 3)}
					component={Link}
					to="/admin/users">
					<ListItemIcon>
						<Person />
					</ListItemIcon>
					<ListItemText primary="Users" />
				</ListItem>
			</List>
			<Divider />
			<Typography component="p" variant="h6" style={{ paddingLeft: "16px" }}>
				{" "}
				Others{" "}
			</Typography>
			<List component="nav" aria-label="secondary admin folder">
				<ListItem
					button
					selected={selectedIndex === 4}
					onClick={(event) => handleListItemClick(event, 4)}
					component={Link}
					to="/admin/categories">
					<ListItemIcon>
						<MenuBook />
					</ListItemIcon>
					<ListItemText primary="Categories" />
				</ListItem>
			</List>
		</div>
	);
}
