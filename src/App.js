import React, { useState, useEffect } from 'react';
import './App.scss';
import { marked } from 'marked';
import { sampleText } from './sampleText';

function App() {
  const [editorText, setEditorText] = useState(() => {
    const initialValue = JSON.parse(localStorage.getItem('editorTextStore'));
    return initialValue || sampleText;
  });

  useEffect(() => {
    localStorage.setItem('editorTextStore', JSON.stringify(editorText));
  }, [editorText]);

  const renderPreview = (editorText) => {
    const __html = marked(editorText, {
      sanitize: true,
      breaks: true,
      gfm: true,
      highlight: null
    });
    return { __html };
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-6">
          <textarea
            className="form-control"
            rows="35"
            type="textarea"
            placeholder="editor"
            value={editorText}
            onChange={(e) => setEditorText(e.target.value)}
            id="editor"></textarea>
        </div>
        <div className="col-sm-6">
          <div id="preview" dangerouslySetInnerHTML={renderPreview(editorText)} />
        </div>
      </div>
    </div>
  );
}

export default App;
