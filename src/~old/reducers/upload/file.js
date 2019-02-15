import * as fileAction from 'src/actions/file'

const defaultState = {
  pictureQueue: []
}

function removeItem(queue, guid) {
  const index = queue.map(item => item.guid).indexOf(guid)
  const ret = [...queue]
  if (index > -1) ret.splice(index, 1)
  
  return ret
}

function updateItem(queue, guid, field, value) {
  const index = queue.map(item => item.guid).indexOf(guid)
  const ret = [...queue]
  if (index > -1) ret[index][field] = value

  return ret
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case fileAction.FILE_ADD_TO_PICTURE_QUEUE:
      return {
        ...state,
        pictureQueue: [...state.pictureQueue, action.data]
      }
    case fileAction.FILE_REMOVE_FROM_PICTURE_QUEUE:
      return {
        ...state,
        pictureQueue: removeItem(state.pictureQueue, action.data),
      }
    case fileAction.FILE_UPDATE_PICTURE:
      return {
        ...state,
        pictureQueue: updateItem(state.pictureQueue, action.data.guid, action.data.field, action.data.value),
      }
    case fileAction.CLEAR_QUEUE: return { ...defaultState }
    default: return state
  }
}
