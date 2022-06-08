import { useInfiniteQuery } from "react-query";
import { FIND_USER_QUERY_NAME, findUsers } from "../services/users/listUsers";
import { ChangeEventHandler, Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { ProfilePicture } from "../components/ProfilePicture";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { InfiniteScrollContainer } from "../components/InfiniteScrollContainer";

const UserSearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFilterQuery, setSearchFilterQuery] = useState(searchQuery);
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
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

  return (
    <div>
      <div className={"container mx-auto mt-5 bg-white p-5 mb-5 "}>
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
      <InfiniteScrollContainer
        id={"search users"}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage ?? true}
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
      </InfiniteScrollContainer>
    </div>
  );
};

export default UserSearchScreen;
