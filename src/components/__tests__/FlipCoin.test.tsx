import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import FlipCoin from '../FlipCoin';
import * as coinFlipUtils from '@/utils/coinFlip';

// Mock the coin flip utility functions
jest.mock('@/utils/coinFlip', () => ({
  randomEnumValue: jest.fn(),
  isCoinHeads: jest.fn(),
}));

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
  },
}));

const mockRandomEnumValue = coinFlipUtils.randomEnumValue as jest.MockedFunction<typeof coinFlipUtils.randomEnumValue>;
const mockIsCoinHeads = coinFlipUtils.isCoinHeads as jest.MockedFunction<typeof coinFlipUtils.isCoinHeads>;

describe('FlipCoin Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should render initial state with Kron (heads) by default', () => {
    render(<FlipCoin />);
    
    expect(screen.getByText('Kron')).toBeInTheDocument();
    expect(screen.getByAltText('krone siden')).toBeInTheDocument();
    expect(screen.getByText('Kast')).toBeInTheDocument();
  });

  it('should show loading state when coin is being flipped', () => {
    mockRandomEnumValue.mockReturnValue('Kron');
    mockIsCoinHeads.mockReturnValue(true);
    
    render(<FlipCoin />);
    
    fireEvent.click(screen.getByText('Kast'));
    
    expect(screen.getByText('Kron eller mynt')).toBeInTheDocument();
    expect(screen.getByText('Kaster...')).toBeInTheDocument();
    expect(screen.getByAltText('kron eller mynt bilde loop')).toBeInTheDocument();
  });

  it('should display Kron result after coin flip', async () => {
    mockRandomEnumValue.mockReturnValue('Kron');
    mockIsCoinHeads.mockReturnValue(true);
    
    render(<FlipCoin />);
    
    fireEvent.click(screen.getByText('Kast'));
    
    // Fast-forward through the timeout
    act(() => {
      jest.advanceTimersByTime(1500);
    });
    
    await waitFor(() => {
      expect(screen.getByText('Kron')).toBeInTheDocument();
      expect(screen.getByAltText('krone siden')).toBeInTheDocument();
    });
    
    expect(mockRandomEnumValue).toHaveBeenCalledTimes(1);
    expect(mockIsCoinHeads).toHaveBeenCalledWith('Kron');
  });

  it('should display Mynt result after coin flip', async () => {
    mockRandomEnumValue.mockReturnValue('Mynt');
    mockIsCoinHeads.mockReturnValue(false);
    
    render(<FlipCoin />);
    
    fireEvent.click(screen.getByText('Kast'));
    
    // Fast-forward through the timeout
    act(() => {
      jest.advanceTimersByTime(1500);
    });
    
    await waitFor(() => {
      expect(screen.getByText('Mynt')).toBeInTheDocument();
      expect(screen.getByAltText('mynt siden')).toBeInTheDocument();
    });
    
    expect(mockRandomEnumValue).toHaveBeenCalledTimes(1);
    expect(mockIsCoinHeads).toHaveBeenCalledWith('Mynt');
  });

  it('should disable button during coin flip animation', () => {
    mockRandomEnumValue.mockReturnValue('Kron');
    mockIsCoinHeads.mockReturnValue(true);
    
    render(<FlipCoin />);
    
    fireEvent.click(screen.getByText('Kast'));
    
    // During animation, the "Kast" button should not be visible
    expect(screen.queryByText('Kast')).not.toBeInTheDocument();
    
    // The disabled "Kaster..." button should be visible
    const loadingButton = screen.getByRole('button', { name: /kaster/i });
    expect(loadingButton).toBeDisabled();
  });

  it('should re-enable button after animation completes', async () => {
    mockRandomEnumValue.mockReturnValue('Kron');
    mockIsCoinHeads.mockReturnValue(true);
    
    render(<FlipCoin />);
    
    fireEvent.click(screen.getByText('Kast'));
    
    // Fast-forward through the timeout
    act(() => {
      jest.advanceTimersByTime(1500);
    });
    
    await waitFor(() => {
      expect(screen.getByText('Kast')).toBeInTheDocument();
    });
    
    const button = screen.getByText('Kast');
    expect(button).not.toBeDisabled();
  });

  it('should handle multiple consecutive flips', async () => {
    mockRandomEnumValue
      .mockReturnValueOnce('Kron')
      .mockReturnValueOnce('Mynt');
    mockIsCoinHeads
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(false);
    
    render(<FlipCoin />);
    
    // First flip
    fireEvent.click(screen.getByText('Kast'));
    act(() => {
      jest.advanceTimersByTime(1500);
    });
    
    await waitFor(() => {
      expect(screen.getByText('Kron')).toBeInTheDocument();
    });
    
    // Second flip
    fireEvent.click(screen.getByText('Kast'));
    act(() => {
      jest.advanceTimersByTime(1500);
    });
    
    await waitFor(() => {
      expect(screen.getByText('Mynt')).toBeInTheDocument();
    });
    
    expect(mockRandomEnumValue).toHaveBeenCalledTimes(2);
    expect(mockIsCoinHeads).toHaveBeenCalledTimes(2);
  });
});