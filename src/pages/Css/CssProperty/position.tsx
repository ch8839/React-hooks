import React from 'react'

export const Position = (props: any) => {
 
  return (
    <div style={{position: 'relative', width: '150px', height: '100%', backgroundColor: 'gray'}}>
      {/* 不能设置overflow: hidden，这样会把absolute元素隐藏 */}
      <div style={{position: 'relative', width: '100px', height: '100px', backgroundColor: 'red',}}>
        <div style={{position: 'absolute', width: '100px', height: '50px', backgroundColor: 'blue', top: '25px', left: '100%'}}>
          123
        </div>
      </div>
     
    </div>
  ) 
}
