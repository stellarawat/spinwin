import { useState, useEffect } from 'react';
import { WheelSegment } from '../Utils/type';
import moneyImagefile from '../assets/image/money_1-removebg-preview.png'; // Import the image directly

const useImageData = () => {
const [wheelData, setWheelData] = useState<WheelSegment[]>([]);

useEffect(() => {
    // Define the amounts for the wheel segments
    const amounts = [0, 0, 10, 20, 30, 50, 100, 200, 500, 1000, 5, 10, 15, 25, 50];
    
    // Map the amounts to WheelSegment objects
    const segments = amounts.map((amount, index) => ({
    id: index + 1,
    amount: amount,
      image: moneyImagefile, // Use the imported image
    }));

    // Update the state with the segment data
    setWheelData(segments);
  }, []); // This effect runs only once when the component mounts

return wheelData;
};

export default useImageData;
