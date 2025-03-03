import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react'

export const Async = (props: any) => {
  const handleClick = async ()=> {
 
    const res = await excuteError()
    console.log("success", res)
    
  }
  const excuteError = async() =>{
    // this.throwError()
    execTask() // nest无法捕获，导致请求终止
    // await this.execTask() // 抛出的异常会被nest正确捕获并返回错误响应
    // throw new HttpException('server error', HttpStatus.INTERNAL_SERVER_ERROR);
    return true
  }

  const execTask = async () => {
    throw new Error('server error');
  }

  return (
    <div>
      <button onClick={handleClick}>click</button>
    </div>
  )
}
