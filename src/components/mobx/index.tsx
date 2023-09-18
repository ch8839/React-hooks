import React, { useState, useContext, useEffect } from 'react'
import { observer } from 'mobx-react'
import OrderCreate from './base/order-create'

const bussiness = new OrderCreate()
const $core = bussiness

const Stepper = (props: any) => {
  const { value, onAdd, onReduce } = props
  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(e.target.value)
  }
  console.log('===Stepper render===')
  return (
    <div>
      <button onClick={onAdd}>add</button>
      <input type='number' value={value} onInput={handleChangeValue}></input>
      <button onClick={onReduce}>reduce</button>
    </div>
  )
}
const CountComponent = (props: any) => {
  const { count, onAdd, onReduce, onChange } = props
  console.log('===CountComponent render===')
  return (
    <div>
      <div>数量：{count}</div>
      <Stepper
        value={count}
        onAdd={onAdd}
        onReduce={onReduce}
        onChange={onChange}
      ></Stepper>
    </div>
  )
}

// 加上observer相当于是React.memo, 当
const UnitPriceComponent = observer((props: any) => {
  console.log('===PriceComponent render===')
  return <div>单价：{props.value}</div>
})

const BottomSubmit = observer((props: any) => {
  console.log('===BottomSubmit render===')
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        border: '1px solid red',
      }}
    >
      <h2>底部提交</h2>
      <TotalAmount desc={$core.productInfo.desc} totalAmount={$core.totalAmount}></TotalAmount>
    </div>
  )
})


const TotalAmount = observer((props: any) => {
  console.log('===TotalAmount render===')
  const { desc, totalAmount } = props
  return (
    <div>
      <div>{desc}</div>
      <div>总价：{totalAmount}</div>
    </div>
  )
})

const BottomSubmit2 = observer((props: any) => {
  console.log('===BottomSubmit2 render===')
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        border: '1px solid red',
      }}
    >
      <h2>底部提交</h2>
      {/* 使用 mobx-react 时，建议尽可能晚地取消引用值。 这是因为 MobX 将重新渲染自动取消引用可观察值的组件 */}
      {/* 如果直接传入$core.productInfo.desc， 则会重新渲染BottomSubmit2 */}
      <TotalAmount2 productInfo={$core.productInfo}></TotalAmount2>

      {/* 如果TotalAmount不用observer包裹，由于BottomSubmit2不会重新渲染，也不会触发TotalAmount3重新渲染，数据更新没反应 */}
      {/* 除非BottomSubmit就不用observer包裹，但这样就会导致BottomSubmit本可以不用重新渲染但每回却重新渲染了 */}
      <TotalAmount3 productInfo={$core.productInfo}></TotalAmount3>
    </div>
  )
})

const TotalAmount2 = observer((props: any) => {
  console.log('===TotalAmount2 render===')
  const { productInfo = {}, totalAmount } = props
  return (
    <div>
      <div>{productInfo.desc}</div>
      <div>总价：{totalAmount}</div>
    </div>
  )
})

// 
const TotalAmount3 = (props: any) => {
  console.log('===TotalAmount3 render===')
  const { productInfo = {}, totalAmount } = props
  return (
    <div>
      <div>{productInfo.desc}</div>
      <div>总价：{totalAmount}</div>
    </div>
  )
}

const MobxExp = observer(() => {
  console.log('===App render===')

  return (
    <div>
      <h2>Mobx</h2>
      <CountComponent
        count={$core.count}
        onAdd={$core.handleAdd}
        onReduce={$core.handleReduce}
        onChange={$core.handleChange}
      ></CountComponent>

      <UnitPriceComponent
        value={$core.productInfo.unitPrice}
      ></UnitPriceComponent>

      {/* <BottomSubmit></BottomSubmit> */}

      <BottomSubmit2></BottomSubmit2>
    </div>
  )
})

export default MobxExp
