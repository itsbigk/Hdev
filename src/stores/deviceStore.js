import Store from './store'
import AppDispatcher from '../dispatchers/AppDispatcher'
import AppTypes from '../constants/AppConstants'
import DeviceTypes from '../constants/DeviceConstants'


let deviceList = {}

class deviceStore extends Store {

  constructor() {
    super()
  }

  getDeviceList() {
    return deviceList
  }
}

let DeviceStore = new deviceStore()

DeviceStore.dispatchToken = AppDispatcher.register(aciton => {
  switch (action.type) {

    case AppTypes.APP_INIT:
      deviceList = action.devices
      break

    case DeviceTypes.DEVICE_UPDATE:
      deviceList = action.devices
      break

    default:
      return
  }
  DeviceStore.emitChange()
})

export default DeviceStore
