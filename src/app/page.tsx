import BookingForm from '@/components/BookingForm';
import Concept from '@/components/Concept';
import Contact from '@/components/Contact';
import Dataviz from '@/components/Dataviz';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Menus from '@/components/Menus';
import Steps from '@/components/Steps';

export default function HomePage() {
    return (
        <>
            <Header />
            <main id="main">
                <Hero />
                <Concept />
                <Menus />
                <Steps />
                <Dataviz />
                <BookingForm />
                <FAQ />
                <Contact />
            </main>
            <Footer />
        </>
    );
}
