import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Tasks, { AddTask } from "./components/tasks";
import Auth from "./components/auth";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { index: true, element: <Tasks /> },
      { path: "add", element: <AddTask /> },
      { path: "auth", element: <Auth /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
