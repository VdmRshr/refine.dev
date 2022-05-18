import {IResourceComponentsProps, useShow} from '@pankod/refine-core'

import {Show, Typography, TagField, Button, RefreshButton} from '@pankod/refine-antd'

import React from 'react'

const {Title, Text} = Typography

interface IUser {
  created_at: string
  email: string
  email_verified_at: string | null
  id: number
  name: string
  password: string
  remember_token: string | null
  updated_at: string
  verified: boolean
}

export const UserShow: React.FC<IResourceComponentsProps> = () => {
  const metaData = {
    fields: [
      "id",
      "email",
      "name"
    ],
  };

  const {queryResult} = useShow<IUser>({
    metaData,
  });

  const {data, isLoading} = queryResult;
  const record = data?.data;

  return (

    <>
      <Title level={5}>Id</Title>
      <Text>{record?.id}</Text>

      <Title level={5}>Name</Title>
      <Text>{record?.name}</Text>

      <Title level={5}>Password</Title>
      <Text>{record?.password}</Text>

      <Title level={5}>Email</Title>
      <Text>{record?.email}</Text>

      <Title level={5}>Email verified at</Title>
      <Text>{record?.email_verified_at}</Text>

      <Title level={5}>Remember token</Title>
      <Text>{record?.remember_token}</Text>

      <Title level={5}>Created at</Title>
      <Text>{record?.created_at}</Text>

      <Title level={5}>Updated at</Title>
      <Text>{record?.updated_at}</Text>

      <Title level={5}>Verified</Title>
      <Text>
        <TagField
          value={record?.verified}
          color={record?.verified ? 'green' : 'red'}
        />
      </Text>
    </>
  )
}
