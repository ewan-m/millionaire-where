import * as React from "react";
import { render } from "react-dom";
import "./index.scss";
import { Millionaire } from "./millionaire/Millionaire";

const App = () => {
	return (
		<div className="container">
			<div className="innerContainer">
				<Millionaire />
			</div>
		</div>
	);
};

render(<App />, document.getElementById("root"));
