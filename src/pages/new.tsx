import { NextPage } from "next";
import { SubmitHandler, useForm } from "react-hook-form";
import { CreatePostRequestDtoPrivacyEnum } from "../api/generated";
import { ChangeEventHandler, useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { LoadingIndicator } from "../components/LoadingIndicator";
import {
  createPost,
  getPostAssetUploadLink,
} from "../services/posts/createPost";
import {
  extractAssetNameFromLink,
  uploadAsset,
} from "../services/assets/uploadAssets";
import { useMutation } from "react-query";
import { useRouter } from "next/router";

interface PostFormInputs {
  content: string;
  privacy: CreatePostRequestDtoPrivacyEnum;
}

const MAX_IMAGE_COUNT = 10;

const PostCreationScreen: NextPage = () => {
  const router = useRouter();
  // Ouai ok j'admet, react hook form pour 2 inputs c'est un tout petit peu overkill mais bon... voilà
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<PostFormInputs>({
    defaultValues: {
      content: "",
      privacy: CreatePostRequestDtoPrivacyEnum.PUBLIC,
    },
  });

  const uploadMutation = useMutation(createPost);

  const [images, setImages] = useState<File[]>([]);

  const onInputImage: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files) {
      const addedFiles = Array.from(e.target.files).slice(
        0,
        MAX_IMAGE_COUNT - images.length
      );
      setImages([...images, ...addedFiles]);
    }
  };

  const removeImage = (index: number) => {
    setImages([...images.slice(0, index), ...images.slice(index + 1)]);
  };

  const onSubmit: SubmitHandler<PostFormInputs> = async (data) => {
    // Upload images
    const imagesUrls = await Promise.all(
      images.map(async (image) => {
        const [{ url }, buffer] = await Promise.all([
          getPostAssetUploadLink({
            extention: image.type.split("/").pop() ?? "jpg",
          }),
          image.arrayBuffer(),
        ]);

        await uploadAsset(url as string, buffer);

        return extractAssetNameFromLink(url as string);
      })
    );

    // Create the post

    uploadMutation.mutate({
      content: data.content,
      privacy: data.privacy,
      assets: imagesUrls as string[],
    });
    await router.push("/");
  };

  return (
    <main
      className={
        "container mx-auto mt-5 flex flex-col h-full overflow-hidden bg-gray-100 p-5 border-box"
      }
    >
      <h3 className={"text-2xl font-semibold border-l-primary pl-2 border-l-2"}>
        Create a post
      </h3>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div id={"post-content"} className={"my-8 text-lg"}>
          <label htmlFor="post-content-terxtarea">Your post content</label>
          <textarea
            className={"w-full outline-none resize-none h-64 p-2"}
            placeholder={"Quoi de neuf"}
            {...register("content", {
              required: "This field is required",
              maxLength: {
                value: 250,
                message: "Your content exceded the max limit of 250 characters",
              },
            })}
          />
          {errors.content && (
            <p className={"border-l-2 border-l-red-600 pl-2"}>
              {errors.content.message}
            </p>
          )}
        </div>

        <div id={"post-privacy-selector"} className={"my-8"}>
          <p className={"text-lg"}>Who can see your post ?</p>

          <div className={"bg-white px-5"}>
            <div className={"py-3"}>
              <input
                type="radio"
                id={"privacy-public"}
                {...register("privacy")}
                value={CreatePostRequestDtoPrivacyEnum.PUBLIC}
              />
              <label htmlFor="privacy-public" className={"cursor-pointer ml-5"}>
                Public : Anyone can see your post
              </label>
            </div>

            <div className={"py-3"}>
              <input
                type="radio"
                id={"privacy-private"}
                {...register("privacy")}
                value={CreatePostRequestDtoPrivacyEnum.PRIVATE}
              />
              <label
                htmlFor="privacy-private"
                className={"cursor-pointer ml-5"}
              >
                Private : Only you can see your post
              </label>
            </div>
          </div>

          <div id={"image-selector"} className={"my-8"}>
            {images.length > 0 && (
              <div className={"overflow-x-scroll whitespace-nowrap"}>
                {images.map((image, i) => (
                  <div
                    key={i}
                    className={
                      "h-32 w-32 bg-gray-800 relative overflow-hidden inline-block ml-3"
                    }
                    onClick={() => removeImage(i)}
                  >
                    <Image
                      src={URL.createObjectURL(image)}
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
            />
            <label
              htmlFor={"image-selector-input"}
              className={
                "bg-tertiary px-4 py-2 text-white rounded cursor-pointer"
              }
            >
              Add an image
            </label>
          </div>

          <div className={"flex justify-center mt-5"}>
            {!isSubmitting && (
              <button
                type="submit"
                className={"bg-primary py-2 px-4 rounded text-white"}
              >
                Publish
              </button>
            )}
            {isSubmitting && <LoadingIndicator />}
          </div>
        </div>
      </form>
    </main>
  );
};

export default PostCreationScreen;
