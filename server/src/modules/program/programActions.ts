// Importer l'accès aux données
import type { RequestHandler } from "express";
import programRepository from "./programRepository";

// Déclarer les actions

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

const read: RequestHandler = async (req, res) => {
  try {
    const parsedId = Number.parseInt(req.params.id);

    // Utiliser le repository pour obtenir un programme spécifique
    const programsFromDB = await programRepository.readAll();
    const program = programsFromDB.find((p) => p.id === parsedId);

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

// Exporter les actions pour les importer ailleurs
export default { browse, read };
