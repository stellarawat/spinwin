import { FC, useEffect, useRef, useState } from 'react';
import '../style.css';
import useImageData from '../Hooks/useImageData';
import backImg from '../assets/image/back.png';
import plusImg from '../assets/image/plus.png';
import settingsImg from '../assets/image/settings.png';
import closeImg from '../assets/image/close (1).png';
import helpImg from '../assets/image/help.png';
import soundOnImg from '../assets/image/sound-on.png';
import soundOffImg from '../assets/image/mute-button.png';

const SpinToWin: FC = () => {
    const wheelData = useImageData();
    const [rotation, setRotation] = useState(0);
    const [spinning, setSpinning] = useState(false);
    const [balance, setBalance] = useState(1000); 
    const [isMuted, setIsMuted] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [canvasSize, setCanvasSize] = useState(300); 

    const toggleMute = () => {
        setIsMuted(!isMuted);
    };

    const handleDropDownClick = () => {
        setShowDropdown(!showDropdown);
    };

    const spinCost = 10; 
    const segmentAngle = 360 / wheelData.length;

    // canvas 
    const drawPieChart = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = centerX;

        const outerRimGradient = ctx.createRadialGradient(centerX, centerY, radius * 0.9, centerX, centerY, radius);
        outerRimGradient.addColorStop(0, '#FFD700'); // Start with gold inside
        outerRimGradient.addColorStop(1, '#FF4500'); // End with orange-red on the outer edge
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.fillStyle = outerRimGradient; 

        // Apply shadow blur for the outer rim
        ctx.shadowColor = '#FF4500';
        ctx.shadowBlur = 15;
        ctx.fill();
        ctx.shadowColor = 'transparent';

        // Draw pie chart segments 
        wheelData.forEach((segment, index) => {
            const startAngle = (index * segmentAngle * Math.PI) / 180;
            const endAngle = ((index + 1) * segmentAngle * Math.PI) / 180;

            const gradient = ctx.createRadialGradient(centerX, centerY, radius * 0.3, centerX, centerY, radius);
            gradient.addColorStop(0, index % 2 === 0 ? '#FFFACD' : '#FFA07A'); 
            gradient.addColorStop(1, index % 2 === 0 ? '#FFD700' : '#FF4500'); 

            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius * 0.9, startAngle, endAngle);
            // ctx.fillStyle = gradient;
            ctx.fillStyle = index % 2 === 0 ? '#FFD700' : '#FF4500';
            ctx.fill();

            ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
            ctx.shadowBlur = 5;
            ctx.shadowOffsetX = 2;
            ctx.shadowOffsetY = 2;
            ctx.fill();
            ctx.shadowColor = 'transparent';

            // Add text on the segments
            ctx.save();
            ctx.translate(
                centerX + (radius / 1.5) * Math.cos(startAngle + (endAngle - startAngle) / 2),
                centerY + (radius / 1.5) * Math.sin(startAngle + (endAngle - startAngle) / 2)
            );
            ctx.rotate(startAngle + (endAngle - startAngle) / 2);
            ctx.font = '20px montserat'; 
            ctx.fillStyle = 'black';
            ctx.fillText(`${segment.amount}`, -5, 0); // Center text
            ctx.restore();
        });
    };

    // Dynamically resize canvas
    useEffect(() => {
        const updateCanvasSize = () => {
            const containerWidth = canvasRef.current?.parentElement?.offsetWidth || 500;
            setCanvasSize(containerWidth < 500 ? containerWidth : 500); // Maximum 500px width
        };

        window.addEventListener('resize', updateCanvasSize);
        updateCanvasSize(); // Set initial size

        return () => window.removeEventListener('resize', updateCanvasSize);
    }, []);

    // Redraw the canvas when wheel data or size changes
    useEffect(() => {
        drawPieChart();
    }, [wheelData, canvasSize]);

    const handleSpin = () => {
        if (spinning || balance < spinCost) return;

        setSpinning(true);
        setBalance(balance - spinCost);

        const winningIndex = Math.floor(Math.random() * wheelData.length);
        const winningAngle = segmentAngle * winningIndex;
        const fullRotations = 6;
        const targetRotation = fullRotations * 360 + (360 - winningAngle);

        setRotation(targetRotation);

        setTimeout(() => {
            const winningAmount = wheelData[winningIndex].amount;
            setBalance(balance + winningAmount);
            setSpinning(false);
        }, 4000);
    };

    return (
        <>
            <div className="balance-header">
                <img className="back-btn-img" src={backImg} alt="Back" />
                <div className="balance-section">
                    <span className="amount-txt">{balance}</span>
                    <div className="amount-txt">
                        <img className="img-plus-deposit" src={plusImg} alt="Add" />
                    </div>
                </div>
                <div className="dropdown">
                    {!showDropdown ? (
                        <img className="drop-btn" src={settingsImg} onClick={handleDropDownClick} alt="Settings" />
                    ) : (
                        <>
                            <img className="img-setting" src={closeImg} onClick={handleDropDownClick} alt="Close" />
                            <div className="dropdown-content show-content">
                                <img className="img-setting" src={helpImg} alt="Help" />
                                <img
                                    className="img-setting"
                                    src={isMuted ? soundOffImg : soundOnImg}
                                    onClick={toggleMute}
                                    alt={isMuted ? "Unmute" : "Mute"}
                                />
                            </div>
                        </>
                    )}
                </div>
            </div>

            <div className="main-spi-content">
                <div className="spin-title">
                    <h1 className="spin-header"> Spin 2 Win </h1>
                </div>

                <div className="spin-2-win-content" style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px' }}>
                    <canvas
                        ref={canvasRef}
                        width={canvasSize}
                        height={canvasSize}
                        style={{
                            transform: `rotate(${rotation}deg)`,
                            transition: spinning ? 'transform 4s ease-out' : 'none',
                        }}
                    />
                </div>

                <button className="spin-button" onClick={handleSpin}>
                    {spinning ? 'Spinning...' : 'Spin'}
                </button>
            </div>
        </>
    );
};

export default SpinToWin;
