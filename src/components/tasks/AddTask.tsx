import { FormEvent, useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import styles from "./AddTask.module.css";
import authContext from "../../context/authContext";
import useApi from "../../hooks";

export function AddTask() {
  const [title, setTitle] = useState("");
  const [description, setDiscription] = useState("");
  const tokenContext = useContext(authContext);
  const navigte = useNavigate();

  const { api } = useApi();
  const { useCreateTask } = api;
  const { error, mutateAsync, isLoading } = useCreateTask();

  async function handleCreateTask(event: FormEvent) {
    event.preventDefault();

    await mutateAsync({ title, description });

    if (!isLoading) {
      navigte("/");
    }
  }

  return (
    <>
      {tokenContext?.token ? (
        <div className={styles.container}>
          <h2>Add Task</h2>
          {error && <p>Something went awry :/</p>}
          <form onSubmit={handleCreateTask}>
            <input
              id="task"
              type="text"
              placeholder="Task"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              autoFocus
            />
            <textarea
              id="description"
              name="task-description"
              placeholder="Description"
              value={description}
              onChange={(event) => setDiscription(event.target.value)}
            />
            <div className={styles.action}>
              <button type="submit" disabled={isLoading && true}>
                Add Task
              </button>
              <Link className={styles.cancel} to="..">Cancel</Link>
            </div>
          </form>
        </div>
      ) : (
        <Navigate to="/auth" replace />
      )}
    </>
  );
}
