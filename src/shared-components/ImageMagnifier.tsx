/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from "react";

type ImageMagnifierProps = {
  src?: string; 
  magnifierHeight?: number;
  magnifierWidth?: number;
  zoomLevel?: number;
};
const ImageMagnifier: React.FC<ImageMagnifierProps> = ({
  src, 
  magnifierHeight = 150,
  magnifierWidth = 150,
  zoomLevel = 3,
}) => {
  const [isMagnifying, setIsMagnifying] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [magnifierStyle, setMagnifierStyle] = useState({ top: 0, left: 0, backgroundPosition: '0% 0%' });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!imgRef.current) return;

    const { top, left, width, height } = imgRef.current.getBoundingClientRect();
    const x = e.pageX - left - window.pageXOffset;
    const y = e.pageY - top - window.pageYOffset;

    // Calculate background position for zoom effect
    const backgroundPosX = (x / width) * 100;
    const backgroundPosY = (y / height) * 100;

    setMagnifierStyle({
      top: y - magnifierHeight / 2,
      left: x - magnifierWidth / 2,
      backgroundPosition: `${backgroundPosX}% ${backgroundPosY}%`,
    });
  };

  const handleMouseEnter = () => setIsMagnifying(true);
  const handleMouseLeave = () => setIsMagnifying(false);

  return (
    <div
      className="image-magnifier-container"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ position: 'relative', cursor: 'none' }}
    >
      {/* Display the default or provided image */}
      <img ref={imgRef} src={src} alt="Product" className="image-magnifier-image " />
      {isMagnifying && (
        <div
          className="magnifier"
          style={{
            ...magnifierStyle,
            backgroundImage: `url(${src})`,
            backgroundSize: `${zoomLevel * 300}%`,
            width: `${magnifierWidth}px`,
            height: `${magnifierHeight}px`,
            position: 'absolute',
            borderRadius: '30%',
            border: '2px solid #000',
          }}
        ></div>
      )}
    </div>
  );
};

export default ImageMagnifier;