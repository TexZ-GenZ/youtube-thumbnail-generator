import { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { Palette } from 'lucide-react';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

export function ColorPicker({ color, onChange }: ColorPickerProps) {
  const [showPicker, setShowPicker] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setShowPicker(!showPicker)}
        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
      >
        <Palette className="h-5 w-5" />
        <div className="w-4 h-4 rounded" style={{ backgroundColor: color }} />
      </button>
      
      {showPicker && (
        <div className="absolute z-50 mt-2">
          <div
            className="fixed inset-0"
            onClick={() => setShowPicker(false)}
          />
          <div className="relative">
            <HexColorPicker
              color={color}
              onChange={onChange}
              className="shadow-xl rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}