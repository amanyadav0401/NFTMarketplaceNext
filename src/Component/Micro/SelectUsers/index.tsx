'use client'

import React, { useEffect, useState } from "react";
import { Select, SelectItem, Avatar, Chip, Selection } from "@nextui-org/react";
import { APIClient } from "@/utils/APIClient";


export default function SelectUsers({ selectedUsers, setSelectedUsers }: any) {
  const [users, setUsers] = useState<{
    _id: string;
    username: string;
    name: string;
    avatar: string;
  }[]>([]);
  const [isSelectAll, setIsSelectAll] = useState<boolean>(false)



  useEffect(() => {
    const getUsers = async () => {
      const data = await APIClient.get('auth/minimal-users')
      const resData: any = await data.json()
      const { users } = resData
      const selectAll = {
        _id: 'all',
        username: 'All',
        name: 'All',
        avatar: 'https://ui-avatars.com/api/?name=ALL&background=0D8ABC&color=fff'
      }
      setUsers(
        [
          selectAll,
          ...users
        ]
      )
    }

    getUsers()
  }, []);

  const handleSelectionChange = (selectedKeys: Selection) => {
    const arr = [...selectedKeys]
    if (arr.includes('all')) {
      setIsSelectAll(true)
      setSelectedUsers(new Set(['all']))
      return
    }
    setSelectedUsers(selectedKeys)
  };

  return (
    <Select
      items={users}
      label="Offer For"
      variant="bordered"
      isMultiline={true}
      selectedKeys={selectedUsers}
      onSelectionChange={(e) => handleSelectionChange(e)}
      selectionMode="multiple"
      placeholder="Select a user"
      labelPlacement="outside"
      renderValue={(items) => {
        return (
          <div className="flex flex-wrap gap-2">
            {items.map((item) => (
              <Chip key={item.key}>{item.data?.name}</Chip>
            ))}
          </div>
        );
      }}
    >
      {(user) => (
        <SelectItem key={user._id} value={user._id} textValue={user.username}>
          <div className="flex gap-2 items-center">
            <Avatar alt={user.name} className="flex-shrink-0" size="sm" src={user.avatar} />
            <div className="flex flex-col">
              <span className="text-small">{user.username}</span>
              {/* <span className="text-tiny text-default-400">{user.email}</span> */}
            </div>
          </div>
        </SelectItem>
      )}
    </Select>
  );
}
