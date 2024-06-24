import React, { useEffect } from "react";
import useMeasure from 'react-use-measure';
import { useDragControls, useMotionValue, useAnimate, motion } from 'framer-motion';

const CheckoutModal = ({ open, setOpen, children }) => {


  //useeffect that stops the background from being scrollable when modal
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

    const [scope, animate] = useAnimate();
    const [drawerRef, { height }] = useMeasure();
  
    const y = useMotionValue(0);
    const controls = useDragControls();
  
    const handleClose = async () => {
      animate(scope.current, {
        opacity: [1, 0],
      });
  
      const yStart = typeof y.get() === "number" ? y.get() : 0;
  
      await animate("#drawer", {
        y: [yStart, height],
      });
  
      setOpen(false);
    };
  
    return (
      <>
        {open && (
          <motion.div
            ref={scope}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={handleClose}
            className="fixed inset-0 z-50 bg-neutral-950/70"
          >
            <motion.div
              id="drawer"
              ref={drawerRef}
              onClick={(e) => e.stopPropagation()}
              initial={{ x: "100%" }}
              animate={{ x: "0%" }}
              transition={{
                ease: "easeInOut",
              }}
              className="absolute h-[100vh] w-full overflow-hidden "
              style={{ y }}
              drag="y"
              dragControls={controls}
              onDragEnd={() => {
                if (y.get() >= 100) {
                  handleClose();
                }
              }}
              dragListener={false}
              dragConstraints={{
                top: 0,
                bottom: 0,
              }}
              dragElastic={{
                top: 0,
                bottom: 0.5,
              }}
            >
              {/* <div className="absolute left-0 right-0 top-0 z-10 flex justify-center bg-white p-4">
                <button
                  onPointerDown={(e) => {
                    controls.start(e);
                  }}
                  className="h-2 w-14 cursor-grab touch-none rounded-full bg-neutral-700 active:cursor-grabbing"
                ></button>
              </div> */}
              <div className="relative z-0 h-full overflow-y-scroll ">
                {children}
              </div>
            </motion.div>
          </motion.div>
        )}
      </>
    );
  };

  export default CheckoutModal;