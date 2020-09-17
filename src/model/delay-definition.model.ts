import { DelayDistribution } from './delay-distribution.model';

/**
 * This file was automatically generated. DO NOT MODIFY IT BY HAND.
 */

/**
 * Fixed delay
 */
export interface FixedDelay {
  fixedDelay?: number;
}

export type DelayDefinition = FixedDelay | DelayDistribution;
