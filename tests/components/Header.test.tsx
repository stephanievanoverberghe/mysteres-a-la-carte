import { render, screen } from '@testing-library/react';
import Header from '@/features/navigation/components/Header';
import { vi } from 'vitest';

vi.mock('@/features/navigation/hooks/useHeaderNavigation', () => ({
  useHeaderNavigation: () => ({
    active: '#concept',
    hidden: false,
    open: false,
    scrolled: false,
    setOpen: vi.fn(),
  }),
}));

vi.mock('@/features/navigation/hooks/useMobileMenuA11y', () => ({
  useMobileMenuA11y: vi.fn(),
}));

describe('Header', () => {
  it('rend le logo et la navigation principale', () => {
    render(<Header />);

    expect(screen.getByRole('img', { name: 'Mystères à la Carte' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Concept' })).toHaveAttribute('href', '#concept');
    expect(screen.getByRole('button', { name: 'Ouvrir le menu' })).toBeInTheDocument();
  });
});
