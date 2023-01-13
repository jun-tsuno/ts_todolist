import { ChangeEvent, FormEvent, useState } from "react";
import useTodo from "../hooks/useTodo";
import { Task } from "../types/types";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { v4 as uuidv4 } from "uuid";
import { CustomTextField } from "../style/customMui";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { UserAuth } from "../context/AuthContext";

const UserInput = () => {
	const [task, setTask] = useState<string>("");
	const [date, setDate] = useState<string | undefined>(
		dayjs().format("MM/DD/YYYY")
	);
	const { handleAddTodo } = useTodo();
	const { user } = UserAuth();

	const handleTaskChange = (event: ChangeEvent<HTMLInputElement>) => {
		setTask(event.target.value);
	};

	const handleDateChange = (newDate: Dayjs | any) => {
		const stringifiedDate = newDate?.format("MM-DD-YYYY");
		setDate(stringifiedDate);
	};

	// : todosコレ >> user別のdoc >> todoサブコレ >> 新規doc
	// userIdを追加することで、サブコレからクエリでID別の検索を可能にする。
	const handleAddToDoc = async (newTask: Task) => {
		try {
			await addDoc(collection(db, `todos/${user!.uid}/todo`), {
				...newTask,
			});
		} catch (error) {
			console.log(error);
		}
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (task === "" || date === undefined) {
			alert("Fill in Both fields.");
		} else {
			const newTask: Task = {
				id: uuidv4(),
				userId: user!.uid,
				taskName: task,
				deadline: date,
				isDone: false,
			};
			console.log(newTask.id);

			handleAddTodo(newTask);
			handleAddToDoc(newTask);
			setTask("");
			setDate(dayjs().format("MM/DD/YYYY"));
		}
	};

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<>
				<form
					className="flex justify-center items-center max-w-[1000px] mx-auto"
					onSubmit={handleSubmit}
				>
					<div className="flex-[80%] flex justify-around">
						<div className="w-[500px]">
							<TextField
								id="outlined-basic"
								label="Task..."
								value={task}
								onChange={handleTaskChange}
								focused
								fullWidth
								autoComplete="off"
							/>
						</div>
						<div className="w-30">
							<DesktopDatePicker
								label="Deadline..."
								inputFormat="MM/DD/YYYY"
								disablePast
								value={date}
								onChange={handleDateChange}
								renderInput={(params) => (
									<CustomTextField {...params} focused />
								)}
							/>
						</div>
					</div>
					<div className="flex-[15%]">
						<Button
							type="submit"
							variant="outlined"
							size="large"
							sx={{
								border: "2px solid",
								fontSize: "15px",
								height: "50px",
							}}
						>
							ADD
						</Button>
					</div>
				</form>
			</>
		</LocalizationProvider>
	);
};

export default UserInput;
