import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BookingForm from '@/features/booking/components/BookingForm';
import { ToastProvider } from '@/shared/ui/fx/ToastProvider';

describe('BookingForm', () => {
  it('affiche des erreurs de validation à la soumission vide', async () => {
    const user = userEvent.setup();

    render(
      <ToastProvider>
        <BookingForm />
      </ToastProvider>,
    );

    await user.click(screen.getByRole('button', { name: 'Envoyer la demande' }));

    expect(screen.getByText('Nom requis')).toBeInTheDocument();
    expect(screen.getByText('Email invalide')).toBeInTheDocument();
    expect(screen.getByText('Consentement requis')).toBeInTheDocument();
  });
});
