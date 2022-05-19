import {DataProvider, Refine} from "@pankod/refine-core";
import {Layout, ReadyPage, notificationProvider, ErrorComponent} from "@pankod/refine-antd";
import routerProvider from "@pankod/refine-react-router-v6";
import {GraphQLClient} from "graphql-request";
import * as gql from "gql-query-builder";



import "@pankod/refine-antd/dist/styles.min.css";
import dataProvider from "@pankod/refine-hasura";

import {ProductList} from "./pages/products";
import {UserCreate, UserEdit, UserList, UserShow} from "./pages/users";

//Ably and lifeProvider
import {Ably} from "@pankod/refine-ably";
import {liveProvider} from "@pankod/refine-ably";

import {PostCreate, PostEdit, PostList, PostShow} from "./pages/posts";


const API_URL = "https://nhg.hasura.app/v1/graphql";

const AblyKey = 'syVQsA.ofJCQg:GvXwhLsJhjMo4onQ_zQKjvb9biBIXMiDd7qLo9ZVA38'

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

export const myDataProvider = (client: GraphQLClient): DataProvider => {
  return {
    ...gqlDataProvider,
    deleteOne: async ({resource, id, metaData}) => {
      const operation = metaData?.operation ?? resource;

      const deleteOperation = `delete_${operation}_by_pk`;

      const {query, variables} = gql.mutation({
        operation: deleteOperation,
        variables: {
          id: {value: id, type: "bigint", required: true},
          ...metaData?.variables,
        },
        fields: metaData?.fields ?? ["id"],
      });

      const response = await client.request(query, variables);

      return {
        data: response[deleteOperation],
      };
    },
    getOne: async ({resource, id, metaData}) => {
      const operation = `${metaData?.operation ?? resource}_by_pk`;

      const { query, variables } = gql.query({
        operation,
        variables: {
          id: { value: id, type: "bigint", required: true },
          ...metaData?.variables,
        },
        fields: metaData?.fields,
      });

      const response = await client.request(query, variables);

      return {
        data: response[operation],
      };
    },
  };
}

const App: React.FC = () => {
  return (
    <Refine
      routerProvider={routerProvider}

      dataProvider={myDataProvider(client)}
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

