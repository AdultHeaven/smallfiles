'use client';
import { useState } from 'react';

export default function DownloadInstructions({ fileType }) {
  const [showPopup, setShowPopup] = useState(false);

  const getMessage = () => {
    if (fileType === 'video') {
      return (
        <>
        <p></p>
          <p><strong>📱 Mobile:</strong> Long press the Content and tap “Download” or “Save Video”.</p>
          <p><strong>💻 Desktop:</strong> Right-click the Content and choose “Save as…”</p>
        </>
      );
    } else {
      return (
        <>
        <p><strong>📱 Mobile:</strong> Long press the Content and tap “Download” or “Save Video”.</p>
          <p><strong>💻 Desktop:</strong> Right-click the Content and choose “Save as…”</p>
        </>
      );
    }
  };

  return (
    <div>
      <button onClick={() => setShowPopup(true)} className="custom-btn">
        Download File
      </button>

      {showPopup && (
        <div className="popup-overlay" onClick={() => setShowPopup(false)}>
          <div className="popup-box" onClick={(e) => e.stopPropagation()}>
            <h3>How to Save This {fileType === 'video' ? 'Video' : 'Image'}</h3>
            <div className="popup-message">{getMessage()}</div>
            <button className="close-btn" onClick={() => setShowPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
