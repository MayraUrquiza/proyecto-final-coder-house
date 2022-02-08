class AuthController {
  authenticate = async (req, res, next) => {
    try {
      const { admin } = req.headers;
      const { method, originalUrl } = req;

      if (!admin)
        return res
          .status(403)
          .json({
            error: -1,
            description: `Usuario sin permiso para ejecutar ${method} en ${originalUrl}.`,
          });

      next();
    } catch (error) {
      res.status(500).json({ error });
    }
  };
}

export default AuthController;
