import {Refine} from "@pankod/refine-core";
import {Layout, ReadyPage, notificationProvider, ErrorComponent} from "@pankod/refine-antd";
import routerProvider from "@pankod/refine-react-router-v6";
import {GraphQLClient} from "graphql-request";


import "@pankod/refine-antd/dist/styles.min.css";
import dataProvider from "@pankod/refine-hasura";

import {ProductList} from "./pages/products";
import {UserCreate, UserEdit, UserList, UserShow} from "./pages/users";

//Ably and lifeProvider
import {Ably} from "@pankod/refine-ably";
import {liveProvider} from "@pankod/refine-ably";

import {PostCreate, PostEdit, PostList, PostShow} from "./pages/posts";


const API_URL = "https://nhg.hasura.app/v1/graphql";

const AblyKey = 'AGKk_A.-YDAPQ:nKDFb0xKX-jW1ooiAjY4WNCea9JFxZlKSNf2tL0Rq2A'

export const ablyClient = new Ably.Realtime(AblyKey);

const client = new GraphQLClient(API_URL, {
  headers: {
    'x-hasura-role': 'admin',
    'x-hasura-admin-secret': 'kovLCJ4txXECIpaWfYobyrDRfvUhlU3AfOgn4rFsLJ86o8lIf8JDEIXoKRfhQ2fW'
  },
});

// const API_URL = "https://flowing-mammal-24.hasura.app/v1/graphql";
//
// const client = new GraphQLClient(API_URL, {
//   headers: {
//     "x-hasura-role": "public",
//   },
// });

const gqlDataProvider = dataProvider(client);

const App: React.FC = () => {
  return (
    <Refine
      routerProvider={routerProvider}
      dataProvider={gqlDataProvider}
      liveProvider={liveProvider(ablyClient)}
      resources={
        [
          {
            name: "products",
            list: ProductList
          },
          {
            name: "users",
            list: UserList,
            show: UserShow,
            edit: UserEdit,
            create: UserCreate
          },
          {
            name: "posts",
            list: PostList,
            create: PostCreate,
            edit: PostEdit,
            show: PostShow,
            // canDelete: true,
          },
        ]
      }
      liveMode="auto"
      Layout={Layout}
      ReadyPage={ReadyPage}
      notificationProvider={notificationProvider}
      catchAll={<ErrorComponent/>}
    />
  );
};

export default App;

