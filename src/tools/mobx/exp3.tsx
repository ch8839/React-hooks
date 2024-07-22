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

const Page = observer(() => {
  console.log('===MobxExp3 render===')
  const $core = useContext(CoreContext) as OrderCreate

  console.log('$core: ', $core)
  const AdptorTotalAmount = useMemo(
    () => <TotalAmount productInfo={$core.productInfo}></TotalAmount>,
    [$core.productInfo]
  )

  const ObserverCountComponent = observer(() => {
    console.log('===ObserverCountComponent render===')
    // 当点击add时，this.productInfo.count发生改变，mobx通知它自己订阅了的（加了observer）this.productInfo.count的组件更新
    // ObserverCountComponent虽然加了observer，但是props中没有this.productInfo.count，不会发生更新
    // CountComponent虽然有this.productInfo.count，但是没有observe，所以没有被订阅，也不会更新

    return (
      <MCModule>
        <CountComponent
          // count={$core.productInfo.count}
          productInfo={$core.productInfo}
          onAdd={$core.handleAdd2}
          onReduce={$core.handleReduce2}
          onChange={$core.handleChange2}
        ></CountComponent>
      </MCModule>
    )
  })

  // 当productInfo.count变更导致desc变更，如果ObserverUnitPriceComponent不加observer，即使UnitPriceComponent加了observer也不会生效
  // 因为是ObserverUnitPriceComponent订阅了desc改变，所以如果它没有加，就不会触发它重新渲染
  const ObserverDescComponent = observer(() => {
    console.log('===ObserverDescComponent render===')
    return (
      <MCModule>
        <UnitPriceComponent value={$core.productInfo.desc}></UnitPriceComponent>
      </MCModule>
    )
  })

  const ObserverBottomSubmit = observer(() => {
    console.log('===ObserverBottomSubmit render===')
    return (
      <MCModule>
        <BottomSubmit>
          <TotalAmount productInfo={$core.productInfo}></TotalAmount>
        </BottomSubmit>
      </MCModule>
    )
  })

  const ObserverUnitPriceComponent = observer(() => {
    console.log('===ObserverUnitPriceComponent render===')
    return (
      <MCModule>
        <UnitPriceComponent value={$core.productInfo.unitPrice}></UnitPriceComponent>
      </MCModule>
    )
  })

  return (
    <div>
      <h2>MobxExp3</h2>
      <MCPage>
        <ObserverCountComponent />

        <ObserverUnitPriceComponent />
        
        <ObserverDescComponent />

        <ObserverBottomSubmit />
      </MCPage>
    </div>
  )
})

export default Bootstrap
