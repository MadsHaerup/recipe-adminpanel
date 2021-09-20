import axios from "axios";
import React, { useState } from "react";
import "./FileUpload.scss";

export default function FileUpload() {
	const [file, setFiles] = useState(null);

	const handleChange = (event) => {
		console.log(event.target.files);
		setFiles({ file: event.target.files[0] });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		console.log("file", setFiles.file);

		const data = new FormData();
		data.append("file", setFiles(file));

		const upload_res = await axios({
			method: "POST",
			url: "http://localhost:1337/recipes",
			data: data,
		});

		console.log(upload_res);
	};

	return (
		<div className="fileUpload">
			<div onSubmit={handleSubmit}>
				<input onChange={handleChange} type="file" />
				<button type="submit">Submit</button>
			</div>
		</div>
	);
}
