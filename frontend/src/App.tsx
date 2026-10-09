import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProjectPage from "./pages/ProjectsPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/projects" replace />} />
        <Route path="/projects" element={<ProjectPage />} />
      </Routes>
    </BrowserRouter>
  );
}
