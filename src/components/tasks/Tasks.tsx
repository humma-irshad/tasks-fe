import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import authContext from "../../context/authContext.ts";
import { useApi } from "../../hooks/use-api.ts";
import styles from "./Tasks.module.css";
import TaskItem from "./TaskItem.tsx";
import { Pagination } from "../UI/Pagination.tsx";

export function Tasks() {
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(6);
  const tokenContext = useContext(authContext);
  const navigate = useNavigate();

  const { api } = useApi();
  const { data, error, isFetching, isFetched, refetch } = api.useGetAllTasks();

  // front-end pagination
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = data?.slice(indexOfFirstTask, indexOfLastTask);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  let content: JSX.Element | undefined;
  if (isFetching) {
    content = <div className={styles.loader} />;
  }

  if (error) {
    content = <h3 className={styles.error}>Couldn't fetch any tasks :/</h3>;
  }

  if (isFetched) {
    content = (
      <div className={styles.container}>
        <button className={styles["add-task"]} onClick={() => navigate("add")}>
          Add Task
        </button>
        <TaskItem tasks={currentTasks} refetch={refetch} />
        <Pagination
          tasksPerPage={tasksPerPage}
          totalTasks={data?.length}
          paginate={paginate}
        />
      </div>
    );
  }

  return <>{tokenContext?.token ? content : <Navigate to="/auth" replace />}</>;
}
