import BookingForm from '@/components/BookingForm';
import Concept from '@/components/Concept';
import Dataviz from '@/components/Dataviz';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Menus from '@/components/Menus';
import Steps from '@/components/Steps';

export default function HomePage() {
    return (
        <>
            <Header />
            <main>
                <section id="hero">
                    <Hero />
                </section>
                <section id="concept" className="container py-24">
                    <Concept />
                </section>
                <section id="experiences" className="container py-24">
                    <Menus />
                </section>
                <section id="steps" className="container py-24 bg-muted/30">
                    <Steps />
                </section>
                <section id="dataviz" className="container py-24">
                    <Dataviz />
                </section>
                <section id="reserver" className="container py-24 bg-muted/30">
                    <BookingForm />
                </section>
                <section id="faq" className="container py-24">
                    [FAQ]
                </section>
                <section id="contact" className="container py-24 bg-muted/30">
                    [Contact]
                </section>
            </main>
            <footer className="border-t border-muted">
                <div className="container py-10 text-sm text-muted-foreground">© {new Date().getFullYear()} Mystères à la Carte</div>
            </footer>
        </>
    );
}
