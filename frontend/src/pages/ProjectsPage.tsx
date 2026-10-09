import { useEffect, useState } from "react";
import { getProjects } from "../api/projects.api";
import type { Project } from "../types/project";

export default function ProjectPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getProjects();
        setProjects(data);
      } catch (err) {
        console.error("Failed to load projects", err);
        setError("Could not load projects. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    void loadProjects();
  }, []);

  if (loading) {
    return <p>Loading Projects...</p>;
  }

  if (error) {
    return (
      <div>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}> Retry </button>
      </div>
    );
  }

  return (
    <main>
      <h1>TeamFlow Projects</h1>
      <p>Manage and track your team's projects.</p>

      {projects.length === 0 ? (
        <p>No projects yet. Create your first project soon.</p>
      ) : (
        <section>
          {projects.map((project) => (
            <article key={project.id}>
              <h2>{project.name}</h2>
              <p>{project.description || "No description provided."}</p>
              <small>Team Id: {project.teamid}</small>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
