exports.getMe = (req, res) => {
    res.json(req.user);
  };  