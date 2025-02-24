import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

type Program = {
  id: number;
  title: string;
  synopsis: string;
  poster: string;
  country: string;
  year: number;
  category_id: number;
};

function ProgramEdit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [program, setProgram] = useState<Program>({
    id: 0,
    title: "",
    synopsis: "",
    poster: "",
    country: "",
    year: 0,
    category_id: 0,
  });

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/programs/${id}`)
      .then((response) => response.json())
      .then((data: Program) => {
        setProgram(data);
      });
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setProgram({ ...program, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    fetch(`${import.meta.env.VITE_API_URL}/api/programs/${program.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(program),
    }).then((response) => {
      if (response.status === 204) {
        navigate("/programs");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Title"
        onChange={handleChange}
        value={program.title}
      />
      <textarea
        name="synopsis"
        placeholder="Synopsis"
        onChange={handleChange}
        value={program.synopsis}
      />
      <input
        type="text"
        name="poster"
        placeholder="Poster URL"
        onChange={handleChange}
        value={program.poster}
      />
      <input
        type="text"
        name="country"
        placeholder="Country"
        onChange={handleChange}
        value={program.country}
      />
      <input
        type="number"
        name="year"
        placeholder="Year"
        onChange={handleChange}
        value={program.year}
      />
      <input
        type="number"
        name="category_id"
        placeholder="Category ID"
        onChange={handleChange}
        value={program.category_id}
      />
      <button type="submit">Modifier</button>
    </form>
  );
}

export default ProgramEdit;
