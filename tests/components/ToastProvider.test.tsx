import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ToastProvider, useToast } from '@/shared/ui/fx/ToastProvider';

function DemoToastButton() {
  const { success } = useToast();
  return <button onClick={() => success('Opération réussie', 'Tout est ok.')}>Toast</button>;
}

describe('ToastProvider', () => {
  it('affiche une notification après un trigger', async () => {
    const user = userEvent.setup();

    render(
      <ToastProvider>
        <DemoToastButton />
      </ToastProvider>,
    );

    await user.click(screen.getByRole('button', { name: 'Toast' }));

    expect(screen.getByText('Opération réussie')).toBeInTheDocument();
    expect(screen.getByText('Tout est ok.')).toBeInTheDocument();
  });
});
