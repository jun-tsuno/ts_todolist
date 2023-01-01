import React from "react";
import UserInput from "./components/UserInput";

const App = () => {
	return (
		<>
			<h1 className="text-3xl p-5 text-[#ffba08] ">ToDo List</h1>
			<div>
				<div className="text-center py-10">
					<UserInput />
				</div>
			</div>
		</>
	);
};

export default App;
