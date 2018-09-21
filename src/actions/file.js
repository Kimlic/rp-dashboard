import { store } from 'src/store'

export const FILE_ADD_TO_PICTURE_QUEUE = 'FILE_ADD_TO_PICTURE_QUEUE'
export function addToPictureQueue(item) {
  store.dispatch({ type: FILE_ADD_TO_PICTURE_QUEUE, data: item })
}

export const FILE_REMOVE_FROM_PICTURE_QUEUE = 'FILE_REMOVE_FROM_PICTURE_QUEUE'
export function removeFromPictureQueue(guid) {
  store.dispatch({ type: FILE_REMOVE_FROM_PICTURE_QUEUE, data: guid })
}

export const FILE_UPDATE_PICTURE = 'FILE_UPDATE_PICTURE';
export function updatePicture(guid, field, value) {
  store.dispatch({ type: FILE_UPDATE_PICTURE, data: { guid, field, value } })
}

export const CLEAR_QUEUE = 'FILE_CLEAR_QUEUE'
export function clearQueue() {
  store.dispatch({ type: CLEAR_QUEUE })
}

export function uploadPictureQueue(queue, callback) {
  queue
  .filter(item => item.status === 'pending')
  .forEach(item => {
    updatePicture(item.guid, 'status', 'uploading');

    uploadPictureAsync(item, onPictureUploadProgress)
      .done(res => {
        if (callback) callback(res);

        updatePicture(item.guid, 'status', 'success');
      })
      .fail(err => {
        updatePicture(item.guid, 'status', 'failed');

        if (err.responseJSON.error) {
          updatePicture(item.guid, 'error', err.responseJSON.error);
        }

        if (err.responseJSON.errors) {
          updatePicture(item.guid, 'errors', err.responseJSON.errors);
        }
      })
  })
}

function onPictureUploadProgress(guid, progress) {
  updatePicture(guid, 'progress', progress);
}

function uploadPictureAsync(file, progressCb) {
  let data = new FormData()

  for (let property in file) {
    data.append(property, file[property])
  }

  data.append('picture', file.file)

  return sendFile({
    method: 'POST',
    url: file.uploadUrl,
    data: data,
    xhr: () => {
      let xhr = $.ajaxSettings.xhr()

      xhr.upload.addEventListener('progress', e => {
        if (e.lengthComputable) {
          const progress = parseInt((e.loaded / e.total) * 100)
          progressCb(file.guid, progress)
        }
      }, false)

      return xhr
    }
  })
}