import { Router } from "express";
import { CoffeeController } from "../controllers/CoffeeController";
import { authMiddleware, requireRole } from "../middleware/auth";

const router = Router();

router.use(authMiddleware);

router.get("/price", CoffeeController.getCurrentPrice);
router.post("/sell", requireRole("FARMER"), CoffeeController.sellBatch);
router.get("/batches/my", requireRole("FARMER"), CoffeeController.getMyBatches);
router.get("/batches/all", requireRole("BRAND"), CoffeeController.getAllBatches);
router.get("/trends", CoffeeController.getPriceTrends);
router.post("/trends", requireRole("BRAND"), CoffeeController.addPriceTrend);

export default router;
