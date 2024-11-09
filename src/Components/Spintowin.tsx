
import React from 'react';
import '../style.css';
import useImageData from '../Hooks/useImageData';

const SpinToWin: React.FC = () => {
        const wheelData = useImageData();
        return (
            <div className="spin-to-win-container">
            <div className="spin-header">Spin to Win</div>
            <div className="spin-wheel">
                {/* Wheel segments */}
                {wheelData.map((segment, index) => (
                <div
                    key={segment.id}
                    className="wheel-segment"
                    style={{
                    transform: `rotate(${index * (360 / wheelData.length)}deg) translateY(-110px)`,
                    }}
                >
                    <img className="game-image" src={segment.image} alt="Wheel Segment" />
                </div>
                ))}
        
                {/* Pointer Arrow */}
                <div className="pointer-arrow"></div>
            </div>
            <div className="spin-button">Spin</div>
            </div>
        );
    };

export default SpinToWin;
