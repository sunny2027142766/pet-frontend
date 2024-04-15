import { getUserList } from '@/api/modules/user'
import { User, UserListResult } from '@/api/modules/user/interface'
import type { ActionType, ProColumns } from '@ant-design/pro-components'
import { ProTable } from '@ant-design/pro-components'
import { DeleteOutlined, EditOutlined, WatchOutlined } from '@mui/icons-material'
import { useRequest } from 'ahooks'
import { Button, Tooltip } from 'antd'
import { useRef } from 'react'

const columns: ProColumns<User>[] = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48
  },
  {
    title: '用户名',
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
    filters: false,
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
    render: () => [
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
const User = () => {
  const actionRef = useRef<ActionType>()

  const userListRes = useRequest(getUserList, {
    manual: true
  })

  return (
    <ProTable<User>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async params => {
        userListRes.run({
          pageNo: params.current,
          pageSize: params.pageSize
        })
        const { data, success, total } = userListRes.data as UserListResult
        return {
          data,
          success,
          total
        }
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
      pagination={{
        pageSize: 5,
        onChange: page => console.log(page)
      }}
      dateFormatter="string"
    />
  )
}

export default User
