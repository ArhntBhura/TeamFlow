import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import AppLayout from "../components/AppLayout";
import { getProjects } from "../api/projects.api";
import type { Project } from "../types/project";

export default function ProjectsPage() {
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
    <AppLayout>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Projects
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage and track your team's projects.
          </p>
        </div>

        <a
          href="/projects/new"
          className="inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          + New project
        </a>
      </div>

      {projects.length === 0 ? (
        <p className="mt-1 text-sm text-slate-500">
          No projects yet. Create your first project soon.
        </p>
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
    </AppLayout>
  );
}
