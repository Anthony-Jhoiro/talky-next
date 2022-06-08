import { FriendshipDto, MessageDto, UserDto } from "../../api/generated";
import { MessageBubble } from "../Message";

export interface FriendshipMessageBubbleProps {
  friendship: FriendshipDto;
  message: MessageDto;
  otherUserId: string;
}

export const FriendshipMessageBubble = ({
  friendship,
  message,
  otherUserId,
}: FriendshipMessageBubbleProps) => {
  const alignment = otherUserId === message.author ? "RIGHT" : "LEFT";
  const userIndex =
    friendship.friends?.findIndex((f) => f.id === message.author) ?? 0;
  const user = friendship.friends?.[userIndex] as UserDto;

  return <MessageBubble message={message} user={user} alignment={alignment} />;
};
