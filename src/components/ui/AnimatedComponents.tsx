'use client';

import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { type ReactNode } from 'react';

/**
 * Common animation variants
 */
export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
};

export const slideInRight: Variants = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
};

export const slideInLeft: Variants = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 50 },
};

export const slideInBottom: Variants = {
  initial: { opacity: 0, y: '100%' },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: '100%' },
};

/**
 * Stagger children animation container
 */
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

/**
 * Page transition wrapper
 */
interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

export function PageTransition({ children, className }: PageTransitionProps) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={fadeInUp}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Animated list item
 */
interface AnimatedListItemProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedListItem({ children, className, delay = 0 }: AnimatedListItemProps) {
  return (
    <motion.div variants={fadeInUp} transition={{ duration: 0.3, delay }} className={className}>
      {children}
    </motion.div>
  );
}

/**
 * Animated card with hover effect
 */
interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function AnimatedCard({ children, className, onClick }: AnimatedCardProps) {
  return (
    <motion.div
      variants={scaleIn}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={className}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}

/**
 * Animated button with tap effect
 */
interface AnimatedButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export function AnimatedButton({ children, className, onClick, disabled }: AnimatedButtonProps) {
  return (
    <motion.button
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
}

/**
 * Bottom sheet animation wrapper
 */
interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function BottomSheet({ isOpen, onClose, children }: BottomSheetProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 999,
            }}
          />
          {/* Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            style={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: 'var(--color-surface, #1a1a1a)',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              paddingBottom: 'env(safe-area-inset-bottom)',
              zIndex: 1000,
              maxHeight: '80vh',
              overflow: 'auto',
            }}
          >
            {/* Handle */}
            <div
              style={{
                width: 40,
                height: 4,
                backgroundColor: 'var(--color-border, #333)',
                borderRadius: 2,
                margin: '12px auto',
              }}
            />
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/**
 * Toast notification animation
 */
interface AnimatedToastProps {
  isVisible: boolean;
  children: ReactNode;
}

export function AnimatedToast({ isVisible, children }: AnimatedToastProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Loading spinner with animation
 */
export function AnimatedSpinner({ size = 24 }: { size?: number }) {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      style={{
        width: size,
        height: size,
        border: '3px solid var(--color-border, #333)',
        borderTopColor: 'var(--color-primary, #9945FF)',
        borderRadius: '50%',
      }}
    />
  );
}

/**
 * Skeleton loading placeholder
 */
export function Skeleton({
  width = '100%',
  height = 20,
  borderRadius = 8,
}: {
  width?: number | string;
  height?: number;
  borderRadius?: number;
}) {
  return (
    <motion.div
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity }}
      style={{
        width,
        height,
        borderRadius,
        backgroundColor: 'var(--color-surface-elevated, #242424)',
      }}
    />
  );
}

/**
 * Number counter animation
 */
interface AnimatedNumberProps {
  value: number;
  duration?: number;
  formatter?: (value: number) => string;
}

export function AnimatedNumber({
  value,
  duration = 0.5,
  formatter = (v) => v.toFixed(2),
}: AnimatedNumberProps) {
  return (
    <motion.span
      key={value}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration }}
    >
      {formatter(value)}
    </motion.span>
  );
}

/**
 * Presence animation wrapper for conditional rendering
 */
interface PresenceProps {
  children: ReactNode;
  isVisible: boolean;
  animation?: Variants;
}

export function Presence({ children, isVisible, animation = fadeIn }: PresenceProps) {
  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          initial="initial"
          animate="animate"
          exit="exit"
          variants={animation}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
