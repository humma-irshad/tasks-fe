import { ChangeEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { MdDelete } from "react-icons/md";

import styles from "./TaskItem.module.css";
import useApi from "../../hooks";
import { TSchemas } from "../../utils/types";
import { schemas } from "../../../client";

interface IProps {
  tasks: TSchemas["ListAllTasksDTO"] | undefined;
  refetch: () => void;
}

type TMutationArgs = {
  taskId: string;
  status: TSchemas["UpdateTaskStatusDTO"];
};

function TaskItem({ tasks, refetch }: IProps) {
  const { client } = useApi();

  const { mutate } = useMutation(({ taskId, status }: TMutationArgs) => {
    return client.updateTaskStatus(
      {
        status: status.status,
      },
      {
        params: { id: taskId },
      }
    );
  });

  const { mutateAsync: deleteMutatation } = useMutation((taskId: string) => {
    return client.deleteTask(undefined, { params: { id: taskId } });
  });

  async function deleteTask(taskId: string) {
    await deleteMutatation(taskId);
    refetch();
  }

  async function handleUpdateTaskStatus(
    event: ChangeEvent<HTMLSelectElement>,
    taskId: string
  ) {
    const eventParse = schemas["UpdateTaskStatusDTO"]
      .pick({ status: true })
      .safeParse({ status: event.target.value });

    if (eventParse.success) {
      mutate({ status: eventParse.data, taskId });
    }
  }

  return (
    <>
      {tasks?.map((task) => (
        <div key={task.id}>
          <h2 className={styles.title}>{task.title}</h2>
          <div className={styles.wrapper}>
            <span>{task.description}</span>
          </div>
          <div className={styles.actions}>
            <select
              className={styles.status}
              name="status"
              id="status"
              defaultValue={task.status}
              onChange={(event) => handleUpdateTaskStatus(event, task.id)}
            >
              <option value="OPEN">Open</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="DONE">Done</option>
            </select>
            <MdDelete
              className={styles.delete}
              onClick={() => deleteTask(task.id)}
            />
          </div>
          <hr />
        </div>
      ))}
    </>
  );
}
export default TaskItem;
