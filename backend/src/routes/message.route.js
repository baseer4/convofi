import express from express;
import { protectRoute } from "../middleware/auth.middleware";

const router = express.Router();

router.get("/user", protectRoute , getUserforSidebar);

router.get("/:id",protectRoute, getMessages);

router.post("/send/:id",protectRoute,sendMessage);


export default router;

