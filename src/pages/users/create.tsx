import React, { useState } from 'react'
import { IResourceComponentsProps } from '@pankod/refine-core'

import { Create, Form, Input, Select, useForm } from '@pankod/refine-antd'

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

export const UserCreate: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps } = useForm<IUser>();

  return (
    // @ts-ignore
      <Create saveButtonProps={saveButtonProps}>
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
                    <Input />
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
                    <Input />
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
                    <Input />
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
        </Create>
    )
}
