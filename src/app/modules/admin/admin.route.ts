import express from "express";
import { adminControllers } from "./admin.controller";
import validateRequest from "../../middlewares/validateRequest";
import { AdminValidations } from "./admin.validation";

const router = express.Router()

router.get('/', adminControllers.getAllAdmins)
router.get('/:id', adminControllers.getSingleAdmin)
router.patch('/:id', validateRequest(AdminValidations.updateAdminValidationSchema), adminControllers.updateAdmin)
router.delete('/:id', adminControllers.deleteAdmin)


export const adminRoutes = router;