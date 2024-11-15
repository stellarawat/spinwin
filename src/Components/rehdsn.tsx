{/* <div className="spin-to-win-container">
        
            <div className="spin-header">Spin to Win</div>

            <div
                className="spin-wheel"
                style={{
                    transform: `rotate(${rotation}deg)`,
                    transition: 'transform 4s ease-out'
                }}
            >
                {wheelData.map((segment, index) => (
                    <div
                        key={segment.id}
                        className="wheel-segment"
                        style={{
                            transform: `rotate(${index * segmentAngle}deg) translateY(-110px)`,
                        }}
                    >
                        <img className="game-image" src={segment.image} alt="Wheel Segment" />
                    </div>
                ))}
                <div className="pointer-arrow"></div>
            </div>

            <div className="spin-button" onClick={handleSpin}>
                {spinning ? 'Spinning...' : 'Spin'}
            </div>
        </div>
        </div> */}




        // const handleSpin = () => {
        //     if (spinning || balance < spinCost) return; // Prevent spin if spinning or balance is too low
    
        //     setSpinning(true);
    
        //     // Deduct the spin cost from the balance
        //     setBalance((prevBalance) => prevBalance - spinCost);
    
        //     const winningIndex = Math.floor(Math.random() * wheelData.length);
        //     const winningSegment = wheelData[winningIndex];
        //     const winningAngle = segmentAngle * winningIndex;
        //     const fullRotations = 5;
        //     const targetRotation = fullRotations * 360 + (360 - winningAngle);
    
        //     // Spin to the target rotation
        //     setRotation(targetRotation);
    
        //     // After the spin completes, update the balance with the winning amount (if any)
        //     setTimeout(() => {
        //         if (winningSegment.amount > 0) {
        //             setBalance((prevBalance) => prevBalance + winningSegment.amount);
        //         }
        //         setSpinning(false); // Reset spinning state after animation
        //     }, 400
    








    //     content: "";
    // position: absolute;
    // height: 100%;
    // width: 100%;
    // left: 0;
    // top: 0;
    // transform: translateY(calc(100% - 6px));
    // background: var(--border-color);
    // box-shadow: var(--shadows-inset);
    // transition-duration: .2s;
    // transition-timing-function: ease-out;
    // transition-property: transform;  

/* 
.multiply-cards {
    display: flex;
    gap: 10px;
    margin-top: 20px;
} */

/* .multiply-card {
    padding: 15px;
    color: white;
    font-weight: bold;
    cursor: pointer;
    text-align: center;
    transition: opacity 0.3s ease;
    border-radius: 10px;
} */



    // import { FC, useEffect, useRef, useState } from 'react';
// import '../style.css';
// import useImageData from '../Hooks/useImageData';
// import backImg from '../assets/image/back.png';
// import plusImg from '../assets/image/plus.png';
// import settingsImg from '../assets/image/settings.png';
// import closeImg from '../assets/image/close (1).png';
// import helpImg from '../assets/image/help.png';
// import soundOnImg from '../assets/image/sound-on.png';
// import soundOffImg from '../assets/image/mute-button.png';

// const SpinToWin: FC = () => {
//     const wheelData = useImageData();
//     const [rotation, setRotation] = useState(0);
//     const [spinning, setSpinning] = useState(false);
//     const [balance, setBalance] = useState(1000); 
//     const [isMuted, setIsMuted] = useState(false);
//     const [showDropdown, setShowDropdown] = useState(false);
//     const canvasRef = useRef<HTMLCanvasElement>(null);
//     const [canvasSize, setCanvasSize] = useState(300); 

//     const toggleMute = () => {
//         setIsMuted(!isMuted);
//     };

//     const handleDropDownClick = () => {
//         setShowDropdown(!showDropdown);
//     };

//     const spinCost = 10; 
//     const segmentAngle = 360 / wheelData.length;

//     const cardWords = ["x 0.00", "x 0.5", "x 0.10", "x 1", "x 1.5", "x 2"];

//     const drawPieChart = () => {
//         const canvas = canvasRef.current;
//         if (!canvas) return;
//         const ctx = canvas.getContext('2d');
//         if (!ctx) return;

//         const centerX = canvas.width / 2; 
//         const centerY = canvas.height / 2;
//         const radius = centerX;

//         const segmentAngle = (2 * Math.PI) / wheelData.length;

//         const outerRimGradient = ctx.createRadialGradient(centerX, centerY, radius * 0.9, centerX, centerY, radius);
//         outerRimGradient.addColorStop(0, '#FFD700'); 
//         outerRimGradient.addColorStop(1, '#FF4500'); 
//         ctx.beginPath();
//         ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
//         ctx.fillStyle = outerRimGradient; 

//         ctx.shadowColor = '#FF4500';
//         ctx.shadowBlur = 15;
//         ctx.fill();
//         ctx.shadowColor = 'transparent';

