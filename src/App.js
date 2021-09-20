import "./App.css";
import Admin from "./pages/Admin";
import LoginView from "./pages/LoginView";
import { navigate, Router } from "@reach/router";
import { CookiesProvider } from "react-cookie";
import TokenContext from "./components/Context/TokenContext";
import { useEffect, useState } from "react";
import getCookie from "./components/GetCookie/getCookie";

getCookie("");

function App() {
	var tokenState = useState({});

	useEffect(() => {
		var cookie = getCookie("recipe_token");
		if (cookie) {
			cookie = JSON.parse(cookie);
			tokenState[1](cookie);
			console.log(cookie);
			navigate("/admin");
		}
	}, []);

	return (
		<TokenContext.Provider value={tokenState}>
			<CookiesProvider>
				<Router>
					<LoginView path="/" />
					<Admin path="admin" />
					<Admin default path="admin/:id" />
				</Router>
			</CookiesProvider>
		</TokenContext.Provider>
	);
}

export default App;
