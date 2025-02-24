// Some data to make the trick
const programs = [
  {
    id: 1,
    title: "The Good Place",
    synopsis:
      "À sa mort, Eleanor Shellstrop est envoyée au Bon Endroit, un paradis fantaisiste réservé aux individus exceptionnellement bienveillants. Or Eleanor n'est pas exactement une « bonne personne » et comprend vite qu'il y a eu erreur sur la personne. Avec l'aide de Chidi, sa prétendue âme sœur dans l'au-delà, la jeune femme est bien décidée à se redécouvrir.",
    poster:
      "https://img.betaseries.com/JwRqyGD3f9KvO_OlfIXHZUA3Ypw=/600x900/smart/https%3A%2F%2Fpictures.betaseries.com%2Ffonds%2Fposter%2F94857341d71c795c69b9e5b23c4bf3e7.jpg",
    country: "USA",
    year: 2016,
  },
  {
    id: 2,
    title: "Dark",
    synopsis:
      "Quatre familles affolées par la disparition d'un enfant cherchent des réponses et tombent sur un mystère impliquant trois générations qui finit de les déstabiliser.",
    poster:
      "https://img.betaseries.com/zDxfeFudy3HWjxa6J8QIED9iaVw=/600x900/smart/https%3A%2F%2Fpictures.betaseries.com%2Ffonds%2Fposter%2Fc47135385da176a87d0dd9177c5f6a41.jpg",
    country: "Allemagne",
    year: 2017,
  },
];

// Importer l'accès aux données
import type { RequestHandler } from "express";

// Déclarer les actions

const browse: RequestHandler = (req, res) => {
  if (req.query.q != null) {
    const filteredPrograms = programs.filter((program) =>
      program.synopsis.includes(req.query.q as string),
    );
    res.json(filteredPrograms);
  } else {
    res.json(programs);
  }
};

const read: RequestHandler = (req, res) => {
  const parsedId = Number.parseInt(req.params.id);
  const program = programs.find((p) => p.id === parsedId);
  if (program != null) {
    res.json(program);
  } else {
    res.sendStatus(404);
  }
};

const add: RequestHandler = (req, res) => {
  const newProgram = {
    id: programs.length + 1, // Simuler l'ajout d'un nouvel ID
    title: req.body.title,
    synopsis: req.body.synopsis,
    poster: req.body.poster,
    country: req.body.country,
    year: req.body.year,
  };

  programs.push(newProgram); // Ajouter le nouveau programme à la liste
  res.status(201).json(newProgram);
};

const edit: RequestHandler = (req, res) => {
  const programId = Number(req.params.id);
  const programIndex = programs.findIndex((p) => p.id === programId);

  if (programIndex !== -1) {
    programs[programIndex] = {
      ...programs[programIndex],
      ...req.body,
    };
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
};

const destroy: RequestHandler = (req, res) => {
  const programId = Number(req.params.id);
  const programIndex = programs.findIndex((p) => p.id === programId);

  if (programIndex !== -1) {
    programs.splice(programIndex, 1);
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
};

// Middleware de validation
const validate: RequestHandler = (req, res, next) => {
  type ValidationError = {
    field: string;
    message: string;
  };

  const errors: ValidationError[] = [];

  const { title, synopsis, poster, country, year } = req.body;

  // Vérifier que chaque champ requis est présent et du bon type
  if (!title || typeof title !== "string") {
    errors.push({
      field: "title",
      message: "Title is required and must be a string.",
    });
  }

  if (!synopsis || typeof synopsis !== "string") {
    errors.push({
      field: "synopsis",
      message: "Synopsis is required and must be a string.",
    });
  }

  if (!poster || typeof poster !== "string") {
    errors.push({
      field: "poster",
      message: "Poster URL is required and must be a string.",
    });
  }

  if (!country || typeof country !== "string") {
    errors.push({
      field: "country",
      message: "Country is required and must be a string.",
    });
  }

  if (!year || typeof year !== "number") {
    errors.push({
      field: "year",
      message: "Year is required and must be a number.",
    });
  }

  // Si des erreurs sont présentes, renvoyer une réponse avec les erreurs
  if (errors.length === 0) {
    next();
  } else {
    res.status(400).json({ validationErrors: errors });
  }
};

// Exporter les actions pour les importer ailleurs
export default { browse, read, add, edit, destroy, validate };
