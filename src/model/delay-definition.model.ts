import { DelayDistribution } from './delay-distribution.model';

/**
 * This file was automatically generated. DO NOT MODIFY IT BY HAND.
 */

export type DelayDefinition = FixedDelay | DelayDistribution;

/**
 * Fixed delay
 */
export interface FixedDelay {
  fixedDelay?: number;
}
