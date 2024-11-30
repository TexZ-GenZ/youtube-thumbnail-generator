import React, { useState, useEffect, useCallback, useRef } from 'react';
import { fabric } from 'fabric';
import { Upload, Type, Square, Download, Layers, Image as ImageIcon, Trash2 } from 'lucide-react';
import { ColorPicker } from './ColorPicker';
import toast from 'react-hot-toast';
import io from 'socket.io-client';

interface ThumbnailEditorProps {
  selectedThumbnail: string | null;
}

export default function ThumbnailEditor({ selectedThumbnail }: ThumbnailEditorProps) {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [color, setColor] = useState("#ffffff");
  const [uploadProgress, setUploadProgress] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const socket = io('http://localhost:3001');
    
    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    socket.on('uploadProgress', (progress: number) => {
      setUploadProgress(progress);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (canvasRef.current && !canvas) {
      const fabricCanvas = new fabric.Canvas(canvasRef.current, {
        width: 1280,
        height: 720,
        backgroundColor: '#1a1a1a'
      });
      setCanvas(fabricCanvas);

      if (selectedThumbnail) {
        fabric.Image.fromURL(selectedThumbnail, (img) => {
          img.scaleToWidth(fabricCanvas.width!);
          fabricCanvas.add(img);
          fabricCanvas.renderAll();
        }, { crossOrigin: 'anonymous' });
      }

      return () => {
        fabricCanvas.dispose();
      };
    }
  }, [selectedThumbnail]);

  const addText = useCallback(() => {
    if (canvas) {
      const text = new fabric.IText('Edit Text', {
        left: 100,
        top: 100,
        fill: color,
        fontSize: 40,
        fontFamily: 'Arial'
      });
      canvas.add(text);
      canvas.setActiveObject(text);
      canvas.renderAll();
    }
  }, [canvas, color]);

  const addShape = useCallback(() => {
    if (canvas) {
      const rect = new fabric.Rect({
        left: 100,
        top: 100,
        fill: color,
        width: 100,
        height: 100,
        opacity: 0.7
      });
      canvas.add(rect);
      canvas.setActiveObject(rect);
      canvas.renderAll();
    }
  }, [canvas, color]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !canvas) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('http://localhost:3001/api/remove-background', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const { base64Image } = await response.json();
        fabric.Image.fromURL(`data:image/png;base64,${base64Image}`, (img) => {
          img.scaleToWidth(200);
          canvas.add(img);
          canvas.renderAll();
          toast.success('Background removed successfully!');
        }, { crossOrigin: 'anonymous' });
      }
    } catch (error) {
      toast.error('Failed to remove background');
    }
  };

  const removeSelectedObject = useCallback(() => {
    if (canvas) {
      const activeObject = canvas.getActiveObject();
      if (activeObject) {
        canvas.remove(activeObject);
        canvas.renderAll();
        toast.success('Object removed');
      }
    }
  }, [canvas]);

  const moveObjectToFront = useCallback(() => {
    if (canvas) {
      const activeObject = canvas.getActiveObject();
      if (activeObject) {
        activeObject.bringToFront();
        canvas.renderAll();
      }
    }
  }, [canvas]);

  const moveObjectToBack = useCallback(() => {
    if (canvas) {
      const activeObject = canvas.getActiveObject();
      if (activeObject) {
        activeObject.sendToBack();
        canvas.renderAll();
      }
    }
  }, [canvas]);

  const downloadThumbnail = useCallback(() => {
    if (canvas) {
      const dataURL = canvas.toDataURL({
        format: 'png',
        quality: 1
      });
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = 'thumbnail.png';
      link.click();
      toast.success('Thumbnail downloaded!');
    }
  }, [canvas]);

  return (
    <div className="flex flex-col h-full bg-gray-900 text-gray-100">
      <div className="flex gap-4 p-4">
        <div className="w-64 bg-gray-800 p-4 rounded-lg shadow-lg space-y-4">
          <button
            onClick={addText}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
          >
            <Type className="h-5 w-5" /> Add Text
          </button>

          <button
            onClick={addShape}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
          >
            <Square className="h-5 w-5" /> Add Shape
          </button>

          <div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
            >
              <ImageIcon className="h-5 w-5" /> Add Image
            </button>
          </div>

          <ColorPicker color={color} onChange={setColor} />

          <div className="space-y-2">
            <button
              onClick={moveObjectToFront}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
            >
              <Layers className="h-5 w-5" /> Bring to Front
            </button>
            <button
              onClick={moveObjectToBack}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
            >
              <Layers className="h-5 w-5" /> Send to Back
            </button>
          </div>

          <button
            onClick={removeSelectedObject}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
          >
            <Trash2 className="h-5 w-5" /> Remove Object
          </button>

          <button
            onClick={downloadThumbnail}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Download className="h-5 w-5" /> Download
          </button>
        </div>

        <div className="flex-1 bg-gray-800 p-4 rounded-lg shadow-lg">
          <canvas ref={canvasRef} className="w-full h-full" />
        </div>
      </div>
    </div>
  );
}