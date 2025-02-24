import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

type Program = {
  id: number;
  title: string;
  synopsis: string;
  poster: string;
  country: string;
  year: number;
};

function ProgramDetails() {
  const { id } = useParams();
  const [program, setProgram] = useState(null as null | Program);

  useEffect(() => {
    // Récupérer les détails d'un programme spécifique depuis l'API
    fetch(`${import.meta.env.VITE_API_URL}/api/programs/${id}`)
      .then((response) => response.json())
      .then((data: Program) => {
        setProgram(data);
      });
  }, [id]);

  return (
    program && (
      <>
        <hgroup className="details-hgroup">
          <h1>{program.title}</h1>
          <Link to={`/programs/${program.id}/edit`}>Modifier</Link>
        </hgroup>
        <p>{program.synopsis}</p>
        <img src={program.poster} alt={program.title} />
        <p>
          {program.country}, {program.year}
        </p>
      </>
    )
  );
}

export default ProgramDetails;
