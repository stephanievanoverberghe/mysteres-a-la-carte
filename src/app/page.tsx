import BookingForm from '@/features/booking/components/BookingForm';
import Concept from '@/components/Concept';
import Contact from '@/components/Contact';
import Dataviz from '@/components/Dataviz';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import Header from '@/features/navigation/components/Header';
import Hero from '@/components/Hero';
import Menus from '@/components/Menus';
import Steps from '@/components/Steps';
import Pane from '@/components/FX/ScrollFX/Pane';

export default function HomePage() {
    return (
        <>
            <Header />
            <main id="main">
                <Pane translate={10} rotate={0.15} scale={0.01} className="block">
                    <Hero />
                </Pane>

                <Pane translate={14} rotate={0.2} scale={0.012} className="block">
                    <Concept />
                </Pane>

                <Pane translate={16} rotate={0.22} scale={0.013} className="block">
                    <Menus />
                </Pane>

                <Pane translate={14} rotate={0.18} scale={0.011} className="block">
                    <Steps />
                </Pane>

                <Pane translate={12} rotate={0.16} scale={0.01} className="block">
                    <Dataviz />
                </Pane>

                <Pane translate={10} rotate={0.12} scale={0.01} className="block">
                    <BookingForm />
                </Pane>

                <Pane translate={12} rotate={0.14} scale={0.01} className="block">
                    <FAQ />
                </Pane>

                <Pane translate={12} rotate={0.14} scale={0.01} className="block">
                    <Contact />
                </Pane>
            </main>
            <Footer />
        </>
    );
}
