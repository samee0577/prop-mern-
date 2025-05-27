const checkRole = (roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {    ///check if the allowed users role is there (in the given roles param) by the function
        return res.status(403).json({ message: "Access denied" });
      }
      next();
    };
  };

export default checkRole
  