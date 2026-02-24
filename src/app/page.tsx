import Footer from '@/shared/ui/layout/Footer';
import Header from '@/features/navigation/components/Header';
import HomeSections from '@/features/home/components/HomeSections';

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
