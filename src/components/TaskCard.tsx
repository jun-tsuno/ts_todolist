import React from "react";
import { Card } from "../style/customMui";
import { Task } from "../types/types";
import IconButton from "@mui/material/IconButton";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { pink } from "@mui/material/colors";
import { green } from "@mui/material/colors";

interface Props {
	todo: Task;
	deleteTodo(id: string): void;
	doneTodo(id: string): void;
}

const TaskCard = ({ todo, deleteTodo, doneTodo }: Props) => {
	return (
		<div className="w-[90%] max-w-[900px] min-w-[400px] mx-auto my-5">
			<Card isDone={todo.isDone}>
				<div className="flex min-w-[300px]">
					<div className="text-left ml-5 flex-[80%] min-w-[200px]">
						<h3 className="text-2xl break-words">{todo.taskName}</h3>
						<span>Deadline: {todo.deadline}</span>
					</div>
					<div className="flex-[20%] flex justify-center items-center">
						<div className="mx-1">
							<IconButton onClick={() => doneTodo(todo.id)}>
								<CheckCircleIcon fontSize="large" sx={{ color: green[500] }} />
							</IconButton>
						</div>
						<div className="mx-1">
							<IconButton onClick={() => deleteTodo(todo.id)}>
								<DeleteForeverIcon fontSize="large" sx={{ color: pink[600] }} />
							</IconButton>
						</div>
					</div>
				</div>
			</Card>
		</div>
	);
};

export default TaskCard;
