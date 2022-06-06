import { useInfiniteQuery } from "react-query";
import { FIND_USER_QUERY_NAME, findUsers } from "../services/users/listUsers";
import {
  ChangeEventHandler,
  Fragment,
  UIEventHandler,
  useEffect,
  useState,
} from "react";
import Link from "next/link";
import { ProfilePicture } from "../components/ProfilePicture";
import { LoadingIndicator } from "../components/LoadingIndicator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const UserSearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFilterQuery, setSearchFilterQuery] = useState(searchQuery);
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      [FIND_USER_QUERY_NAME, searchFilterQuery],
      ({ pageParam }) =>
        findUsers({
          search: searchFilterQuery,
          page: pageParam,
        }),
      {
        getNextPageParam: (lastPage) =>
          lastPage.last ? null : (lastPage.number ?? 0) + 1,
      }
    );

  useEffect(() => {
    return () => {
      if (searchTimeout) clearTimeout(searchTimeout);
    };
  }, [searchTimeout]);

  const onSearchQueryChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    const timeout = setTimeout(() => {
      setSearchFilterQuery(value);
    }, 800);
    setSearchTimeout(timeout);
  };

  const onListScroll: UIEventHandler<HTMLElement> = ({ currentTarget }) => {
    if (
      hasNextPage &&
      !isFetchingNextPage &&
      currentTarget.scrollHeight - currentTarget.scrollTop ===
        currentTarget.clientHeight
    ) {
      fetchNextPage().then(null);
    }
  };

  return (
    <main id={"search users"} className={"container mx-auto mt-5 h-full"}>
      <div className={"bg-white p-5 mb-5 "}>
        <div
          className={
            "border-b-2 focus-within:border-primary border-gray flex group flex items-center"
          }
        >
          <FontAwesomeIcon
            icon={faSearch}
            className={"text-gray-600 mr-2 group-focus-within:text-primary"}
          />
          <input
            type="text"
            className={"outline-none w-full  transition-color"}
            placeholder={"Search a user"}
            value={searchQuery}
            onChange={onSearchQueryChange}
          />
        </div>
      </div>

      <div className={"bg-white p-5 h-full overflow-hidden"}>
        <div
          onScroll={onListScroll}
          className={"overflow-y-scroll flex flex-wrap p-5"}
        >
          {data?.pages.map((group, i) => (
            <Fragment key={i}>
              {group.content?.map((userDto) => (
                <div key={userDto.id} className={"p-2 max-w-5xl basis-1/2"}>
                  <Link
                    href={`/profile/${userDto.id}`}
                    as={"/profile/" + userDto.id}
                    prefetch={false}
                  >
                    <a>
                      <div
                        className={
                          "bg-white p-5 shadow hover:shadow-lg transition-shadow cursor-pointer"
                        }
                      >
                        <ProfilePicture user={userDto} />
                      </div>
                    </a>
                  </Link>
                </div>
              ))}
            </Fragment>
          ))}

          {isFetchingNextPage && <LoadingIndicator />}
        </div>
      </div>
    </main>
  );
};

export default UserSearchScreen;
