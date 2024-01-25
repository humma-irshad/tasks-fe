import { FormEvent, useState } from "react";

import styles from "./Auth.module.css";
import useApi from "../../hooks";

interface IProps {
  onHasAccount: (hasAccount: boolean) => void;
}

export function Signup({ onHasAccount }: IProps) {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { api } = useApi();
  const { error, mutateAsync, isLoading } = api.useSignupUser();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const token = await mutateAsync({ username, password });
    localStorage.setItem("accessToken", token.accessToken);

    setUsername("");
    setPassword("");
  }

  return (
    <div className={styles.container}>
      <h2>Signup</h2>
      {error && <p>Something went awry :/</p>}
      <form onSubmit={handleSubmit}>
        <input
          id="username"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          autoFocus
        />
        <input
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button className={styles.account} onClick={() => onHasAccount(true)}>
          Already have an account? Login
        </button>
        <div className={styles.action}>
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Submitting" : "Signup"}
          </button>
        </div>
      </form>
    </div>
  );
}
