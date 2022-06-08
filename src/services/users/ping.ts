import { userController } from "../../api";
import { UserPingDto } from "../../api/generated";

export const ping = (options: UserPingDto) => userController().ping(options);