//         wheelData.forEach((segment, index) => {
//             const startAngle = index * segmentAngle;
//             const endAngle = startAngle + segmentAngle;

//             const gradient = ctx.createRadialGradient(centerX, centerY, radius * 0.3, centerX, centerY, radius);
//             gradient.addColorStop(0, index % 2 === 0 ? '#FFFACD' : '#FFA07A'); 
//             gradient.addColorStop(1, index % 2 === 0 ? '#FFD700' : '#FF4500'); 

//             ctx.beginPath();
//             ctx.moveTo(centerX, centerY);
//             ctx.arc(centerX, centerY, radius * 0.9, startAngle, endAngle);
//             ctx.fillStyle = index % 2 === 0 ? '#FFD700' : '#FF4500';
//             ctx.fill();

//             ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
//             ctx.shadowBlur = 5;
//             ctx.shadowOffsetX = 2;
//             ctx.shadowOffsetY = 2;
//             ctx.fill();
//             ctx.shadowColor = 'transparent';

//             ctx.save();
//             ctx.translate(
//                 centerX + (radius / 1.5) * Math.cos(startAngle + segmentAngle / 2),
//                 centerY + (radius / 1.5) * Math.sin(startAngle + segmentAngle / 2)
//             );
//             ctx.rotate(startAngle + segmentAngle / 2);
//             ctx.font = '20px montserrat'; 
//             ctx.fillStyle = 'black';
//             ctx.fillText(`${segment.amount}`, -10, 0); 
//             ctx.restore();
//         });
//     };

//     useEffect(() => {
//         const updateCanvasSize = () => {
//             const containerWidth = canvasRef.current?.parentElement?.offsetWidth || 500;
//             setCanvasSize(containerWidth < 500 ? containerWidth : 500);
//         };

//         window.addEventListener('resize', updateCanvasSize);
//         updateCanvasSize();

//         return () => window.removeEventListener('resize', updateCanvasSize);
//     }, []);

//     useEffect(() => {
//         drawPieChart();
//     }, [wheelData, canvasSize]);

//     const handleSpin = () => {
//         if (spinning || balance < spinCost) return;

//         setSpinning(true);
//         setBalance(balance - spinCost);

//         const winningIndex = Math.floor(Math.random() * wheelData.length);
//         const winningAngle = segmentAngle * winningIndex;
//         const fullRotations = 10;
//         const pointerAdjustment = 360 / 2;
//         const targetRotation = fullRotations * 360 + (pointerAdjustment - winningAngle);

//         setRotation(targetRotation);

//         setTimeout(() => {
//             const winningAmount = wheelData[winningIndex].amount;
//             setBalance(balance + winningAmount);
//             setSpinning(false);
//         }, 4000);
//     };

//     return (
//         <>
//             <div className="balance-header">
//                 <img className="back-btn-img" src={backImg} alt="Back" />
//                 <div className="balance-section">
//                     <span className="amount-txt">{balance}</span>
//                     <div className="amount-txt">
//                         <img className="img-plus-deposit" src={plusImg} alt="Add" />
//                     </div>
//                 </div>
//                 <div className="dropdown">
//                     {!showDropdown ? (
//                         <img className="drop-btn" src={settingsImg} onClick={handleDropDownClick} alt="Settings" />
//                     ) : (
//                         <>
//                             <img className="img-setting" src={closeImg} onClick={handleDropDownClick} alt="Close" />
//                             <div className="dropdown-content show-content">
//                                 <img className="img-setting" src={helpImg} alt="Help" />
//                                 <img
//                                     className="img-setting"
//                                     src={isMuted ? soundOffImg : soundOnImg}
//                                     onClick={toggleMute}
//                                     alt={isMuted ? "Unmute" : "Mute"}
//                                 />
//                             </div>
//                         </>
//                     )}
//                 </div>
//             </div>

//             <div className="main-spi-content">
//                 <div className="spin-title">
//                     <h1 className="spin-header"> Spin 2 Win </h1>
//                 </div>

//                 <div className="spin-2-win-content" style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px' }}>
//                     <canvas
//                         ref={canvasRef}
//                         width={canvasSize}
//                         height={canvasSize}
//                         style={{
//                             transform: `rotate(${rotation}deg)`,
//                             transition: spinning ? 'transform 4s ease-out' : 'none',
//                         }}
//                     />
//                 </div>

//                 <div className="pointer-arrow"/> 
                
//                 <button className="spin-button" onClick={handleSpin}>
//                     {spinning ? 'Spinning...' : 'Spin'}
//                 </button>

//                 {/* Multiplying Cards Section */}

//                 <div className="multiply-cards">
//                     {cardWords.map((word, index) => (
//                         <div key={index} className={`multiply-card card-${index}`}>
//                             {word}
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </>
//     );
// };

// export default SpinToWin;
