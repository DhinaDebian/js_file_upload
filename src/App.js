import React, { useState } from "react"
import './App.css';
import Attachments from "./Attachments"

function App() {
  const [selectedFileName, setSelectedFileName] = useState('')
  const [selectedDoc, setSelectedDoc] = useState('')
  const onDocumentSelect = (file) => {
    setSelectedDoc(file.FileContent)
    setSelectedFileName(file.FileName)
  }
  const App = {
    margin: '1rem'
  }
  return (
    <div style={App}>
      <Attachments
        onSelect={(file) => onDocumentSelect(file)}
        fileSize={3}
        fileType={['pdf']}
      />
      <label for="fileContent">{selectedFileName}</label>
      <textarea rows="40" cols="50" id="fileContent" value={selectedDoc}>
        {selectedDoc}
      </textarea>
    </div>
  );
}

export default App;