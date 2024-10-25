'use client'
import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
export function FadeInText({ children }: { children: React.ReactNode }) {
    const controls = useAnimation();
    const [ref, inView] = useInView({
        triggerOnce: true, // Only trigger the animation once
        threshold: 0.1, // Trigger when 10% of the element is in view
    });

    useEffect(() => {
        if (inView) {
            controls.start('visible');
        }
    }, [controls, inView]);

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={{
                hidden: { opacity: 0, y: 50 }, // Start with text hidden and moved down slightly
                visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }, // Animate to fully visible with smooth transition
            }}
        >
            {children}
        </motion.div>
    );
}

