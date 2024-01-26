import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Auth.module.css";
import useApi from "../../hooks";

interface IProps {
  onHasAccount: (hasAccount: boolean) => void;
}

export function Signup({ onHasAccount }: IProps) {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const { api } = useApi();
  const { error, mutateAsync, isLoading } = api.useSignupUser();

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    mutateAsync({ username, password }).then((token) => {
      sessionStorage.setItem("accessToken", token.accessToken);
      navigate("/");
    });

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
