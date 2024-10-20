import React, { ReactElement } from 'react';

declare module "react-smooth-scrolling" {
    interface SmoothProviderProps {
        /**
         * Default ease is `0.1`. More ease means more stiffness.
         */
        ease?: number;
        /**
         * Enable distortion
         */
        skew: boolean;
        children: any;
    }
    export declare const SmoothProvider: React.FC<SmoothProviderProps>;
    export {};
}