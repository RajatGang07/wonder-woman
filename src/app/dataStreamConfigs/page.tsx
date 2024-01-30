// import DataStreamConfigsListing from '../components/dataStreamConfigs';
import dynamic from 'next/dynamic'

const DataStreamConfigsListing = dynamic(
  () => import('../components/dataStreamConfigs'),
  { ssr: false }
)

export default function ConnectionsPage() {
  return (
      <DataStreamConfigsListing />
  );
}
