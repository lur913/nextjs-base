'use server'

import {  User } from "@/schema/index";

export async function addUser(data: User) {
  // 等待 3 秒
  console.log(`======addUser - startTransition======`);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  // 其实这里需要先添加前端的校验，再添加后端的校验，才应该是最佳的实践
  if(data.username === 'admin') {
    return {
      success: true,
      message: '添加成功'
    }
  }else {
    return {
      success: false,
      message: '用户名已存在'
    }
  }
}