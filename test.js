server.post("/api/login", (request, response) => {
  const { email, password, usertype } = request.body || {};
  const identifier = email;

  if (!identifier || !password) {
    response
      .status(400)
      .json({ message: "Mangler e-post og/eller passord.", type: "general" });
    return;
  }

  // Må legge inn en sjekk her for usertype. og legge til riktig routing!
  const users = router.db.get("users").value();
  const user = users.find((u) => u.email === identifier);

  if (!user) {
    response
      .status(401)
      .json({ message: "E-post eksisterer ikke.", type: "email" });
    return;
  }

  if (user.password !== password) {
    response.status(401).json({ message: "Feil passord.", type: "password" });
    return;
  }

  response.status(200).json({ API_KEY: process.env.API_KEY });
});
