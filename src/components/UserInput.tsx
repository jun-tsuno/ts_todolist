import { ChangeEvent, JSXElementConstructor, useState } from "react";
import TextField from "@mui/material/TextField";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import moment, { Moment } from "moment";
import Button from "@mui/material/Button";
import { styled } from "@mui/material";

const CustomTextField = styled(TextField)`
	& label.Mui-focused {
		color: white;
	}
	& .MuiOutlinedInput-root {
		&.Mui-focused fieldset {
			border-color: white;
		}
	}
	& input {
		color: white;
	}
	& svg {
		color: white;
	}
`;

const UserInput = () => {
	const [task, setTask] = useState<string>("");
	const [date, setDate] = useState<Moment | null>(moment());

	const handleTaskChange = (event: ChangeEvent<HTMLInputElement>) => {
		setTask(event.target.value);
	};

	const handleDateChange = (newDate: Moment | null) => {
		setDate(newDate);
	};

	return (
		<LocalizationProvider dateAdapter={AdapterMoment}>
			<>
				<form className="flex justify-center items-center max-w-[1000px] mx-auto">
					<div className="flex-[80%] flex justify-around">
						<div className="w-[500px]">
							<CustomTextField
								id="outlined-basic"
								label="Task..."
								value={task}
								onChange={handleTaskChange}
								focused
								fullWidth
							/>
						</div>
						<div className="w-30">
							<DesktopDatePicker
								label="Date desktop"
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
