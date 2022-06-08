import React, { FC, useContext, useEffect, useState } from "react";
import { MessageDto, UserPingDto } from "../../api/generated";
import { useUser } from "@auth0/nextjs-auth0";
import { useMutation } from "react-query";
import { ping } from "../../services/users/ping";

export interface FirebaseMessagingProviderProps {
  children: React.ReactNode;
}

export interface NotificationContextValue {
  notifications: MessageDto[];
  token: string | null;
}

const NotificationContext = React.createContext<NotificationContextValue>({
  notifications: [],
  token: null,
});

export const useNotifications = () => useContext(NotificationContext);

export const FirebaseMessagingProvider: FC<FirebaseMessagingProviderProps> = ({
  children,
}) => {
  const auth = useUser();

  const [token, setToken] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<MessageDto[]>([]);

  const { mutate } = useMutation((options: UserPingDto) => ping(options));

  useEffect(() => {
    if (auth.user && token) {
      mutate({ deviceId: token });
    }
    let interval: NodeJS.Timer | null = null;

    if (auth.user && token) {
      interval = setInterval(() => {
        mutate({});
      }, 5 * 1000 * 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [token, auth, mutate]);

  useEffect(() => {
    let isSubscribe = true;
    import("../../services/firebase").then(
      ({ getTokenWrapper, onMessageListener }) => {
        getTokenWrapper(setToken).then(null);

        onMessageListener().then((payload) => {
          if (isSubscribe) {
            const message = payload.data as MessageDto;
            setNotifications([...notifications, message]);
          }
        });
      }
    );
    return () => {
      isSubscribe = false;
    };
  });

  return (
    <NotificationContext.Provider value={{ notifications, token }}>
      {children}
    </NotificationContext.Provider>
  );
};
