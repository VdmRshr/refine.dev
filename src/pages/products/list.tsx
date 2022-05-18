import {IResourceComponentsProps, useList, useSubscription} from '@pankod/refine-core'

import {
  DateField, DeleteButton, EditButton, ShowButton, Space,
  Table,
  useTable,
} from '@pankod/refine-antd'
import React from "react";

interface IProduct {
  id: number
  name: string
  brand_id: number
  created_at: string
  ean: string
  mpn: string
  parent_id: number
  sku: string
  updated_at: string
  uuid: string
}

export const ProductList: React.FC<IResourceComponentsProps> = () => {
  const {tableProps} = useTable<IProduct>({
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
    liveParams:{onLiveEvent: (event: any) => {
        console.log('event0', event)
        return event
      }
    }

  });

  const {data} = useList({
    onLiveEvent: (event) => {
      console.log('event', event)
      return event
    },
    resource: 'products',
    metaData: {
      fields: [
        "id",
        'name'
      ],
      liveMode: "auto"
    }
  });
  console.log('useList', data)
  useSubscription({
    channel: "products",
    onLiveEvent: (event) => {
      console.log('event2', event)
      return event
    },
    params:{}
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
      <Table.Column<IProduct>
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
