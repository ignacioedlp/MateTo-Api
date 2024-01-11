import { Router } from 'express';

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "Status OK" });
});

export default router;
