import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NotFoundView from '@/features/not-found/components/NotFoundView';
import { ToastProvider } from '@/shared/ui/fx/ToastProvider';

describe('NotFoundView', () => {
  it('filtre les raccourcis via la recherche', async () => {
    const user = userEvent.setup();

    render(
      <ToastProvider>
        <NotFoundView />
      </ToastProvider>,
    );

    await user.type(screen.getByLabelText('Rechercher une section'), 'faq');

    expect(screen.getByRole('link', { name: /FAQ/i })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /Concept/i })).not.toBeInTheDocument();
  });
});
