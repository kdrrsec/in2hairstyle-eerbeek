import { pageMetadata } from '@/lib/site';
import { OverOns, SubPage } from '../sections';

export const metadata = pageMetadata({
  title: 'Over ons',
  description:
    'In2Hairstyle is een kapsalon voor dames, heren en kinderen aan de Coldenhovenseweg 6a in Eerbeek. Online een afspraak maken of gewoon binnenlopen.',
  path: '/over-ons',
});

export default function OverOnsPage() {
  return (
    <SubPage name="Over ons" path="/over-ons">
      <OverOns heading="h1" />
    </SubPage>
  );
}
