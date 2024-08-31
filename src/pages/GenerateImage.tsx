import React, { useRef } from 'react';
import dog from '@/img/dog.jpg';
import { ObjectDetector, FilesetResolver } from '@mediapipe/tasks-vision';

export default function GenerateImage() {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const getImgInfo = async (event: React.MouseEvent<HTMLImageElement>): Promise<void> => {
    const vision = await FilesetResolver.forVisionTasks(
      'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm'
    );
    const imageSegmenter = await ObjectDetector.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: `https://storage.googleapis.com/mediapipe-models/object_detector/efficientdet_lite0/float16/1/efficientdet_lite0.tflite`,
        delegate: "GPU"
      },
      scoreThreshold: 0.5,
      runningMode: "IMAGE"
    });

    const image = imgRef.current;
    const canvas = canvasRef.current;
  }

  return (
    <>
      <div>
        <img
          src={dog}
          alt="dog"
          ref={imgRef}
          className="w-52 h-auto cursor-pointer"
          onClick={getImgInfo}
        />
        <canvas ref={canvasRef}></canvas>
      </div>
    </>
  );
}
