import React, { useState } from 'react'
import { IResourceComponentsProps } from '@pankod/refine-core'

import {
    Edit,
    Form,
    Input,
    Select,
    useForm,
    useSelect,
} from '@pankod/refine-antd'


import { IPost, ICategory } from 'interfaces'

export const PostEdit: React.FC<IResourceComponentsProps> = () => {
    const { formProps, saveButtonProps, queryResult } = useForm<IPost>()

    const postData = queryResult?.data?.data
    const { selectProps: categorySelectProps } = useSelect<ICategory>({
        resource: 'categories',
        defaultValue: postData?.category.id,
    })

    const [selectedTab, setSelectedTab] = useState<'write' | 'preview'>('write')

    return (// @ts-ignore
        <Edit saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Category"
                    name={['category', 'id']}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select {...categorySelectProps} />
                </Form.Item>
                <Form.Item
                    label="Status"
                    name="status"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select
                        options={[
                            {
                                label: 'Published',
                                value: 'published',
                            },
                            {
                                label: 'Draft',
                                value: 'draft',
                            },
                            {
                                label: 'Rejected',
                                value: 'rejected',
                            },
                        ]}
                    />
                </Form.Item>

            </Form>
        </Edit>
    )
}
