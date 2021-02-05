import { IpcRenderer, Remote } from 'electron' // this is just an interface
declare var __non_webpack_require__: (id: string) => any
const electron = __non_webpack_require__('electron')
const _glob = __non_webpack_require__('glob')
const _fs = __non_webpack_require__('fs')

export const ipcRenderer: IpcRenderer = electron.ipcRenderer
export const remote: Remote = electron.remote
export const glob: any = _glob
export const fs: any = _fs