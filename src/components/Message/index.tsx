import { FC } from "react";
import { MessageDto, UserDto } from "../../api/generated";
import clsx from "clsx";
import { ProfilePicture } from "../ProfilePicture";

export type MessageAlignement = "LEFT" | "RIGHT";

export interface MessageBubbleProps {
  message: MessageDto;
  user: UserDto;
  alignment: MessageAlignement;
}

export const MessageBubble: FC<MessageBubbleProps> = ({
  message,
  user,
  alignment,
}) => {
  const classes =
    alignment === "LEFT"
      ? "bg-primary text-white rounded-bl-lg"
      : "bg-tertiary-100 rounded-br-lg";

  const alignmentClasses =
    alignment === "LEFT" ? "flex-row-reverse" : "justify-start";

  return (
    <div className={clsx("flex p-1", alignmentClasses)}>
      <div className={"px-2 flex flex-col justify-end"}>
        <ProfilePicture user={user} imageOnly />
      </div>
      <div className={clsx("max-w-[70%] p-3 rounded-t-lg", classes)}>
        {message.createdAt && (
          <span className={clsx("text-xs flex", alignmentClasses)}>
            {new Date(message.createdAt).toLocaleTimeString()}
          </span>
        )}
        <div>{message.content}</div>
      </div>
    </div>
  );
};
