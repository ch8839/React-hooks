import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useMemo,
} from 'react'
import { observer, Observer } from 'mobx-react'
import OrderCreate from './base/order-create'

const CoreContext = createContext({})
const bussiness = new OrderCreate()
const $core = bussiness

const Bootstrap = observer((props: any) => {
  return (
    <CoreContext.Provider value={$core}>
      <Page {...props} />
    </CoreContext.Provider>
  )
})

const Stepper = observer((props: any) => {
  console.log('===Stepper render===')
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
})

const CountComponent = observer((props: any) => {
  console.log('===CountComponent render===')
  const { productInfo, onAdd, onReduce, onChange } = props

  return (
    <div>
      <div>数量：{productInfo.count}</div>
      <Stepper
        value={productInfo.count}
        onAdd={onAdd}
        onReduce={onReduce}
        onChange={onChange}
      ></Stepper>
    </div>
  )
})

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
      <div>{productInfo.desc}</div>
      <div>总价：{totalAmount}</div>
    </div>
  )
})

const MCPage = (props: any) => {
  console.log('===MCPage render===')
  return (
    <div>
      <h2>MCPage</h2>
      {props.children}
    </div>
  )
}

const MCModule = (props: any) => {
  console.log('===MCModule render===')
  return (
    <div>
      <h2>MCModule</h2>
      {props.children}
    </div>
  )
}

const Page = observer(() => {
  console.log('===MobxExp2 render===')
  const $core = useContext(CoreContext) as OrderCreate

  console.log('$core: ', $core)
  const AdptorTotalAmount = useMemo(
    () => <TotalAmount productInfo={$core.productInfo}></TotalAmount>,
    [$core.productInfo]
  )

  return (
    <div>
      <h2>MobxExp2</h2>
      <MCPage>
        <MCModule>
          <CountComponent
            productInfo={$core.productInfo}
            onAdd={$core.handleAdd2}
            onReduce={$core.handleReduce2}
            onChange={$core.handleChange2}
          ></CountComponent>
        </MCModule>
      </MCPage>

      <MCModule>
        {/* 如果是读取$core.productInfo.desc，整个App组件都会重新渲染 */}
        <UnitPriceComponent
          value={$core.productInfo.desc}
        ></UnitPriceComponent>
      </MCModule>

      <MCModule>
        <BottomSubmit>
          <TotalAmount productInfo={$core.productInfo}></TotalAmount>
        </BottomSubmit>
      </MCModule>
    </div>
  )
})

export default Bootstrap
