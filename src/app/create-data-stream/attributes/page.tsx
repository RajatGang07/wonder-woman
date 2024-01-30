// import Attribute from '../../components/attributes';
import dynamic from 'next/dynamic'

const Attribute = dynamic(
  () => import('../../components/attributes'),
  { ssr: false }
)
export default function AttributePage() {
  return (
      <Attribute />
  );
}
