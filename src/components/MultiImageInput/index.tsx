import { ChangeEventHandler, FC, Ref } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export interface MultiImageInputProps {
  maxFiles: number;
  value: File[];
  onChange: (files: File[]) => void;
  onBlur: () => void;
  name: string;
  ref: Ref<HTMLInputElement>;
  errorMessage?: string;
}

export const MultiImageInput: FC<MultiImageInputProps> = ({
  maxFiles,
  value: files,
  onChange: setFiles,
  onBlur,
  name,
  ref,
  errorMessage,
}) => {
  const onInputImage: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files) {
      const addedFiles = Array.from(e.target.files).slice(
        0,
        maxFiles - files.length
      );
      setFiles([...files, ...addedFiles]);
    }
  };

  const removeImage = (index: number) => {
    setFiles([...files.slice(0, index), ...files.slice(index + 1)]);
  };

  return (
    <div>
      {files.length > 0 && (
        <div className={"overflow-x-scroll whitespace-nowrap"}>
          {files.map((files, i) => (
            <div
              key={i}
              className={
                "h-32 w-32 bg-gray-800 relative overflow-hidden inline-block ml-3"
              }
              onClick={() => removeImage(i)}
            >
              <Image
                src={URL.createObjectURL(files)}
                alt={"Image uploaded by you ; No " + i + 1}
                objectFit={"cover"}
                layout={"fill"}
              />
              <div
                className={
                  "absolute top-0 left-0 w-full h-full bg-tertiary-500 text-red-700 cursor-pointer hover:opacity-60 opacity-0 transition-opacity flex items-center justify-center"
                }
              >
                <FontAwesomeIcon icon={faTrash} size={"2x"} />
              </div>
            </div>
          ))}
        </div>
      )}

      <input
        type="file"
        id={"image-selector-input"}
        className={"hidden"}
        multiple
        onChange={onInputImage}
        name={name}
        ref={ref}
        onBlur={onBlur}
      />
      <label
        htmlFor={"image-selector-input"}
        className={"bg-tertiary px-4 py-2 text-white rounded cursor-pointer"}
      >
        Add an image
      </label>
      {files.length >= maxFiles && (
        <p>
          You have reached the limit of <span>{maxFiles}</span> files
        </p>
      )}
      {errorMessage && (
        <p className={"border-l-2 border-l-red-500 pl-2"}>{errorMessage}</p>
      )}
    </div>
  );
};
