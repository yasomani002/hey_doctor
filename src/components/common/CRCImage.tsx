import { useState, useEffect } from "react";
import { ImageIcon } from "lucide-react";

const CRCImage = ({
    imageSrc,
    height = 14,
    width = 14,
    onClick,
    className,
    border = true,
}: {
    imageSrc: string | null;
    height?: number;
    width?: number;
    onClick?: () => void;
    className?: string;
    border?: boolean;
}) => {
    const [hasError, setHasError] = useState(false);

    // Reset error state if imageSrc changes
    useEffect(() => {
        setHasError(false);
    }, [imageSrc]);

    return hasError || !imageSrc ? (
        <div
            className={`w-${width} h-${height} ${border ? "border-2 border-gray-300 rounded-[5px]" : ""} flex justify-center items-center ${className}`}
            role="img"
            aria-label="Placeholder image"
        >
            <ImageIcon color="gray" size={40} />
        </div>
    ) : (
        <img
            src={imageSrc}
            alt="Variant image"
            className={`w-${width} h-${height} object-contain ${border ? "border-2 border-gray-300 rounded-[5px]" : ""} flex justify-center items-center ${className}`}
            onError={() => setHasError(true)}
            onClick={onClick}
        />
    );
};

export default CRCImage;
