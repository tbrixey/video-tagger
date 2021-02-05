import {fs} from '../appRuntime'

type NoteState = {
  [seconds: string]: string;
};

export function saveNotes (notes: NoteState, filePath: string): string {
  try {
    fs.writeFileSync(`${filePath}.json`, JSON.stringify(notes))
    return 'File saved'
  } catch (e) {
    return 'Error saving file'
  }
}

export function readNotes (filePath: string): NoteState {
  try {
    const notesData = fs.readFileSync(`${filePath}.json`)
    return JSON.parse(notesData.toString())
  } catch (e) {
    return {}
  }
}
