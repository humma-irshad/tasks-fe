import { ZodiosHooks } from "@zodios/react";
import { useContext } from "react";

import { createApiClient } from "../../client";
import authContext from "../context/authContext";

export function useApi() {
  const tokenContext = useContext(authContext);

  const client = createApiClient("http://localhost:8080/", {
    axiosConfig: {
      headers: { Authorization: `Bearer ${tokenContext?.token}` },
    },
  });

  const api = new ZodiosHooks("tasksApi", client);

  return { api, client };
}
