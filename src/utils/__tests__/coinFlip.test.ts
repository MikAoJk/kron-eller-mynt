import { CoinSide, randomEnumValue, isCoinHeads, getCoinSideValues } from '../coinFlip';

describe('coinFlip utilities', () => {
  describe('CoinSide enum', () => {
    it('should have correct values', () => {
      expect(CoinSide.Kron).toBe('KRON');
      expect(CoinSide.Mynt).toBe('MYNT');
    });

    it('should have exactly two values', () => {
      const values = Object.values(CoinSide);
      expect(values).toHaveLength(2);
      expect(values).toContain('KRON');
      expect(values).toContain('MYNT');
    });
  });

  describe('getCoinSideValues', () => {
    it('should return all coin side keys', () => {
      const values = getCoinSideValues();
      expect(values).toHaveLength(2);
      expect(values).toContain('Kron');
      expect(values).toContain('Mynt');
    });
  });

  describe('randomEnumValue', () => {
    it('should return a valid CoinSide key', () => {
      const result = randomEnumValue();
      expect(['Kron', 'Mynt']).toContain(result);
    });

    it('should return different values over multiple calls', () => {
      // Run the function many times to check randomness
      const results = new Set();
      for (let i = 0; i < 100; i++) {
        results.add(randomEnumValue());
      }
      
      // We expect to see both values with high probability over 100 calls
      // (The probability of getting only one value in 100 calls is extremely low)
      expect(results.size).toBeGreaterThan(1);
      
      // Ensure all returned values are valid
      results.forEach(result => {
        expect(['Kron', 'Mynt']).toContain(result);
      });
    });

    it('should only return valid enum keys', () => {
      // Test multiple times to ensure consistency
      for (let i = 0; i < 50; i++) {
        const result = randomEnumValue();
        expect(typeof result).toBe('string');
        expect(['Kron', 'Mynt']).toContain(result);
      }
    });
  });

  describe('isCoinHeads', () => {
    it('should return true for Kron', () => {
      expect(isCoinHeads('Kron')).toBe(true);
    });

    it('should return false for Mynt', () => {
      expect(isCoinHeads('Mynt')).toBe(false);
    });

    it('should return false for invalid values', () => {
      expect(isCoinHeads('invalid')).toBe(false);
      expect(isCoinHeads('')).toBe(false);
      expect(isCoinHeads('KRON')).toBe(false); // Wrong case
    });
  });
});