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
    