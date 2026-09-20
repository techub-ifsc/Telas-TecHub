import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { HomePage } from "./pages/HomePage";
import { SignUpPage } from "./pages/SignUpPage";
import { NewProjectPage } from "./pages/NewProjectPage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { LoginPage } from "./pages/LoginPage";
import { ProjectDetailsPage } from "./pages/ProjectDetailsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: HomePage },
      { path: "cadastro", Component: SignUpPage },
      { path: "projeto/novo", Component: NewProjectPage },
      { path: "projetos", Component: ProjectsPage },
      { path: "login", Component: LoginPage },
      { path: "projeto", Component: ProjectDetailsPage },
    ],
  },
]);
