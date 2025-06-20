// Mobile animation utilities
export const getMobileAnimationProps = (isInView, isMobile = false) => {
  // On mobile, always show content after a short delay
  if (isMobile) {
    return {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.6, delay: 0.2 }
    }
  }
  
  // Desktop: use intersection observer
  return {
    initial: "hidden",
    animate: isInView ? "visible" : "hidden"
  }
}

export const isMobileDevice = () => {
  if (typeof window === 'undefined') return false
  return window.innerWidth < 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}