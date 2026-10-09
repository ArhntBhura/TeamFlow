import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import { createProject, type CreateProjectInput } from "../api/projects.api";

export default function CreateProjectPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [teamId, setTeamId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const input: CreateProjectInput = {
      name: name.trim(),
      description: description.trim() || undefined,
      teamId: Number(teamId),
    };

    if (!input.name || !Number.isInteger(input.teamId) || input.teamId <= 0) {
      setError("Enter a project name and a valid team ID.");
      return;
    }

    try {
      setLoading(true);

      await createProject(input);

      navigate("/projects", {
        state: { message: "Project created successfully." },
      });
    } catch {
      setError(
        "Could not create the project. Check the team ID and try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <h1>Create Project</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Project name</label>
          <input
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            minLength={2}
            maxLength={150}
            required
          />
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            maxLength={2000}
          />
        </div>

        <div>
          <label htmlFor="teamId">Team ID</label>
          <input
            id="teamId"
            type="number"
            min="1"
            step="1"
            value={teamId}
            onChange={(event) => setTeamId(event.target.value)}
            required
          />
        </div>

        {error && <p role="alert">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Project"}
        </button>

        <button
          type="button"
          onClick={() => navigate("/projects")}
          disabled={loading}
        >
          Cancel
        </button>
      </form>
    </main>
  );
}
