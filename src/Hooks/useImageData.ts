import { useState, useEffect } from 'react';
import { WheelSegment } from '../Utils/type'; 

// Function to shuffle array to prevent consecutive segments with the same color
const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
const useImageData = () => {
  const [wheelData, setWheelData] = useState<WheelSegment[]>([]);

  useEffect(() => {
    // Define the amounts for the wheel segments (same as before)
    const amounts = [0, 0 ,0 ,0 ,0 ,0 ,0.5, 0.5, 0.5, 0.10, 0.10, 0.10, 1.00, 1.00, 1.00, 1.50, 1.50, 2.00];

    // Define a mapping of amounts to their corresponding multipliers and colors
    const amountToMultiplier: Record<number, { multiplier: number; color: string }> = {
      0: { multiplier: 0.00, color: 'red' },   // 0.00 ,6
      0.5: { multiplier: 0.5, color: 'blue' },  // 0.5 ,3
      0.10: { multiplier: 0.10, color: 'green' }, // 0.10 ,3
      1.00: { multiplier: 1.00, color: 'orange' }, // 1.00 ,3
      1.50: { multiplier: 1.50, color: 'purple' }, // 1.50 ,2
      2.00: { multiplier: 2.00, color: 'teal' }  // 2.00 ,1
    };
    // Assign multipliers to segments, ensuring correct distribution
    const initialSegmentData = amounts.map((amount, index) => {
      const { multiplier, color } = amountToMultiplier[amount];
      return {
        id: index + 1,
        amount: amount,
        multiplier: String(multiplier),
        color: color,
        cardClass: `card-${Object.keys(amountToMultiplier).indexOf(String(amount))}`
      };
    });

    // Shuffle the data to distribute colors evenly and avoid adjacent repetitions
    const shuffledSegmentData = shuffleArray(initialSegmentData);
    console.log("useImageData",wheelData)
    setWheelData(shuffledSegmentData);
  }, []);

  

  return wheelData;
  
};

export default useImageData;
