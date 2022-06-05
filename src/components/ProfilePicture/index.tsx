import React from "react";
import Image from "next/image";
import { UserDto } from "../../api/generated";

export interface User {
  name?: string | null;
  id: string;
  image?: string | null;
}

export interface ProfilePictureProps {
  user: UserDto;
  imageOnly?: boolean;
}

export const ProfilePicture: React.VFC<ProfilePictureProps> = ({
  user,
  imageOnly,
}: ProfilePictureProps) => {
  const name = user.displayedName ?? "unknown";

  return (
    <div className={"flex items-center"}>
      <div
        className={"rounded-full h-8 w-8 bg-gray-200 overflow-hidden relative"}
      >
        {user.profilePicture && (
          <Image
            src={user.profilePicture}
            alt={`Photo de profil de ${name}`}
            objectFit={"cover"}
            layout={"fill"}
          />
        )}
      </div>
      {imageOnly || <h3 className={"text-primary-700 text-lg ml-2"}>{name}</h3>}
    </div>
  );
};
