// import DataStream from "../components/dataStream";
import dynamic from 'next/dynamic'

const DataStream = dynamic(
  () => import('../components/dataStream'),
  { ssr: false }
)
const DataStreamPage = () => {
  return (
    <DataStream />
  );
};

export default DataStreamPage;