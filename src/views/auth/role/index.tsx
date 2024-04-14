import type { ActionType, ProColumns } from '@ant-design/pro-components'
import { ProTable, TableDropdown } from '@ant-design/pro-components'
import { DeleteOutlined, EditOutlined, SearchOutlined, WatchOutlined } from '@mui/icons-material'
import { Button, Space, Tag, Tooltip } from 'antd'
import { useRef } from 'react'
import request from 'umi-request'
export const waitTimePromise = async (time: number = 100) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true)
    }, time)
  })
}

export const waitTime = async (time: number = 100) => {
  await waitTimePromise(time)
}

type GithubIssueItem = {
  url: string
  id: number
  number: number
  title: string
  labels: {
    name: string
    color: string
  }[]
  state: string
  comments: number
  created_at: string
  updated_at: string
  closed_at?: string
}

const columns: ProColumns<GithubIssueItem>[] = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48
  },
  {
    title: '标题',
    dataIndex: 'title',
    copyable: true,
    ellipsis: true,
    tooltip: '标题过长会自动收缩',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项'
        }
      ]
    }
  },
  {
    disable: true,
    title: '状态',
    dataIndex: 'state',
    filters: true,
    onFilter: true,
    ellipsis: true,
    valueType: 'select',
    valueEnum: {
      all: { text: '超长'.repeat(50) },
      open: {
        text: '未解决',
        status: 'Error'
      },
      closed: {
        text: '已解决',
        status: 'Success',
        disabled: true
      },
      processing: {
        text: '解决中',
        status: 'Processing'
      }
    }
  },
  {
    disable: true,
    title: '标签',
    dataIndex: 'labels',
    search: false,
    renderFormItem: (_, { defaultRender }) => {
      return defaultRender(_)
    },
    render: (_, record) => (
      <Space>
        {record.labels.map(({ name, color }) => (
          <Tag color={color} key={name}>
            {name}
          </Tag>
        ))}
      </Space>
    )
  },
  {
    title: '创建时间',
    key: 'showTime',
    dataIndex: 'created_at',
    valueType: 'date',
    sorter: true,
    hideInSearch: true
  },
  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      <Tooltip title="编辑">
        <Button
          type="link"
          shape="circle"
          icon={<EditOutlined />}
          onClick={() => {
            console.log('点击编辑,弹出弹框')
          }}
        />
      </Tooltip>,
      <Tooltip title="查看">
        <Button
          type="link"
          shape="circle"
          icon={<WatchOutlined />}
          onClick={() => {
            console.log('点击查看,弹出弹框')
          }}
        />
      </Tooltip>,
      <Tooltip title="删除">
        <Button
          type="text"
          shape="circle"
          icon={<DeleteOutlined />}
          onClick={() => {
            console.log('点击删除')
          }}
        />
      </Tooltip>
    ]
  }
]

const Role = () => {
  const actionRef = useRef<ActionType>()
  return (
    <ProTable<GithubIssueItem>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params, sort, filter) => {
        console.log(sort, filter)
        await waitTime(2000)
        return request<{
          data: GithubIssueItem[]
        }>('https://proapi.azurewebsites.net/github/issues', {
          params
        })
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto'
      }}
      options={{
        setting: {
          listsHeight: 400
        }
      }}
      form={{
        // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
          if (type === 'get') {
            return {
              ...values,
              created_at: [values.startTime, values.endTime]
            }
          }
          return values
        }
      }}
      pagination={{
        pageSize: 5,
        onChange: page => console.log(page)
      }}
      dateFormatter="string"
    />
  )
}

export default Role
