import { ChangeEvent, FormEvent, useState } from "react";
import { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

interface Props {
	taskName: string;
	deadline: string | undefined;
	handleEditDone(taskName: string, taskDeadline: string): void;
}

const EditTask = ({ taskName, deadline, handleEditDone }: Props) => {
	const [editedTask, setEditedTask] = useState<string>("");
	const [editedDate, setEditedDate] = useState<string | undefined>(deadline);

	const handleTaskChange = (event: ChangeEvent<HTMLInputElement>) => {
		setEditedTask(event.target.value);
	};

	const handleDateChange = (newDate: Dayjs | null) => {
		const stringifiedDate = newDate?.format("MM-DD-YYYY");
		setEditedDate(stringifiedDate);
	};

	const handleSubmit = () => {
		if (editedTask === "" || editedDate === undefined) {
			alert("Fill in Both fields.");
		} else {
			handleEditDone(editedTask, editedDate);
		}
	};

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<div className="text-left ml-5 flex-[80%] min-w-[200px]">
				<div className="flex">
					<input
						className="text-xl p-1 break-words border-2 rounded-md border-sky-600 mr-8"
						placeholder={taskName}
						onChange={handleTaskChange}
						value={editedTask}
					/>
					<div>
						<DesktopDatePicker
							label="Deadline..."
							inputFormat="MM/DD/YYYY"
							disablePast
							value={editedDate}
							onChange={handleDateChange}
							renderInput={(params) => <TextField {...params} focused />}
						/>
					</div>
				</div>
			</div>
			<div className="flex-[20%] my-auto">
				<Button variant="contained" onClick={handleSubmit}>
					UPDATE
				</Button>
			</div>
		</LocalizationProvider>
	);
};

export default EditTask;
