import {useCallback, useEffect, useRef, useState } from 'react';
import '../style.css';
import useImageData from '../Hooks/useImageData';
import backImg from '../assets/image/back.png';
import plusImg from '../assets/image/plus.png';
import settingsImg from '../assets/image/settings.png';
import closeImg from '../assets/image/close (1).png';
import helpImg from '../assets/image/help.png';
import soundOnImg from '../assets/image/sound-on.png';
import soundOffImg from '../assets/image/mute-button.png';

const SpinToWin = () => {
    const wheelData = useImageData(); 
    const [spinState, setSpinState] = useState(0);
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

    const cardWords = ["x 0.00", "x 0.5", "x 0.10", "x 1.00", "x 1.50", "x 2.00"];

    const drawPieChart = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const centerX = canvas.width / 2; 
        const centerY = canvas.height / 2;
        const radius = centerX;

        const segmentAngle = (2 * Math.PI) / wheelData.length;

        const outerRimGradient = ctx.createRadialGradient(centerX, centerY, radius * 0.9, centerX, centerY, radius);
        outerRimGradient.addColorStop(0, '#FFD700'); 
        outerRimGradient.addColorStop(1, '#FF4500'); 
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.fillStyle = outerRimGradient; 

        ctx.shadowColor = '#FF4500';
        ctx.shadowBlur = 15;
        ctx.fill();
        ctx.shadowColor = 'transparent';

        wheelData.forEach((segment, index) => {
            const startAngle = index * segmentAngle;
            const endAngle = startAngle + segmentAngle;

            const gradient = ctx.createRadialGradient(centerX, centerY, radius * 0.3, centerX, centerY, radius);
            gradient.addColorStop(0, index % 2 === 0 ? '#FFFACD' : '#FFA07A'); 
            gradient.addColorStop(1, index % 2 === 0 ? '#FFD700' : '#FF4500'); 

            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius * 0.9, startAngle, endAngle);
            // ctx.fillStyle = index % 2 === 0 ? '#FFD700' : '#FF4500';
            ctx.fillStyle=segment.color;
            ctx.fill();

            ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
            ctx.shadowBlur = 5;
            ctx.shadowOffsetX = 2;
            ctx.shadowOffsetY = 2;
            ctx.fill();
            ctx.shadowColor = 'transparent';

            ctx.save();
            ctx.translate(
                centerX + (radius / 1.5) * Math.cos(startAngle + segmentAngle / 2),
                centerY + (radius / 1.5) * Math.sin(startAngle + segmentAngle / 2)
            );
            ctx.rotate(startAngle + segmentAngle / 2);
            ctx.font = '20px montserrat'; 
            ctx.fillStyle = 'black';
            ctx.fillText(`${segment.amount}`, -10, 0); 
            ctx.restore();
        });
    };

    useEffect(() => {
        const updateCanvasSize = () => {
            const containerWidth = canvasRef.current?.parentElement?.offsetWidth || 500;
            setCanvasSize(containerWidth < 500 ? containerWidth : 500);
        };

        window.addEventListener('resize', updateCanvasSize);
        updateCanvasSize();

        return () => window.removeEventListener('resize', updateCanvasSize);
    }, []);

    useEffect(() => {
        drawPieChart();
    }, [wheelData, canvasSize]);

    const handleSpin = useCallback(() => {
        if (spinState !== 0 || balance < spinCost) return; // Ensure wheel is not spinning

        setBalance(balance - spinCost);

        const winningIndex = Math.floor(Math.random() * wheelData.length);
        const winningAngle = segmentAngle * winningIndex;
        const fullRotations = 10;
        const pointerAdjustment = -90; 
        const targetRotation = fullRotations * 360 + (pointerAdjustment - winningAngle);

        setSpinState(targetRotation);
        setTimeout(() => {
            console.log('index',winningIndex)
            const winningAmount = wheelData[winningIndex].amount;
            console.log(wheelData)
            console.log('amount in the index',winningAmount)
            setBalance((prev) => prev + winningAmount);
            setSpinState(0)
        }, 4000);

    }, [spinState, balance, wheelData, segmentAngle]);

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
                            transform: `rotate(${spinState}deg)`,
                            transition: spinState ? 'transform 5s ease-out' : 'none',
                        }}
                    />
                </div>

                <div
    className="pointer-arrow"/>
                
                <button className="spin-button" onClick={handleSpin}>
                    {spinState ? 'Spinning...' : 'Spin'}
                </button>

                {/* Multiplying Cards Section */}

                <div className="multiply-cards">
                    {cardWords.map((word, index) => (
                        <div key={index} className={`multiply-card card-${index}`}>
                            {word}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default SpinToWin;
