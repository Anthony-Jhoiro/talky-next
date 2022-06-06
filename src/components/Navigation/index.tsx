import Link from "next/link";
import { ProfilePicture } from "../ProfilePicture";
import { useQuery } from "react-query";
import {
  getProfile,
  PROFILE_QUERY_NAME,
} from "../../services/users/getProfile";
import { LoadingIndicator } from "../LoadingIndicator";

export interface NavigationProps {}

export const Navigation = ({}: NavigationProps) => {
  const {
    data: profileData,
    error: profileFetchError,
    isFetching: profileIsFetching,
  } = useQuery(PROFILE_QUERY_NAME, () => getProfile());

  return (
    <div className={"flex h-12 bg-white items-center px-8 justify-between"}>
      <div className={"flex gap-3"}>
        <Link href={"/"}>
          <h2 className={"text-2xl text-primary cursor-pointer"}>Talky</h2>
        </Link>
      </div>
      <div className={"flex items-center gap-3"}>
        {profileIsFetching ? (
          <LoadingIndicator />
        ) : (
          <>
            {profileFetchError ? (
              <p>Fail to fetch user</p>
            ) : (
              <>
                {profileData && (
                  <>
                    <Link href={"/api/auth/logout"}>
                      <button className={"bg-secondary rounded text-white p-2"}>
                        Log-out
                      </button>
                    </Link>
                    <Link href={"/profile"}>
                      <div
                        className={
                          "cursor-pointer h-full flex items-center justify-center"
                        }
                      >
                        <ProfilePicture user={profileData} imageOnly={true} />
                      </div>
                    </Link>
                  </>
                )}
                {!profileData && (
                  <Link href={"/api/auth/login"}>
                    <button className={"bg-primary rounded text-white p-2"}>
                      Log-in
                    </button>
                  </Link>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};
