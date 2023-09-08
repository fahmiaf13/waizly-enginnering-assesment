import { useRoutes } from "react-router-dom";
import { DefaultLayout } from "@/layouts";
import { Todo, Home, ProblemSolvingTest } from "@/pages";

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: (
        <DefaultLayout>
          <Home />
        </DefaultLayout>
      ),
    },
    {
      path: "/todo",
      element: (
        <DefaultLayout>
          <Todo />
        </DefaultLayout>
      ),
    },
    {
      path: "/answer",
      element: (
        <DefaultLayout>
          <ProblemSolvingTest />
        </DefaultLayout>
      ),
    },
  ]);
}
