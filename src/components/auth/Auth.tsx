import { useState } from "react";

import { Login } from "./Login";
import { Signup } from "./Signup";

export function Auth() {
  const [hasAccount, setHasAccount] = useState<boolean>(true);

  return (
    <>
      {hasAccount ? (
        <Login onHasAccount={setHasAccount} />
      ) : (
        <Signup onHasAccount={setHasAccount} />
      )}
    </>
  );
}
