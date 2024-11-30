import React from 'react';
import { Type, Image, Square } from 'lucide-react';
import { ColorPicker } from './ColorPicker';

interface ToolbarProps {
  onAddText: () => void;
  onAddShape: () => void;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  color: string;
  onColorChange: (color: string) => void;
  onDownload: () => void;
}

export default function Toolbar({
  onAddText,
  onAddShape,
  onImageUpload,
  color,
  onColorChange,
  onDownload
}: ToolbarProps) {
  return (
    <div className="w-64 bg-white p-4 rounded-lg shadow-sm border">
      <div className="space-y-4">
        <button
          onClick={onAddText}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
        >
          <Type className="h-5 w-5" /> Add Text
        </button>
        
        <button
          onClick={onAddShape}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
        >
          <Square className="h-5 w-5" /> Add Shape
        </button>
        
        <label className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 cursor-pointer">
          <Image className="h-5 w-5" /> Add Image
          <input type="file" className="hidden" onChange={onImageUpload} accept="image/*" />
        </label>

        <ColorPicker color={color} onChange={onColorChange} />

        <button
          onClick={onDownload}
          className="w-full px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Download Thumbnail
        </button>
      </div>
    </div>
  );
}