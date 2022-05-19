import {IResourceComponentsProps, useDelete, useNavigation} from '@pankod/refine-core'

import {
  List,
  Space,
  CreateButton,
  Button,
  DateField, Table, useTable, EditButton, ShowButton, DeleteButton,
} from '@pankod/refine-antd'

import React from 'react'
import {myDataProvider} from "../../App";

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


export const UserList: React.FC<IResourceComponentsProps> = () => {
  const {tableProps} = useTable<IUser>({
    initialSorter: [
      {
        field: "id",
        order: "asc",
      },
    ],
    metaData: {
      fields: [
        "id",
        'name'
      ],
    },
    liveMode:"auto",

  });


  return (
    <Table {...tableProps} rowKey="id">
      <Table.Column dataIndex="id" title="ID"/>
      <Table.Column dataIndex="name" title="Name"/>

      <Table.Column
        dataIndex="createdAt"
        title="createdAt"
        render={(value) => <DateField format="LLL" value={value}/>}
      />
      <Table.Column<IUser>
        title="Actions"
        dataIndex="actions"
        render={(_, record) => (
          <Space>
            <EditButton
              hideText
              size="small"
              recordItemId={record.id}
            />
            <ShowButton
              hideText
              size="small"
              recordItemId={record.id}
            />
            <DeleteButton
              hideText
              size="small"
              recordItemId={record.id}

            />
          </Space>
        )}
      />
    </Table>

  );
}
