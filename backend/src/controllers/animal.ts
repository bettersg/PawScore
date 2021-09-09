import express from "express";
import { AnimalModel } from "../models/animal";

class AnimalController {
  async getAll(req: express.Request, res: express.Response) {
    try {
      const animals = await AnimalModel.findAll();
      res.json({ status: "success", data: animals });
    } catch (err) {
      res.status(500).json({ status: "failure", message: "Failed to retrieve animals" });
    }
  }
}

export default new AnimalController();
