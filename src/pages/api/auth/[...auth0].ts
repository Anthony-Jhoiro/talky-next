import { handleAuth, handleLogin } from "@auth0/nextjs-auth0";

export default handleAuth({
  async login(req, res) {
    try {
      await handleLogin(req, res, {
        authorizationParams: {
          // Add the `offline_access` scope to also get a Refresh Token
          scope: "openid profile email offline_access", // or AUTH0_SCOPE
        },
      });
    } catch (error) {
      //@ts-ignore
      res.status(error.status || 400).end(error.message);
    }
  },
});
