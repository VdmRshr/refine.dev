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
  const metaData = {
    fields: [
      "id",
      "email",
      "name"
    ],
  };
  const {formProps, saveButtonProps, queryResult} = useForm<IUser>({metaData});


  // @ts-ignore
  const edit = <><Edit saveButtonProps={saveButtonProps}>
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
