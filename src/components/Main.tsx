import React, { useEffect, useRef, useState } from "react";
import logo from "../media/appLogo.svg";
import placeholderImg from "../media/placeholder.png";
import FilterOption from "./FilterOption";
import { ASPECT_RATIOS, FILTER_OPTIONS } from "../utils/constants";
import FilterSlider from "./FilterSlider";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.min.css";
import { Filter } from "../utils/type";
import { evaluateAspectRatio } from "../utils/common";
import CropAspectRatio from "./CropAspectRatio";
import Test from "./Test";

const Main: React.FC = () => {
  const fileRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const cropperRef = useRef<any>(null);

  const [selectedImage, setSelectedImage] = useState<string>(placeholderImg);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [selectedFilterIndex, setSelectedFilterIndex] = useState<number>(0);

  const [filterOptions, setFilterOptions] =
    useState<Array<Filter>>(FILTER_OPTIONS);

  const [rotate, setRotate] = useState<number>(0);
  const [flipHorizontal, setFlipHorizontal] = useState<number>(1);
  const [flipVertical, setFlipVertical] = useState<number>(1);
  // const [cropper, setCropper] = useState<any>(null); // Store the Cropper instance
  const [cropEnabled, setCropEnabled] = useState<boolean>(false); // To toggle cropping
  const [aspectRatio, setAspectRatio] = useState<number>(NaN);

  const [zoomLevel, setZoomLevel] = useState<number>(1); // Zoom level
  const aspRatio = "16/9"; // Default aspect ratio

  // const apiKey: string = "keBaQ4mxJepaiKqbzcQZ5L18"; // Replace with your API key
  // const removeBackground = async () => {
  //   if (!selectedImage) return;

  //   // Use the Remove.bg API to remove the background
  //   // const apiKey: string = process.env.REMOVEBG_KEY; // Replace with your API key
  //   const apiUrl = `https://api.remove.bg/v1.0/removebg`;
  //   const formData = new FormData();
  //   formData.append("image", selectedImage);
  //   console.log(formData)
  //   try {
  //     const headers = new Headers();
  //     headers.append("X-Api-Key", apiKey);

  //     const response = await fetch(apiUrl, {
  //       method: "POST",
  //       headers: headers,
  //       body: formData,
  //     });

  //     if (response.ok) {
  //       const result = await response.blob();
  //       const processedImageUrl = URL.createObjectURL(result);
  //       // Set the processed image as the selected image
  //       setSelectedImage(processedImageUrl);
  //     } else {
  //       console.error("Background removal failed");
  //     }
  //   } catch (error) {
  //     console.error("Error removing background", error);
  //   }
  // };

  const isImgSelected = selectedImage !== placeholderImg;
  const selectedOption: Filter = filterOptions[selectedFilterIndex];

  useEffect(() => {
    console.log(aspectRatio, cropperRef.current);
    if (cropperRef.current && (aspectRatio || Number.isNaN(aspectRatio))) {
      cropperRef.current.setAspectRatio(aspectRatio);
      console.log(aspectRatio, cropperRef.current);
    }
  }, [aspectRatio]);

  const handleZoomIn = () => {
    setZoomLevel((prevZoomLevel) => prevZoomLevel + 0.5); // Increase zoom by 0.1 (adjust as needed)
  };

  const handleZoomOut = () => {
    setZoomLevel((prevZoomLevel) => prevZoomLevel - 0.5); // Decrease zoom by 0.1 (adjust as needed)
  };

  const selectFileHandler = (event: any) => {
    if (fileRef) {
      const file = fileRef.current?.files?.[0];
      if (!file) return;
      const fileUrl = URL.createObjectURL(file);
      setSelectedImage(fileUrl);
      setOriginalImage(fileUrl);
      console.log(fileUrl);
      resetHandler();
    }
  };
  const chooseImageHandler = (event: any) => {
    fileRef.current?.click();
  };

  const applyFilter = () => {
    // image.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
    return {
      filter: filterOptions
        .map((option) => {
          return `${option.property}(${option.value}${option.unit})`;
        })
        .join(" "),
      // image.style.transform = `rotate(${rotate}deg) scaleX(${flipHorizontal}) scaleY(${flipVertical})`;
      transform: `rotate(${rotate}deg) scaleX(${flipHorizontal * zoomLevel}) scaleY(${flipVertical * zoomLevel})`,
    };
  };

  const resetHandler = () => {
    setSelectedFilterIndex(0);
    setFilterOptions(FILTER_OPTIONS);
    setRotate(0);
    setFlipHorizontal(1);
    setFlipVertical(1);
    setZoomLevel(1);
    applyFilter();
    if (originalImage) setSelectedImage(originalImage);
  };

  const downloadImage = () => {
    if (!imageRef.current) return;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = imageRef?.current?.naturalWidth;
    canvas.height = imageRef?.current?.naturalHeight;
    ctx.filter = filterOptions
      .map((option) => {
        return `${option.property}(${option.value}${option.unit})`;
      })
      .join(" ");
    ctx.translate(canvas.width / 2, canvas.height / 2);
    if (rotate !== 0) {
      ctx.rotate((rotate * Math.PI) / 180);
    }
    ctx.scale(flipHorizontal, flipVertical);

    // Draw the image on the canvas
    ctx.drawImage(
      imageRef.current,
      -canvas.width / 2,
      -canvas.height / 2,
      canvas.width,
      canvas.height
    );

    const link = document.createElement("a");
    link.download = "image.jpg";
    link.href = canvas.toDataURL();
    link.click();
  };

  const initializeCropper = () => {
    if (imageRef.current) {
      const cropperInstance = new Cropper(imageRef.current, {
        aspectRatio: aspectRatio,
      });
      cropperRef.current = cropperInstance;
      // setCropper(cropperInstance);
    }
  };
  const enableCrop = () => {
    initializeCropper();
    // if (cropper) {
    //   cropper.enable(); // Enable cropping
    //   setCropEnabled(true);
    //   // console.log(cropper)
    // }
    if (cropperRef.current) {
      cropperRef.current.enable();
      setCropEnabled(true);
    }
  };

  const disableCrop = () => {
    // if (cropper) {
    //   console.log("inside if");
    //   cropper.destroy(); // Disable cropping
    //   setCropper(null);
    //   setCropEnabled(false);
    // }
    // console.log("disabled", cropper);

    if (cropperRef.current) {
      cropperRef.current.destroy();
      setCropEnabled(false);
    }
  };
  const cropHandler = () => {
    // if (cropper) {
    //   cropper.getCroppedCanvas().toBlob((blob) => {
    //     if (blob) {
    //       const croppedImageUrl = URL.createObjectURL(blob);
    //       cropper.originalUrl = croppedImageUrl;
    //       setSelectedImage(croppedImageUrl);
    //       setCropEnabled(false); // Disable cropping
    //       setCropper(null);
    //       cropper.destroy();
    //     } else {
    //       console.error("Cropping failed");
    //     }
    //   });
    // }
    if (cropperRef.current) {
      cropperRef.current.getCroppedCanvas().toBlob((blob) => {
        if (blob) {
          const croppedImageUrl = URL.createObjectURL(blob);
          setSelectedImage(croppedImageUrl);
          setCropEnabled(false); // Disable cropping
          cropperRef.current.destroy();
        } else {
          console.error("Cropping failed");
        }
      });
    }
  };

  const Button = ({ icon, onClick, isDisabled = false }) => (
    <button
      className={`py-4 ${isDisabled ? "pointer-events-none opacity-50" : ""}`}
      onClick={onClick}
    >
      <i className={`${icon} text-2xl`}></i>
      {/* {label} */}
    </button>
  );

  const renderSidePanel = () => {
    return (
      <div className="fixed text-amber-100 flex flex-col px-3 top-[32%] py-4 right-56 border-dotted border-2 rounded-2xl border-yellow-400 bg-gray-800">
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileRef}
          onChange={selectFileHandler}
        />
        <Button
          icon="bx bx-image-add"
          // label="Choose Image"
          onClick={chooseImageHandler}
        />
        <Button
          icon="bx bx-zoom-in"
          // label="Zoom In"
          onClick={handleZoomIn}
          isDisabled={!isImgSelected}
        />
        <Button
          icon="bx bx-zoom-out"
          // label="Zoom Out"
          onClick={handleZoomOut}
          isDisabled={!isImgSelected}
        />
        <Button
          icon="bx bx-reset"
          // label="Reset"
          onClick={resetHandler}
          isDisabled={!isImgSelected}
        />
        <Button
          icon="bx bxs-download"
          // label="Download"
          onClick={downloadImage}
          isDisabled={!isImgSelected}
        />
      </div>
    );
  };

  return (
    <>
      <img src={logo} alt="logo" className="w-56 h-40 -mt-8 ml-4" />
      <div
        className={`fixed text-amber-100 px-4 py-2 mt-12 top-0 right-[42%] border-dotted border-2 rounded-2xl border-yellow-400 bg-gray-800 ${
          isImgSelected ? "" : "pointer-events-none opacity-50"
        }`}
      >
        <button
          className="px-4"
          onClick={() => {
            setRotate((prevRotate) => prevRotate - 90);
          }}
        >
          <i className="fa-solid fa-rotate-left"></i>
        </button>
        <button
          className="px-4"
          onClick={() => {
            setRotate((prevRotate) => prevRotate + 90);
          }}
        >
          <i className="fa-solid fa-rotate-right"></i>
        </button>
        <button
          className="px-4"
          onClick={() => {
            setFlipVertical((prev) => -prev);
          }}
        >
          <i className="bx bx-reflect-horizontal"></i>
        </button>
        <button
          className="px-4"
          onClick={() => {
            setFlipHorizontal((prev) => -prev);
          }}
        >
          <i className="bx bx-reflect-vertical"></i>
        </button>
        <button onClick={enableCrop}>
          <i className="bx bxs-crop"></i>
        </button>
      </div>
      <Test selectedImage={selectedImage}/>
      <div className="w-[50%] flex items-center justify-center overflow-hidden -mt-5 h-[500px] m-auto p-2 border-solid border-[1px] rounded-lg border-yellow-400 bg-gray-800">
        <img
          ref={imageRef}
          id="image-preview"
          src={selectedImage}
          alt="preview-img"
          className=" object-contain max-h-full"
          style={applyFilter()}
        />
      </div>

      <div
        className={`fixed text-amber-100 py-2 px-4 mb-4 bottom-0 right-[30%] border-dotted border-2 rounded-2xl border-yellow-400 bg-gray-800 ${
          isImgSelected ? "" : "pointer-events-none opacity-50"
        }`}
      >
        {cropEnabled ? (
          <>
            <CropAspectRatio setAspectRatio={setAspectRatio} />
            <button onClick={disableCrop}>Back</button>
            <button onClick={cropHandler}>Crop Image</button>
          </>
        ) : (
          <>
            <div className="bg-gray-800">
              {filterOptions.map((option, index) => {
                return (
                  <FilterOption
                    key={option.name + index}
                    name={option.name}
                    active={index === selectedFilterIndex}
                    handleClick={() => setSelectedFilterIndex(index)}
                  />
                );
              })}
            </div>
            <div className="flex flex-col bg-gray-800">
              <FilterSlider
                selectedOption={selectedOption}
                selectedFilterIndex={selectedFilterIndex}
                setFilterOptions={setFilterOptions}
              />
            </div>
          </>
        )}
      </div>

      {renderSidePanel()}
    </>
  );
};

export default Main;
