import { styled } from "@mui/material";
import Paper, { PaperProps } from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { createTheme } from "@mui/material";

// For Custom Properties
// declare module "@mui/material/styles" {
// 	interface Theme {
// 		myCustom: {
// 			test: string;
// 		};
// 	}
// 	// allow configuration using `createTheme`
// 	interface ThemeOptions {
// 		myCustom?: {
// 			test?: string;
// 		};
// 	}
// }

export const darkTheme = createTheme({
	palette: {
		mode: "dark",
		primary: {
			main: "#adb5bd",
		},
		text: {
			primary: "#ced4da",
		},
		background: {
			paper: "#2a2a2ae4",
		},
	},
});

export const lightTheme = createTheme({
	palette: {
		mode: "light",
		primary: {
			main: "#003049",
		},
		secondary: {
			main: "#1976d2",
		},
		text: {
			primary: "#231942",
			secondary: "#000000",
		},
		background: {
			default: "#edede9",
		},
	},
});

export const CustomTextField = styled(TextField)(({ theme }) => ({
	svg: {
		color: theme.palette.primary.main,
	},
}));

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
	border: isDone ? "2px solid #76c991" : "",
	backgroundColor: theme.palette.background.paper,
}));
