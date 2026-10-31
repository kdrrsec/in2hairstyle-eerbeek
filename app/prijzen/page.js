import { pageMetadata } from '@/lib/site';
import { Prijzen, SubPage } from '../sections';

export const metadata = pageMetadata({
  title: 'Prijzen',
  description:
    'Prijzen bij kapsalon In2Hairstyle in Eerbeek: knippen €27,50, baard €17,50, knippen + baard €42,50 en knippen kind (t/m 12 jaar) €22,50. Direct online boeken.',
  path: '/prijzen',
});

export default function PrijzenPage() {
  return (
    <SubPage name="Prijzen" path="/prijzen">
      <Prijzen heading="h1" />
    </SubPage>
  );
}
