import type { RequestHandler } from "express";
import programRepository from "./programRepository";

// Déclarer les actions

const browse: RequestHandler = async (req, res) => {
  try {
    const programsFromDB = await programRepository.readAll();
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

    const insertId = await programRepository.create(newProgram);
    res.status(201).json({ insertId });
  } catch (error) {
    console.error("Error adding program:", error);
    res.status(500).send("Internal Server Error");
  }
};

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

    await programRepository.update(programId, updatedProgram);
    res.sendStatus(204);
  } catch (error) {
    console.error("Error editing program:", error);
    res.status(500).send("Internal Server Error");
  }
};

const destroy: RequestHandler = async (req, res) => {
  try {
    const programId = Number(req.params.id);
    await programRepository.delete(programId);
    res.sendStatus(204);
  } catch (error) {
    console.error("Error deleting program:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Exporter les actions pour les importer ailleurs
export default { browse, read, add, edit, destroy };
