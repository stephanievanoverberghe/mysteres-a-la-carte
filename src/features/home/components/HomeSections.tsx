import dynamic from 'next/dynamic';
import BookingForm from '@/features/booking/components/BookingForm';
import Concept from '@/features/home/components/sections/Concept';
import Contact from '@/features/home/components/sections/Contact';
import FAQ from '@/features/home/components/sections/FAQ';
import Hero from '@/features/home/components/sections/Hero';
import Menus from '@/features/home/components/sections/Menus';
import Steps from '@/features/home/components/sections/Steps';
import Pane from '@/shared/ui/fx/scroll/Pane';

const Dataviz = dynamic(() => import('@/features/home/components/sections/Dataviz'), {
    loading: () => <section id="dataviz" className="md:py-24 py-14" aria-hidden="true" />,
});

export default function HomeSections() {
    return (
        <>
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
        </>
    );
}
