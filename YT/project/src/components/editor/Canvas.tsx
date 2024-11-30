import { useEffect, useRef } from 'react';
import { fabric } from 'fabric';

interface CanvasProps {
  onCanvasReady: (canvas: fabric.Canvas) => void;
}

export default function Canvas({ onCanvasReady }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);

  useEffect(() => {
    if (canvasRef.current && !fabricCanvasRef.current) {
      const canvas = new fabric.Canvas(canvasRef.current, {
        width: 1280,
        height: 720,
        backgroundColor: '#ffffff'
      });
      fabricCanvasRef.current = canvas;
      onCanvasReady(canvas);

      // Load demo image
      fabric.Image.fromURL('https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&h=720&q=80', 
        function(img) {
          img.scaleToWidth(canvas.width!);
          canvas.add(img);
          canvas.renderAll();
        },
        { crossOrigin: 'anonymous' }
      );

      return () => {
        canvas.dispose();
        fabricCanvasRef.current = null;
      };
    }
  }, [onCanvasReady]);

  return <canvas ref={canvasRef} />;
}