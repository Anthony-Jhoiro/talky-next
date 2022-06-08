import { FC, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

export interface DiscussionInputProps {
  onSendMessage: (input: { content: string }) => void;
  disabled: boolean;
}

export const DiscussionInput: FC<DiscussionInputProps> = ({
  onSendMessage,
}) => {
  const [textContent, setTextContent] = useState("");

  const _sendMessage = () => {
    onSendMessage({ content: textContent });
    setTextContent("");
  };

  return (
    <div className={"h-full w-full px-4 py-2"}>
      <form onSubmit={_sendMessage} className={"flex"}>
        <input
          type="text"
          placeholder={"Your message"}
          className={"grow outline-none resize-none h-min"}
          autoFocus
          value={textContent}
          onChange={(e) => setTextContent(e.target.value)}
        />

        <button
          type="submit"
          className={
            "bg-primary p-2 h-12 aspect-square rounded-full text-white"
          }
        >
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </form>
    </div>
  );
};
