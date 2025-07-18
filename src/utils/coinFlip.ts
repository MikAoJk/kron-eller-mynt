export enum CoinSide {
  Kron = "KRON",
  Mynt = "MYNT",
}

/**
 * Generates a random coin side value
 * @returns A random key from the CoinSide enum
 */
export const randomEnumValue = (): string => {
  const values = Object.keys(CoinSide);
  return values[Math.floor(Math.random() * values.length)];
};

/**
 * Determines if the coin flip result is heads (Kron)
 * @param coinResult The result from randomEnumValue()
 * @returns true if Kron (heads), false if Mynt (tails)
 */
export const isCoinHeads = (coinResult: string): boolean => {
  return coinResult === 'Kron';
};

/**
 * Gets all possible coin side values
 * @returns Array of coin side keys
 */
export const getCoinSideValues = (): string[] => {
  return Object.keys(CoinSide);
};