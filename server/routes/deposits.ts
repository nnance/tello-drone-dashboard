import { Router } from "express";
import { IDeposits } from "../../lib/deposits";

const router = Router();

const data: IDeposits[] = [{
  date: new Date(),
  total: 3510.00,
}];

router.get("/", (req, res) => {
    res.json(data);
});

export default router;
