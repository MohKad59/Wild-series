import type { RequestHandler } from "express";
import programRepository from "./programRepository";

// Action pour lister tous les programmes
const browse: RequestHandler = async (req, res) => {
  try {
    // Utiliser le repository pour obtenir les programmes
    const programsFromDB = await programRepository.readAll();

    // Filtrer les programmes si un paramètre de recherche est fourni
    if (req.query.q != null) {
      const filteredPrograms = programsFromDB.filter((program) =>
        program.synopsis.includes(req.query.q as string),
      );
      res.json(filteredPrograms);
    } else {
      res.json(programsFromDB);
    }
  } catch (error) {
    console.error("Error fetching programs:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Action pour lire un programme spécifique
const read: RequestHandler = async (req, res) => {
  try {
    const parsedId = Number.parseInt(req.params.id);

    // Utiliser le repository pour obtenir un programme spécifique
    const program = await programRepository.read(parsedId);

    if (program != null) {
      res.json(program);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error("Error fetching program:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Action pour ajouter un nouveau programme
const add: RequestHandler = async (req, res) => {
  try {
    const newProgram = {
      title: req.body.title,
      synopsis: req.body.synopsis,
      poster: req.body.poster,
      country: req.body.country,
      year: req.body.year,
      category_id: req.body.category_id,
    };

    // Créer le programme dans la base de données
    const insertId = await programRepository.create(newProgram);
    res.status(201).json({ insertId });
  } catch (error) {
    console.error("Error adding program:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Action pour modifier un programme existant
const edit: RequestHandler = async (req, res) => {
  try {
    const programId = Number(req.params.id);
    const updatedProgram = {
      title: req.body.title,
      synopsis: req.body.synopsis,
      poster: req.body.poster,
      country: req.body.country,
      year: req.body.year,
      category_id: req.body.category_id,
    };

    // Mettre à jour le programme dans la base de données
    await programRepository.update(programId, updatedProgram);
    res.sendStatus(204);
  } catch (error) {
    console.error("Error editing program:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Action pour supprimer un programme
const destroy: RequestHandler = async (req, res) => {
  try {
    const programId = Number(req.params.id);

    // Supprimer le programme de la base de données
    await programRepository.delete(programId);
    res.sendStatus(204);
  } catch (error) {
    console.error("Error deleting program:", error);
    res.status(500).send("Internal Server Error");
  }
};

export default { browse, read, add, edit, destroy };
