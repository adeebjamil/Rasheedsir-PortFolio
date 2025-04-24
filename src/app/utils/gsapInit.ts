import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// Only register the standard plugins
gsap.registerPlugin(ScrollTrigger);

// For development, you can create dummy implementations of the premium plugins
// to avoid errors. Replace these with actual plugins when you have a membership.
const createDummyPlugin = (name: string) => ({
  name,
  init() {
    console.warn(`${name} is a premium GSAP plugin and requires a Club GreenSock membership.`);
    return this;
  }
});

// Create dummy exports to satisfy imports elsewhere in your code
export const MorphSVGPlugin = createDummyPlugin('MorphSVGPlugin');
export const DrawSVGPlugin = createDummyPlugin('DrawSVGPlugin');
export const MotionPathPlugin = createDummyPlugin('MotionPathPlugin');
export const MotionPathHelper = createDummyPlugin('MotionPathHelper');

// Add ScrollTrigger to exports
export { ScrollTrigger };