module.exports = {
  routes: [
    {
      method: "POST",
      path: "/email",
      handler: "email.send",
      config: {
        auth: false,
        policies: ["global::verifyCaptcha"],
      },
    },
  ],
};
