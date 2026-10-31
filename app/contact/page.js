import { pageMetadata } from '@/lib/site';
import { Contact, SubPage } from '../sections';

export const metadata = pageMetadata({
  title: 'Contact en openingstijden',
  description:
    'Kapsalon In2Hairstyle, Coldenhovenseweg 6a, 6961 ED Eerbeek. Bel 0313 410 693. Open di t/m za vanaf 09:30, vrijdag tot 20:00.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <SubPage name="Contact" path="/contact">
      <Contact heading="h1" />
    </SubPage>
  );
}
