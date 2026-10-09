import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProjectPage from "./pages/ProjectsPage";
import CreateProjectPage from "./pages/CreateProjectPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/projects" replace />} />
        <Route path="/projects" element={<ProjectPage />} />
        <Route path="/projects/new" element={<CreateProjectPage />} />
      </Routes>
    </BrowserRouter>
  );
}
