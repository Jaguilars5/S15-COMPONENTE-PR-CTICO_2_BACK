import { Router } from "express";
import { ProductController } from "../controllers/ProductController";
import { authMiddleware, requireRole } from "../middleware/auth";

const router = Router();

router.use(authMiddleware);

router.post("/", requireRole("BRAND"), ProductController.createProduct);
router.post("/buy", ProductController.buyProducts);
router.get("/", ProductController.getAllProducts);
router.get("/:id", ProductController.getProductById);
router.put("/:id", requireRole("BRAND"), ProductController.updateProduct);
router.delete("/:id", requireRole("BRAND"), ProductController.deleteProduct);

export default router;
