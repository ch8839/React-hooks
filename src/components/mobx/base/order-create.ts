import { makeObservable, observable, action, computed, configure } from 'mobx'

configure({
  enforceActions: 'never',
  
})

export default class OrderCreate {
  userInfo = {
    name: '',
    mobile: '',
  }

  productInfo = {
    productName: '',
    price: 0,
    unitPrice: 10,
    desc: '',
    count: 99
  }

  count = 1

  constructor() {
    makeObservable(this, {
      count: observable,
      productInfo: observable,
      handleAdd: action.bound,
      handleReduce:action.bound,
      handleChange: action.bound,
      handleAdd2: action.bound,
      handleReduce2:action.bound,
      handleChange2: action.bound,
      totalAmount: computed
    })
  }

  get totalAmount() {
    return this.count * this.productInfo.unitPrice
  }

  get totalAmount2() {
    return this.productInfo.count * this.productInfo.unitPrice
  }

  handleAdd() {
    this.count++
    this.productInfo.desc = 'count is:' + this.count
  }

  handleReduce() {
    this.count--
    this.productInfo.desc = 'count is:' + this.count
  }

  handleChange(value: number) {
    this.count = value
    this.productInfo.desc = 'count is:' + this.count
  }

  handleAdd2() {
    this.productInfo.count++
    this.productInfo.desc = 'count is:' + this.productInfo.count
  }

  handleReduce2() {
    this.productInfo.count--
    this.productInfo.desc = 'count is:' + this.productInfo.count
  }

  handleChange2(value: number) {
    this.productInfo.count = value
    this.productInfo.desc = 'count is:' + this.productInfo.count
  }
}
