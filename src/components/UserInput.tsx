import { ChangeEvent, FormEvent, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Button from "@mui/material/Button";
import { Task } from "../types/types";
import { CustomTextField } from "../style/customMui";
import { v4 as uuidv4 } from "uuid";

interface Props {
	addTodo(newTodo: Task): void;
}

const UserInput = ({ addTodo }: Props) => {
	const [task, setTask] = useState<string>("");
	const [date, setDate] = useState<string | undefined>(
		dayjs().format("MM/DD/YYYY")
	);

	const handleTaskChange = (event: ChangeEvent<HTMLInputElement>) => {
		setTask(event.target.value);
	};

	const handleDateChange = (newDate: Dayjs | null) => {
		const stringifiedDate = newDate?.format("MM-DD-YYYY");
		setDate(stringifiedDate);
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (task === "" || date === undefined) {
			alert("Fill in Both fields.");
		} else {
			const newTask: Task = {
				id: uuidv4(),
				taskName: task,
				deadline: date,
				isDone: false,
			};
			addTodo(newTask);
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
							<CustomTextField
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
								color: "white",
								border: "2px solid white",
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
