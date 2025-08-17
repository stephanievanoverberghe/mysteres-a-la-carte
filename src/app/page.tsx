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
                <section id="hero">
                    <Hero />
                </section>
                <section id="concept" className="md:py-24 py-14">
                    <Concept />
                </section>
                <section id="experiences" className="md:py-24 py-14">
                    <Menus />
                </section>
                <section id="steps" className="md:py-24 py-14 bg-muted/30">
                    <Steps />
                </section>
                <section id="dataviz" className="md:py-24 py-14">
                    <Dataviz />
                </section>
                <section id="reserver" className="md:py-24 py-14 bg-muted/30">
                    <BookingForm />
                </section>
                <section id="faq" className="md:py-24 py-14">
                    <FAQ />
                </section>
                <section id="contact" className="md:py-24 py-14 bg-muted/30">
                    <Contact />
                </section>
            </main>
            <footer className="border-t border-muted">
                <Footer />
            </footer>
        </>
    );
}
