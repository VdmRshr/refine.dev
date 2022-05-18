import React, {useState} from 'react'

import {Edit, Form, Input, Select, Button, useForm, Alert, RefreshButton, ListButton} from '@pankod/refine-antd'



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

export const UserEdit: React.FC = () => {
  // const {formProps, saveButtonProps, queryResult} = useForm<IUser>();
  const [deprecated, setDeprecated] =
    useState<"deleted" | "updated" | undefined>();

  const { formProps, saveButtonProps, queryResult } = useForm<IUser>({
    liveMode: "manual",
    onLiveEvent: (event) => {
      if (event.type === "deleted" || event.type === "updated") {
        setDeprecated(event.type);
      }
    },
  });

  const handleRefresh = () => {
    queryResult?.refetch();
    setDeprecated(undefined);
  };


  // @ts-ignore
  const edit = <><Edit saveButtonProps={saveButtonProps}>
    {deprecated === "deleted" && (
      <Alert
        message="This post is deleted."
        type="warning"
        style={{ marginBottom: 20 }}
        action={<ListButton size="small" />}
      />
    )}
    {deprecated === "updated" && (
      <Alert
        message="This post is updated. Refresh to see changes."
        type="warning"
        style={{ marginBottom: 20 }}
        action={
          <RefreshButton size="small" onClick={handleRefresh} />
        }
      />
    )}
    <Form {...formProps} layout="vertical">
      <Form.Item
        label="Name"
        name="name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input/>
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input/>
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input/>
      </Form.Item>
      <Form.Item
        label="Verified"
        name="verified"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
          options={[
            {
              label: 'true',
              value: true,
            },
            {
              label: 'false',
              value: false,
            },
          ]}
        />
      </Form.Item>
    </Form>
  </Edit></>;
  return edit
}
