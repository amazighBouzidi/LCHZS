export default function convertAndCompress(file) {
    const maxSizeBytes = 0.5 * 1024 * 1024; // Convert MB to bytes

    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
            const img = new Image();
            img.src = fileReader.result;

            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                // Calculate the compression ratio to achieve the target size
                const compressionRatio = Math.sqrt(maxSizeBytes / (img.width * img.height * 3 * 4)); // 3 channels (RGB), 4 bytes per pixel

                // Set canvas dimensions based on the original image dimensions and compression ratio
                canvas.width = img.width * compressionRatio;
                canvas.height = img.height * compressionRatio;

                // Draw the image onto the canvas with the scaled dimensions
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                // Convert the canvas content to base64 with JPEG format and desired quality
                const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7); // Adjust quality as needed

                resolve(compressedBase64);
            };

            img.onerror = (error) => {
                reject(error);
            };
        };

        fileReader.onerror = (error) => {
            reject(error);
        };
    });
}
