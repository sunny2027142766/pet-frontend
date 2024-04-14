// import { Delete, Edit } from '@mui/icons-material'
// import { Box, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
// import Form from './views/query-form'

// const User = () => {
//   const handleEdit = (userId: any) => {
//     // 处理编辑用户的逻辑
//     console.log(userId)
//   }

//   const handleDelete = (userId: any) => {
//     // 处理删除用户的逻辑
//     console.log(userId)
//   }

//   // 假设下面是用户表格的模拟数据
//   const users = [
//     { id: 1, name: 'User 1', email: 'user1@example.com' },
//     { id: 2, name: 'User 2', email: 'user2@example.com' }
//     // 更多用户数据...
//   ]

//   return (
//     <Box component="div" m="20px">
//       <Form />
//       {/* 表格 */}
//       <Box component="div" display="flex" justifyContent="space-between" alignItems="center">
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>ID</TableCell>
//               <TableCell>用户名</TableCell>
//               <TableCell>邮箱</TableCell>
//               <TableCell>操作</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {users.map(user => (
//               <TableRow key={user.id}>
//                 <TableCell>{user.id}</TableCell>
//                 <TableCell>{user.name}</TableCell>
//                 <TableCell>{user.email}</TableCell>
//                 <TableCell>
//                   <IconButton onClick={() => handleEdit(user.id)} color="warning">
//                     <Edit />
//                   </IconButton>
//                   <IconButton onClick={() => handleDelete(user.id)} color="error">
//                     <Delete />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </Box>
//     </Box>
//   )
// }

// export default User

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
    disable: true,
    title: '标签',
    dataIndex: 'labels',
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

const User = () => {
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

export default User
