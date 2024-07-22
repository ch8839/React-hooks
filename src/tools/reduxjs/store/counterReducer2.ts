import { createSlice } from '@reduxjs/toolkit'
import { type } from 'os'

const counterSlice = createSlice({
  name: 'counter2',
  initialState: {
    value: 0
  },
  reducers: {
    incremented: state => {
      console.log('>>>incremented action2', state)
      // Redux Toolkit 允许在 reducers 中编写 "mutating" 逻辑。
      // 它实际上并没有改变 state，因为使用的是 Immer 库，检测到“草稿 state”的变化并产生一个全新的
      // 基于这些更改的不可变的 state。
      state.value += 1
    },
    decremented: state => {
      state.value -= 1
    },
    updateValue(state, action) {
      const payload = action.payload
      console.log('>>>payload', payload)
      state.value = payload
    }
  }
})

export const { incremented, decremented, updateValue } = counterSlice.actions
export default counterSlice.reducer