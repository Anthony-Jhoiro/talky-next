import { NextPage } from "next";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { CreatePostRequestDtoPrivacyEnum } from "../api/generated";
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
import { MultiImageInput } from "../components/MultiImageInput";

interface PostFormInputs {
  content: string;
  privacy: CreatePostRequestDtoPrivacyEnum;
  images: File[];
}

const MAX_IMAGE_COUNT = 10;

const PostCreationScreen: NextPage = () => {
  const router = useRouter();
  // Ouai ok j'admet, react hook form pour 2 inputs c'est un tout petit peu overkill mais bon... voilà
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    control,
  } = useForm<PostFormInputs>({
    defaultValues: {
      content: "",
      privacy: CreatePostRequestDtoPrivacyEnum.PUBLIC,
      images: [],
    },
  });

  const uploadMutation = useMutation(createPost);

  const onSubmit: SubmitHandler<PostFormInputs> = async (data) => {
    // Upload images
    const imagesUrls = await Promise.all(
      data.images.map(async (file) => {
        const [{ url }, buffer] = await Promise.all([
          getPostAssetUploadLink({
            extention: file.type.split("/").pop() ?? "jpg",
          }),
          file.arrayBuffer(),
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
            <Controller
              name={"images"}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <MultiImageInput
                  maxFiles={MAX_IMAGE_COUNT}
                  {...field}
                  errorMessage={error?.message}
                />
              )}
            />
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
