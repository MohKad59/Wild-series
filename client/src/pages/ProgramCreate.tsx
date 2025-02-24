import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Program = {
  title: string;
  synopsis: string;
  poster: string;
  country: string;
  year: number;
  category_id: number;
};

function ProgramCreate() {
  const navigate = useNavigate();
  const [program, setProgram] = useState<Program>({
    title: "",
    synopsis: "",
    poster: "",
    country: "",
    year: 0,
    category_id: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setProgram({ ...program, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    fetch(`${import.meta.env.VITE_API_URL}/api/programs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(program),
    }).then((response) => {
      if (response.status === 201) {
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
      <button type="submit">Ajouter</button>
    </form>
  );
}

export default ProgramCreate;
