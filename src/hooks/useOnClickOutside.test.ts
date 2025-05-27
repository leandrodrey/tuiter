import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useOnClickOutside } from './useOnClickOutside';

describe('useOnClickOutside', () => {
  let handler: ReturnType<typeof vi.fn>;
  let ref: { current: HTMLDivElement | null };
  let insideElement: HTMLDivElement;
  let outsideElement: HTMLDivElement;

  // Setup before each test
  beforeEach(() => {
    // Create mock elements
    insideElement = document.createElement('div');
    outsideElement = document.createElement('div');
    document.body.appendChild(insideElement);
    document.body.appendChild(outsideElement);

    // Setup ref and handler
    ref = { current: insideElement };
    handler = vi.fn();

    // Mock contains method
    vi.spyOn(insideElement, 'contains').mockImplementation((node) => node === insideElement);
  });

  // Cleanup after each test
  afterEach(() => {
    document.body.removeChild(insideElement);
    document.body.removeChild(outsideElement);
    vi.clearAllMocks();
  });

  it('should call handler when clicking outside the referenced element', () => {
    // Render the hook
    renderHook(() => useOnClickOutside(ref, handler));

    // Simulate a click outside the referenced element
    const mouseEvent = new MouseEvent('mousedown');
    Object.defineProperty(mouseEvent, 'target', { value: outsideElement });
    document.dispatchEvent(mouseEvent);

    // Verify handler was called
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith(mouseEvent);
  });

  it('should not call handler when clicking inside the referenced element', () => {
    // Render the hook
    renderHook(() => useOnClickOutside(ref, handler));

    // Simulate a click inside the referenced element
    const mouseEvent = new MouseEvent('mousedown');
    Object.defineProperty(mouseEvent, 'target', { value: insideElement });
    document.dispatchEvent(mouseEvent);

    // Verify handler was not called
    expect(handler).not.toHaveBeenCalled();
  });

  it('should not call handler when ref.current is null', () => {
    // Set ref.current to null
    ref.current = null;

    // Render the hook
    renderHook(() => useOnClickOutside(ref, handler));

    // Simulate a click
    const mouseEvent = new MouseEvent('mousedown');
    Object.defineProperty(mouseEvent, 'target', { value: outsideElement });
    document.dispatchEvent(mouseEvent);

    // Verify handler was not called
    expect(handler).not.toHaveBeenCalled();
  });

  it('should add event listeners on mount and remove them on unmount', () => {
    // Spy on addEventListener and removeEventListener
    const addEventListenerSpy = vi.spyOn(document, 'addEventListener');
    const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener');

    // Render the hook
    const { unmount } = renderHook(() => useOnClickOutside(ref, handler));

    // Verify event listeners were added
    expect(addEventListenerSpy).toHaveBeenCalledTimes(2);
    expect(addEventListenerSpy).toHaveBeenCalledWith('mousedown', expect.any(Function));
    expect(addEventListenerSpy).toHaveBeenCalledWith('touchstart', expect.any(Function));

    // Unmount the hook
    unmount();

    // Verify event listeners were removed
    expect(removeEventListenerSpy).toHaveBeenCalledTimes(2);
    expect(removeEventListenerSpy).toHaveBeenCalledWith('mousedown', expect.any(Function));
    expect(removeEventListenerSpy).toHaveBeenCalledWith('touchstart', expect.any(Function));
  });

  it('should handle touch events the same way as mouse events', () => {
    // Render the hook
    renderHook(() => useOnClickOutside(ref, handler));

    // Simulate a touch outside the referenced element
    const touchEvent = new TouchEvent('touchstart');
    Object.defineProperty(touchEvent, 'target', { value: outsideElement });
    document.dispatchEvent(touchEvent);

    // Verify handler was called
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith(touchEvent);
  });
});
