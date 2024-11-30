import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';
import toast from 'react-hot-toast';
import ThumbnailEditor from '../components/editor/ThumbnailEditor';

export default function Editor() {
  const [video, setVideo] = useState<File | null>(null);
  const [thumbnails, setThumbnails] = useState<string[]>([]);
  const [selectedThumbnail, setSelectedThumbnail] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'video/*': ['.mp4', '.mov', '.avi']
    },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        setVideo(acceptedFiles[0]);
        processVideo(acceptedFiles[0]);
      }
    }
  });

  const processVideo = async (videoFile: File) => {
    setIsProcessing(true);
    const formData = new FormData();
    formData.append('video', videoFile);

    try {
      const response = await fetch('http://localhost:3001/api/thumbnail', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const reader = response.body?.getReader();
        if (!reader) return;

        const processChunk = async () => {
          const { done, value } = await reader.read();
          if (done) {
            setIsProcessing(false);
            return;
          }

          const chunk = new TextDecoder().decode(value);
          const lines = chunk.split('\n').filter(Boolean);

          lines.forEach(line => {
            try {
              const data = JSON.parse(line);
              if (data.thumbnail) {
                setThumbnails(prev => [...prev, data.thumbnail]);
              }
            } catch (e) {
              console.error('Error parsing chunk:', e);
            }
          });

          await processChunk();
        };

        await processChunk();
      } else {
        toast.error('Failed to process video');
        setIsProcessing(false);
      }
    } catch (error) {
      toast.error('Error processing video');
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      {!video ? (
        <div
          {...getRootProps()}
          className="border-2 border-dashed border-gray-700 rounded-lg p-12 text-center cursor-pointer hover:border-gray-500 transition-colors"
        >
          <input {...getInputProps()} />
          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-xl font-medium text-gray-300">Drop your video here or click to select</p>
          <p className="text-sm text-gray-500 mt-2">Supported formats: MP4, MOV, AVI</p>
        </div>
      ) : (
        <div className="space-y-8">
          {isProcessing ? (
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto"></div>
              <p className="mt-4 text-gray-300">Processing video and generating thumbnails...</p>
            </div>
          ) : (
            <>
              {thumbnails.length > 0 && !selectedThumbnail && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {thumbnails.map((thumbnail, index) => (
                    <div
                      key={index}
                      onClick={() => setSelectedThumbnail(thumbnail)}
                      className="cursor-pointer transform hover:scale-105 transition-transform"
                    >
                      <img
                        src={thumbnail}
                        alt={`Thumbnail ${index + 1}`}
                        className="rounded-lg shadow-lg w-full"
                      />
                    </div>
                  ))}
                </div>
              )}

              {selectedThumbnail && (
                <ThumbnailEditor selectedThumbnail={selectedThumbnail} />
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}