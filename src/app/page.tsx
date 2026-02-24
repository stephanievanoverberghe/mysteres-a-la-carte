import Footer from '@/shared/ui/layout/Footer';
import HomeSections from '@/features/home/components/HomeSections';
import Header from '@/features/navigation/components/Header';

export default function HomePage() {
    return (
        <>
            <Header />
            <main id="main">
                <HomeSections />
            </main>
            <Footer />
        </>
    );
}
