let id = 10;
export const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'add':
      return [...state, { id: id++, text: action.text }]
    case 'delete':
      return state.filter((todo: any) => todo.id !== action.id)
    default:
      return state
  }
}