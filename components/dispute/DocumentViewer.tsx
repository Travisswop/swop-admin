'use client';

import { Document as DisputeDocument } from '@/types/dispute';
import { useState } from 'react';
import {
  IoClose,
  IoDownload,
  IoImageOutline,
  IoDocumentTextOutline,
  IoAdd,
  IoRemove,
} from 'react-icons/io5';

interface DocumentViewerProps {
  document: DisputeDocument;
  onClose: () => void;
}

const DocumentViewer = ({
  document,
  onClose,
}: DocumentViewerProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageZoom, setImageZoom] = useState(1);

  const url = document.cloudinaryUrl || document.downloadUrl;

  const isImage = ['jpeg', 'jpg', 'png', 'gif', 'webp'].includes(
    document.fileType?.toLowerCase() || ''
  );
  const isPDF = document.fileType?.toLowerCase() === 'pdf';

  const handleDownload = () => {
    if (url) {
      // For Cloudinary URLs, we need to handle them differently
      if (url.includes('cloudinary.com')) {
        // For Cloudinary, we'll open in a new tab and let the browser handle it
        window.open(url, '_blank');
        return;
      }

      // Create a temporary link element
      const link = window.document.createElement('a');
      link.href = url;
      link.download =
        document.fileName || `document.${document.fileType || 'pdf'}`;

      // Add the link to the document
      window.document.body.appendChild(link);

      // Trigger the download
      link.click();

      // Clean up
      window.document.body.removeChild(link);
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setError('Failed to load document');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2">
      <div className="bg-white rounded-lg shadow-xl w-full h-full max-w-6xl max-h-[95vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-2">
            {isImage ? (
              <IoImageOutline className="text-blue-500" />
            ) : (
              <IoDocumentTextOutline className="text-blue-500" />
            )}
            <span className="font-medium text-gray-800">
              {document.fileName}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            {isImage && (
              <>
                <button
                  onClick={() =>
                    setImageZoom(Math.max(0.5, imageZoom - 0.25))
                  }
                  className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded"
                  title="Zoom Out"
                >
                  <IoRemove className="w-5 h-5" />
                </button>
                <span className="text-sm text-gray-600 px-2">
                  {Math.round(imageZoom * 100)}%
                </span>
                <button
                  onClick={() =>
                    setImageZoom(Math.min(3, imageZoom + 0.25))
                  }
                  className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded"
                  title="Zoom In"
                >
                  <IoAdd className="w-5 h-5" />
                </button>
              </>
            )}
            <button
              onClick={handleDownload}
              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded"
              title="Download"
            >
              <IoDownload className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded"
              title="Close"
            >
              <IoClose className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden p-2">
          {isLoading && (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          )}

          {error && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <p className="text-red-600 mb-2">{error}</p>
                <button
                  onClick={handleDownload}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Download Instead
                </button>
              </div>
            </div>
          )}

          {!error && (
            <div className="h-full">
              {isImage ? (
                <div className="flex items-center justify-center h-full w-full overflow-auto">
                  <img
                    src={url}
                    alt={document.fileName}
                    className="object-contain"
                    onLoad={handleLoad}
                    onError={handleError}
                    style={{
                      display: isLoading ? 'none' : 'block',
                      transform: `scale(${imageZoom})`,
                      transition: 'transform 0.2s ease-in-out',
                    }}
                  />
                </div>
              ) : isPDF ? (
                <div className="h-full w-full">
                  <iframe
                    src={`${url}#toolbar=0&navpanes=0&scrollbar=0`}
                    className="w-full h-full border-0"
                    onLoad={handleLoad}
                    onError={handleError}
                    style={{ display: isLoading ? 'none' : 'block' }}
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <IoDocumentTextOutline className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">
                      Preview not available for this file type
                    </p>
                    <button
                      onClick={handleDownload}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Download File
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentViewer;
