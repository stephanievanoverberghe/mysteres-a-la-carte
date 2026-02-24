import Button from '@/shared/ui/Button';

type Props = {
    loading: boolean;
    status: 'idle' | 'loading' | 'success' | 'error';
};

export default function BookingActions({ loading, status }: Props) {
    return (
        <div className="md:col-span-2">
            <Button type="submit" disabled={loading}>
                {loading ? 'Envoi…' : 'Envoyer la demande'}
            </Button>
            <span className="ml-4 text-sm" aria-live="polite">
                {status === 'error' && <span className="text-red-400">Oups, réessayez dans un instant.</span>}
            </span>
        </div>
    );
}
