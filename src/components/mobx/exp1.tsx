import React, { useState, useContext, useEffect, useMemo } from 'react'
import { observer } from 'mobx-react'
import OrderCreate from './base/order-create'

const bussiness = new OrderCreate()
const $core = bussiness

const Stepper = (props: any) => {
  const { value, onAdd, onReduce } = props
  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(e.target.value)
  }

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
      {props.children}
    </div>
  )
})

const BottomSubmit2 = observer((props: any) => {
  console.log('===BottomSubmit2 render===')
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '200px',
        left: 0,
        right: 0,
        border: '1px solid red',
      }}
    >
      <h2>底部提交2</h2>
      {props.children}
    </div>
  )
})

const TotalAmount = observer((props: any) => {
  console.log('===TotalAmount render===')
  const { productInfo = {}, totalAmount } = props
  return (
    <div>
      <div>{productInfo.unitPrice}</div>
      <div>总价：{totalAmount}</div>
    </div>
  )
})

const MobxExp = observer(() => {
  console.log('===MobxExp1 render===')
  const AdptorTotalAmount = useMemo(
    () => <TotalAmount productInfo={$core.productInfo}></TotalAmount>,
    [$core.productInfo]
  )
  return (
    <div>
      <h2>MobxExp1</h2>
      <CountComponent
        count={$core.count}
        onAdd={$core.handleAdd}
        onReduce={$core.handleReduce}
        onChange={$core.handleChange}
      ></CountComponent>

      <UnitPriceComponent
        value={$core.productInfo.unitPrice}
      ></UnitPriceComponent>

      <BottomSubmit>
        {/* 因为每次MobxExp都会重新渲染，所以TotalAmount每回都是一个新的组件对象，
          从而对于BottomSubmit来说，其props.children都是一个新的实例，所以每回也会触发BottomSubmit自己本身重新渲染
          无论TotalAmount是否会重新渲染，也无论BottomSubmit是否加了observer */}
        <TotalAmount productInfo={$core.productInfo}></TotalAmount>
      </BottomSubmit>

      {/* 优化后 */}
      <BottomSubmit2>{AdptorTotalAmount}</BottomSubmit2>
    </div>
  )
})

export default MobxExp
