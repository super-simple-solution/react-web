import React, { useEffect, useRef, useState } from "react";
import dog from "@/img/dog.jpg";
import { InteractiveSegmenter, FilesetResolver, MPMask } from "@mediapipe/tasks-vision";

export default function GenerateImage() {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [interactiveSegmenter, setInteractiveSegmenter] = useState<InteractiveSegmenter | null>(null);

  // Segmenter creation only on mount
  useEffect(() => {
    let isMounted = true;

    const createSegmenter = async () => {
      const filesetResolver = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
      );
      const segmenter = await InteractiveSegmenter.createFromOptions(
        filesetResolver,
        {
          baseOptions: {
            modelAssetPath: `https://storage.googleapis.com/mediapipe-models/interactive_segmenter/magic_touch/float32/1/magic_touch.tflite`,
            delegate: "GPU",
          },
          outputCategoryMask: true,
          outputConfidenceMasks: false,
        }
      );

      if (isMounted) {
        setInteractiveSegmenter(segmenter);
      }
    };

    createSegmenter();

    return () => {
      isMounted = false;
      if (interactiveSegmenter) {
        interactiveSegmenter.close(); // Cleanup segmenter
      }
    };
  }, []);

  const getImgInfo = async (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    if (!interactiveSegmenter) {
      alert("InteractiveSegmenter still loading. Try again shortly.");
      return;
    }

    const target = event.target as HTMLImageElement;

    const keypoint = {
      x: event.nativeEvent.offsetX / target.width,
      y: event.nativeEvent.offsetY / target.height,
    };

    interactiveSegmenter.segment(
      target,
      { keypoint },
      (result) => {
        if (result.categoryMask && target.parentElement) {
          drawSegmentation(result.categoryMask, target.parentElement);
          drawClickPoint(target.parentElement, event.nativeEvent);
        }
      }
    );
  };

  const drawSegmentation = (mask: MPMask, targetElement: HTMLElement) => {
    const width = mask.width;
    const height = mask.height;
    const maskData = mask.getAsFloat32Array();

    const canvas = targetElement.querySelector(".canvas-segmentation") as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = width;
    canvas.height = height;

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "rgba(18, 181, 203, 0.7)";

    for (let index = 0; index < maskData.length; index++) {
      if (Math.round(maskData[index] * 255.0) === 0) {
        const x = index % width;
        const y = Math.floor(index / width);
        ctx.fillRect(x, y, 1, 1);
      }
    }
  };

  const drawClickPoint = (targetElement: HTMLElement, event: MouseEvent) => {
    const clickPoint = targetElement.querySelector(".click-point") as HTMLElement;
    if (clickPoint) {
      clickPoint.style.top = `${event.offsetY - 8}px`;
      clickPoint.style.left = `${event.offsetX - 8}px`;
      clickPoint.style.display = "block";
    }
  };

  return (
    <div>
      <img
        src={dog}
        alt="dog"
        ref={imgRef}
        className="w-52 h-auto cursor-pointer"
        onClick={getImgInfo}
      />
      <canvas ref={canvasRef} className="canvas-segmentation"></canvas>
    </div>
  );
}
