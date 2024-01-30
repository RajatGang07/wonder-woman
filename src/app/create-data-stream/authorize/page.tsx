// import Authorize from '../../components/Authorize';
import dynamic from 'next/dynamic'

const Authorize = dynamic(
  () => import('../../components/Authorize'),
  { ssr: false }
)

export default function AuthorizePage() {
  return (
      <Authorize />
  );
}
