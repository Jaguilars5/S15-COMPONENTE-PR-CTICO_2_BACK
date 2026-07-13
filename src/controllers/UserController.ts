import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/UserService";
import { ROLES, ERRORS } from "../config/constants";

export class UserController {
  public static async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { name, email, password, role } = req.body;
      if (!name || !email || !password || !role) {
        res.status(400).json({ error: ERRORS.FIELDS_REQUIRED });
        return;
      }
      if (role !== ROLES.FARMER && role !== ROLES.BRAND) {
        res.status(400).json({ error: ERRORS.INVALID_ROLE });
        return;
      }
      const user = await UserService.register({ name, email, password, role });
      res.status(201).json({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public static async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(400).json({ error: ERRORS.FIELDS_REQUIRED });
        return;
      }
      const { user, accessToken, refreshToken } = await UserService.login(email, password);
      res.status(200).json({
        accessToken,
        refreshToken,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public static async refresh(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) {
        res.status(400).json({ error: ERRORS.INVALID_TOKEN });
        return;
      }
      const data = await UserService.refresh(refreshToken);
      res.status(200).json(data);
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  }
}
