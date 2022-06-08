import {
  getSession,
  handleAuth,
  handleCallback,
  handleLogin,
} from "@auth0/nextjs-auth0";
import { userController } from "../../../api";
import { AxiosError } from "axios";

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
  async callback(req, res) {
    const session = getSession(req, res);

    if (session?.accessToken) {
      // Check that the user exists
      const buildedUserController = await userController({ req, res });

      try {
        await buildedUserController.getCurrentUser();
      } catch (err: any | AxiosError) {
        // The user needs to be created
        const user = session.user;

        await buildedUserController.createUser({
          defaultProfilePicture: user.picture ?? "",
          displayedName: user.name ?? "unknown",
        });
      }
    }

    return await handleCallback(req, res);

    // if (session?.accessToken) {
    //   userController({req, res}).createUser({
    //     defaultProfilePicture: session.user
    //   })
    // }
  },
});
