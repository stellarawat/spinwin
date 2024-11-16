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
import titleImg from  '../assets/image/SPIN2WIN3[1].png';
import {HowToPlay} from "./howToPlay.tsx";


const SpinToWin = () => {
    const wheelData = useImageData(); 
    const [spinState, setSpinState] = useState(0);
    const [balance, setBalance] = useState(1000); 
    const [isMuted, setIsMuted] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [winningIndex, setWinningIndex] = useState<number | null>(null); // New state for the winning index
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [canvasSize, setCanvasSize] = useState(300);
    const [uiBooleanStates,setUiBooleanStates] = useState({
        showHelpOverlay:false,
    })
    const updateUIState = useCallback((updates: Partial<typeof uiBooleanStates>) => {
        setUiBooleanStates(prevState => ({...prevState,...updates}));
    },[])
    const handleHelpClick=()=> updateUIState({showHelpOverlay:!uiBooleanStates.showHelpOverlay});

    const toggleMute = () => {
        setIsMuted(!isMuted);
    };

    const handleDropDownClick = () => {
        setShowDropdown(!showDropdown);
    };

    const spinCost = 10; 
    const segmentAngle = 360 / wheelData.length;

    const cardWords = ["x 0.00", "x 0.5", "x 0.10", "x 1.00", "x 1.50", "x 2.00"];

    const drawPieChart = (winningIndex: number | null) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = centerX;


        // Draw the outer rim with a metallic gradient
        const metallicGradient = ctx.createLinearGradient(
            centerX - radius,
            centerY - radius,
            centerX + radius,
            centerY + radius
        );

// Add metallic colors for the gradient
        metallicGradient.addColorStop(0, '#A6A6A6'); // Light silver
        metallicGradient.addColorStop(0.5, '#5A5A5A'); // Dark gray
        metallicGradient.addColorStop(1, '#2F2F2F'); // Almost black (gunmetal)

        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.fillStyle = metallicGradient;
        ctx.fill();

// Add a textured black border using a radial gradient
        const borderGradient = ctx.createRadialGradient(
            centerX,
            centerY,
            radius * 0.85, // Start slightly inside
            centerX,
            centerY,
            radius
        );
        borderGradient.addColorStop(0, 'rgba(0, 0, 0, 0.8)'); // Near-black at the start
        borderGradient.addColorStop(1, 'rgba(0, 0, 0, 1)');   // Solid black at the edge

        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.lineWidth = 6; // Border thickness
        ctx.strokeStyle = borderGradient;
        ctx.stroke();

// Add a shadow overlay to the inner segments for depth
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius * 0.9, 0, 2 * Math.PI);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
        ctx.fill();

// Add a faint inner glow to blend the rim with the segments
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius * 0.88, 0, 2 * Math.PI);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)'; // Very faint white glow
        ctx.fill();


        // Draw the pie chart
        const segmentAngle = (2 * Math.PI) / wheelData.length;

        wheelData.forEach((segment, index) => {
            const startAngle = index * segmentAngle;
            const endAngle = startAngle + segmentAngle;

            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius * 0.9, startAngle, endAngle);
            ctx.fillStyle = segment.color;
            ctx.fill();

            if (winningIndex !== null && index === winningIndex) {
                // ctx.lineWidth = 25;
                // ctx.strokeStyle = 'white';
                // ctx.stroke();
            }

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

        // Draw the pointer arrow at the top-center
        drawPointer(ctx, centerX, centerY, radius);
    };
    const drawPointer = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, radius: number) => {
        const pointerHeight = radius * 0.1; // Adjust if pointer is too small
        const pointerWidth = radius * 0.06; // Adjust width if necessary

        ctx.beginPath();
        ctx.moveTo(centerX, centerY - radius - pointerHeight); // Top point of the triangle
        ctx.lineTo(centerX - pointerWidth, centerY - radius); // Bottom-left of the triangle
        ctx.lineTo(centerX + pointerWidth, centerY - radius); // Bottom-right of the triangle
        ctx.closePath();

        ctx.fillStyle = '#00ffdf'; // Pointer color
        ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowColor = 'transparent';
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
        drawPieChart(winningIndex);
    }, [wheelData, canvasSize]);

    const handleSpin = useCallback(() => {
        if (spinState !== 0 || balance < spinCost) return;

        setBalance(balance - spinCost);

        const winningIndex = Math.floor(Math.random() * wheelData.length);
        setWinningIndex(winningIndex);

        const segmentAngle = 360 / wheelData.length;
        const winningAngle = segmentAngle * winningIndex;
        const pointerAdjustment =360 /2 ;
        const fullRotations = 10;

        // Calculate the total target rotation to align the winning segment with the pointer
        const targetRotation = fullRotations * 360 + pointerAdjustment - winningAngle;

        setSpinState(targetRotation);

        setTimeout(() => {
            const winningAmount = wheelData[winningIndex].amount;
            setBalance((prev) => prev + winningAmount);
            setSpinState(0); // Reset spin state
        }, 4000);
    }, [spinState, balance, wheelData]);


    return (
        <div className='main-spin-2-win-header'>
            <div className="balance-header">
                <img className="back-btn-img" src={backImg} alt="Back"/>
                <div className="balance-section">
                    <span className="amount-txt">{balance}</span>
                    <div className="amount-txt">
                        <img className="img-plus-deposit" src={plusImg} alt="Add"/>
                    </div>
                </div>
                <div className="dropdown">
                    {!showDropdown ? (
                        <img className="drop-btn" src={settingsImg} onClick={handleDropDownClick} alt="Settings"/>
                    ) : (
                        <>
                            <img className="img-setting" src={closeImg} onClick={handleDropDownClick} alt="Close"/>
                            <div className="dropdown-content show-content">
                                <img className="img-setting" src={helpImg} onClick={handleHelpClick} alt="Help"/>
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
            <div className="spin-title">
               <img  className="spin-title-img" src={titleImg} alt='title'/>
            </div>
            <div className="main-spi-content">


                <div className="spin-2-win-content" style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '10px'
                }}>
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

                {uiBooleanStates.showHelpOverlay && (
                    <div className="overlay ">
                        <div className="overlay-content">
                            <div className="overlay-back-btn" onClick={handleHelpClick}>
                                <img className="back-btn-img" src={closeImg} alt=""/>
                            </div>
                            <HowToPlay/>
                        </div>
                    </div>
                )}

                <div className="dice-bet-amount-controls">
                    <div className="quantity">
                        <div className="bet-controls">
                            <div className="controls">
                                <button className="control-btn" onClick={() => updateBetAmount('set', 100)}>100</button>
                                <button className="control-btn" onClick={() => updateBetAmount('set', 100)}>50</button>
                                <span className='btn-20'>
                <button className="control-btn-20" onClick={() => updateBetAmount('set', 20)}>20</button>
            </span>
                                <button className="control-btn" onClick={() => updateBetAmount('set', 500)}>250</button>
                                <button className="control-btn" onClick={() => updateBetAmount('set', 1000)}>1000
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpinToWin;
