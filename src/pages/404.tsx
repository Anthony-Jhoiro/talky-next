import { NextPage } from "next";
import Link from "next/link";

const Error404Screen: NextPage = () => {
  return (
    <main
      id={"error-404"}
      className={
        "container mx-auto bg-gray-100 mt-5 p-5 h-full flex justify-center"
      }
    >
      <div className={"bg-white text-center h-min p-5"}>
        <h2 className={"text-2xl mb-8"}>
          404 -The page you requested is not available
        </h2>

        <Link href={"/"}>
          <button className={"bg-primary px-4 py-2 text-white"}>
            Return to home screen
          </button>
        </Link>
      </div>
    </main>
  );
};

export default Error404Screen;
