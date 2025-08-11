import React, { useState } from 'react';

function PhotoUploader({ label, onUpload }) {
  const [file, setFile] = useState(null);

  const handleChange = (event) => setFile(event.target.files[0]);
  const handleUpload = () => {
    if (!file) return alert("Please select a file.");
    onUpload(file);
  };

  return (
    <div>
      <label>{label}</label><br />
      <input type="file" accept="image/*" onChange={handleChange} />
      <button onClick={handleUpload}>Upload</button>
      {file && <p>{file.name}</p>}
    </div>
  );
}
export default PhotoUploader;
import React from 'react';

function TryOnViewer({ tryOnResult }) {
  return (
    <div>
      <h3>Virtual Try-On Result</h3>
      {tryOnResult 
      ? <img src={tryOnResult} alt="Result" style={{ maxWidth: '100%' }} /> 
      : <p>Your try-on result will appear here.</p>}
    </div>
  );
}
export default TryOnViewer;
import React, { useState } from 'react';

function ChatBox() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { from: 'user', text: input }]);
    const res = await fetch('http://localhost:8000/recommend/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: input }),
    });
    const data = await res.json();
    setMessages((prev) => [...prev, { from: 'bot', text: data.advice }]);
    setInput('');
  };

  return (
    <div>
      <h3>Fashion Advice Chat</h3>
      <div style={{ minHeight: '100px', border: '1px solid #ccc', padding: '8px' }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ textAlign: msg.from === 'user' ? 'right' : 'left' }}>
            <span style={{
              background: msg.from === 'user' ? '#007bff' : '#e0e0e0',
              color: msg.from === 'user' ? '#fff' : '#000',
              padding: '6px 12px',
              borderRadius: '15px',
              display: 'inline-block',
              margin: '2px 0'
            }}>
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Ask for a style tip!"
        style={{ width: '70%', padding: '8px', marginRight: '5px' }}
        onKeyDown={e => e.key === 'Enter' && sendMessage()}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
export default ChatBox;
