import { styled } from "@mui/material";
import TextField from "@mui/material/TextField";
import Paper, { PaperProps } from "@mui/material/Paper";

export const CustomTextField = styled(TextField)`
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

interface StyledPaperProps extends PaperProps {
	isDone?: boolean;
}

export const Card = styled(Paper, {
	shouldForwardProp: (prop) => prop !== "isDone",
})<StyledPaperProps>(({ isDone, theme }) => ({
	...theme.typography.body2,
	textAlign: "center",
	color: theme.palette.text.secondary,
	lineHeight: "40px",
	padding: "10px",
	...(isDone && {
		backgroundColor: "#b7e4c7",
	}),
}));
