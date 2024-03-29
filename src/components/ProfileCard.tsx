import { ProfileDto, UpdateUserRequestDto, UserDto } from "../api/generated";
import React, { FC, useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCamera,
  faCheck,
  faEnvelope,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import { useMutation, useQueryClient } from "react-query";
import {
  getProfilePictureUploadLink,
  PROFILE_QUERY_NAME,
  updateUser,
} from "../services/users/getProfile";
import {
  extractAssetNameFromLink,
  uploadAsset,
} from "../services/assets/uploadAssets";
import { LoadingIndicator } from "./LoadingIndicator";
import {
  FRIEND_REQUESTS_QUERY_NAME,
  sendFriendRequest,
} from "../services/social/friendRequests";

export interface ProfileCardProps {
  profile: UserDto | ProfileDto;
  editable: boolean;
}

function isProfileDto(dto: UserDto | ProfileDto): dto is ProfileDto {
  return "areFriends" in dto;
}

export const ProfileCard: FC<ProfileCardProps> = ({ profile, editable }) => {
  const queryClient = useQueryClient();

  const sendFriendRequestMutation = useMutation(
    FRIEND_REQUESTS_QUERY_NAME,
    () => sendFriendRequest({ recipient: profile.id }),
    {
      onSuccess: () =>
        queryClient.invalidateQueries(FRIEND_REQUESTS_QUERY_NAME),
    }
  );

  const mutation = useMutation(
    PROFILE_QUERY_NAME,
    (request: UpdateUserRequestDto) => updateUser(request),
    {
      onSuccess: () => queryClient.invalidateQueries(PROFILE_QUERY_NAME),
    }
  );

  const [isUploadingProfilePicture, setIsUploadingProfilePicture] =
    useState(false);
  const [isEditingDisplayedName, setIsEditingDisplayedName] = useState(false);
  const [newDisplayedName, setNewDisplayedName] = useState(
    profile.displayedName as string
  );

  const onImageChanged: React.ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    if (event.target.files && event.target.files[0] !== null) {
      setIsUploadingProfilePicture(true);
      const file = event.target.files[0];

      const extention = file.name.split(".").pop() ?? "jpg";

      const [getLinkResponse, fileBuffer] = await Promise.all([
        getProfilePictureUploadLink({ extention }),
        file.arrayBuffer(),
      ]);

      const link = getLinkResponse.url as string;
      await uploadAsset(link, fileBuffer);

      mutation.mutate({
        profilePicture: extractAssetNameFromLink(link),
      });
      setIsUploadingProfilePicture(false);
    }
  };

  const onNewDisplayedNameSubmit = () => {
    if (newDisplayedName?.length > 1) {
      mutation.mutate({
        displayedName: newDisplayedName,
      });
      setIsEditingDisplayedName(false);
    }
  };

  return (
    <div className={"flex gap-16"}>
      {/* Profile picture*/}
      <div className={"h-64 w-64 rounded-full overflow-hidden relative"}>
        {editable && (
          <input
            id={"profilePictureSelector"}
            type="file"
            className={"hidden"}
            onChange={onImageChanged}
          />
        )}
        {isUploadingProfilePicture ? (
          <div
            className={
              "w-full h-full bg-gray-100 flex items-center justify-center"
            }
          >
            <LoadingIndicator />
          </div>
        ) : (
          <>
            {profile.profilePicture && (
              <Image
                src={profile.profilePicture}
                alt={`Profile picture of ${profile.displayedName}`}
                objectFit={"cover"}
                layout={"fill"}
                unoptimized
              />
            )}
            {!profile.profilePicture && (
              <div className={"w-full h-full bg-tertiary"} />
            )}

            {editable && (
              <label
                htmlFor={"profilePictureSelector"}
                className={
                  "absolute w-full h-full bg-gray-500 opacity-0 hover:opacity-40 transition-opacity flex items-center justify-center text-white text-8xl cursor-pointer"
                }
              >
                <FontAwesomeIcon icon={faCamera} color={"#ffffff"} />
              </label>
            )}
          </>
        )}
      </div>

      {/* Displayed named */}

      <div className={"flex flex-col gap-3"}>
        <div>
          {!isEditingDisplayedName && (
            <h3 className={"text-2xl text-primary font-semibold"}>
              <span>{profile.displayedName}</span>
              {editable && (
                <button
                  className={"ml-3"}
                  onClick={() => setIsEditingDisplayedName(true)}
                >
                  <FontAwesomeIcon icon={faPen} />
                </button>
              )}
            </h3>
          )}
          {isEditingDisplayedName && (
            <form onSubmit={onNewDisplayedNameSubmit}>
              <label
                htmlFor="newDisplayName"
                className={"text-sm text-primary"}
              >
                Displayed Name
              </label>

              <div className={"flex gap-3"}>
                <input
                  type="text"
                  id={"newDisplayName"}
                  className={
                    "outline-none border-b-2 focus:border-primary border-gray "
                  }
                  autoFocus={true}
                  value={newDisplayedName}
                  onChange={(e) => setNewDisplayedName(e.target.value)}
                  disabled={mutation.isLoading}
                />
                <button
                  type={"submit"}
                  className={
                    "flex items-center justify-center h-8 w-8 text-white rounded " +
                    (mutation.isLoading ? "bg-gray" : "bg-primary")
                  }
                  disabled={mutation.isLoading}
                >
                  <FontAwesomeIcon icon={faCheck} />
                </button>
              </div>
            </form>
          )}
        </div>

        {isProfileDto(profile) && (
          <div>
            {profile.areFriends && <p>You are friends !</p>}
            {!profile.areFriends && (
              <>
                {sendFriendRequestMutation.isIdle && (
                  <button
                    className={
                      "bg-primary text-white px-4 py-2 rounded flex gap-1 items-center"
                    }
                    onClick={() => sendFriendRequestMutation.mutate()}
                  >
                    <FontAwesomeIcon icon={faEnvelope} />
                    <span>Send a friend request</span>
                  </button>
                )}
                {sendFriendRequestMutation.isLoading && <LoadingIndicator />}
                {sendFriendRequestMutation.isError && (
                  <p>There was an error creating the request.</p>
                )}
                {sendFriendRequestMutation.isSuccess && (
                  <p>Your request has been sent successfully.</p>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
