/*
  Gradient Blur
    - target: the class name or id of the div you want to apply blur to (string)
    - opacity: overall opacity of the blur layers (number: 0 - 1)
    - position: 'top', 'bottom', 'left', 'right' (string)
    - blur: max blur radius in pixels (number)
    - height: height of the blur gradient (string: '500px', '50%', etc.)
    - zIndex: z-index of the container (number)
    - divCount: number of blur layers (number)
    - width: width of the blur gradient (string: '500px', '50%', etc.) -> Optional, defaults to 100%
  */

import { useEffect, useRef } from 'react';

const GradualBlur = ({
    target,
    opacity = 1,
    position = 'bottom',
    blur = 20,
    height = '100px',
    zIndex = 2,
    divCount = 8,
    width = '100%',
    style
}) => {
    const containerRef = useRef(null);

    useEffect(() => {
        // Logic to append blur layers to the target div is tricky in pure React
        // usually this component renders them itself.
        // But if 'target' is meant to be the parent, we should position absolutely.
        // If 'target' is just a selector, we might not need it if we put this INSIDE the container.

    }, []);

    const getMaskGradient = () => {
        // Simple gradient opacity mask could be used, but layered approach works too.
        // We will stick to the "div stacking" method common for this effect.
    };

    // Calculate opacities for layers to create smooth gradient
    // This is a linear distribution for demonstration.
    // Real implementation might use Gaussian curve.

    const layers = Array.from({ length: divCount }).map((_, i) => {
        const step = i + 1;
        // Exponential blur increase
        const blurAmount = (i / (divCount - 1)) * blur;

        // Opacity gradient (fading out at the clear end?)
        // Actually gradual blur usually means:
        // Layer 1: Blur 1px, Mask: 0% -> 10%
        // Layer 2: Blur 2px, Mask: 10% -> 20%
        // ...

        // Simplified Stack:
        // Just returning divs with increasing blur z-indexed?
        // The common technique is `backdrop-filter` with increasing `mask-image` stops.

        const maskStart = (i / divCount) * 100;
        const maskEnd = ((i + 1) / divCount) * 100;

        return (
            <div
                key={i}
                style={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: i,
                    backdropFilter: `blur(${blurAmount}px)`,
                    WebkitBackdropFilter: `blur(${blurAmount}px)`,
                    maskImage: getLinearGradient(position, maskStart, maskEnd),
                    WebkitMaskImage: getLinearGradient(position, maskStart, maskEnd),
                    opacity: opacity
                }}
            />
        );
    });

    // Reverse layers so highest blur is on top? Or bottom?
    // Usually highest blur covers the 'deep' end.

    return (
        <div
            ref={containerRef}
            style={{
                position: 'absolute',
                [position]: 0,
                width: width,
                height: height,
                zIndex: zIndex,
                pointerEvents: 'none',
                ...style
            }}
        >
            {layers}
        </div>
    );
};

// Helper for gradient direction
const getLinearGradient = (pos, start, end) => {
    const map = {
        'top': 'to bottom',
        'bottom': 'to top',
        'left': 'to right',
        'right': 'to left'
    };
    const dir = map[pos] || 'to top';

    // Creating a hard stop slice for each layer? 
    // Or a smooth gradient for each?
    // A common 'Gradual Blur' component implementation stacks masks:
    // Layer N has `mask: linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)`
    // But actually, we need each layer to only affect a SLICE, or blend?

    // Let's implement the simpler version: 
    // Use logic similar to the popular "Gradient Blur" snippet:
    // mask: linear-gradient(dir, transparent start%, black start%, black end%, transparent end%)

    return `linear-gradient(${dir}, transparent ${start}%, black ${start}%, black ${end}%, transparent ${end}%)`;
};

export default GradualBlur;
