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
