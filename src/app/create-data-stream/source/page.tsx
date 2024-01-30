// import Source from "../../components/source";

import dynamic from 'next/dynamic'

const Source = dynamic(
  () => import('../../components/source'),
  { ssr: false }
)

export default function DataSourcePage() {
  return <Source />;
}
