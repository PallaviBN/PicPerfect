import React, { useEffect, useRef, useState } from 'react';

interface TestProps {
  selectedImage: string; // Assuming selectedImage is a URL
}

const Test: React.FC<TestProps> = ({ selectedImage }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    if (canvasRef?.current && imageRef.current) {
      const canvas = canvasRef.current;
      canvas.width = imageRef.current.width;
      canvas.height = imageRef.current.height;
      const ctx = canvas.getContext('2d');
      setContext(ctx);
    }
  }, []);

  const startDrawing = (e: React.MouseEvent) => {
    setIsDrawing(true);
    if (context) {
      context.beginPath();
      context.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    }
  };

  const draw = (e: React.MouseEvent) => {
    if (!isDrawing || !context) return;
    context.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    context.stroke();
  };

  const endDrawing = () => {
    setIsDrawing(false);
  };

  return (
    <div>
      <img
        ref={imageRef}
        src={selectedImage}
        alt="Image"
        // style={{ display: 'none' }}
      />
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={endDrawing}
      />
    </div>
  );
};

export default Test;
