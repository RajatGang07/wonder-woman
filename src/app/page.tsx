import TabsComponent from './components/Tabs';
import React from 'react';

const TabsPage = () => {
  return (
    <div className='bg-white rounded-lg'>
      <h1>Tabs page</h1>
      <br />

      {/* Tabs Component */}
      <TabsComponent items={items} />
    </div>
  );
};

export default TabsPage;

const items = [
  {
    title: 'Tab 1',
    route: 'connect-data-source/select-data-source',
  },
  {
    title: 'Tab 2',
    content: (
      <div className='border-2 border-blue-400 rounded-lg p-4'>
        <h1 className='text-3xl text-blue-600'>Title Test 2</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
          aperiam asperiores dolo iti harum! Totam, mollitia quos voluptatem
          deleniti provident obcaecati rerum.
        </p>
      </div>
    ),
  },
  {
    title: 'Tab 3',
    content: (
      <div className='border-2 border-blue-400 rounded-lg p-4'>
        <h1 className='text-3xl text-blue-600'>Title Test 3</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
          aperiam asperiores doloribus velit dolore magnam ex consectetur fugit
          earum illum qui similique architecto dolorum, minima enim quidem
          voluptatibus at nulla deleniti harum! Totam, mollitia quos voluptatem
          deleniti provident obcaecati rerum. amet consectetur adipisicing elit.
          Dolores aperiam asperiores doloribus velit dolore magnam ex
          consectetur fugit earum illum qui similiq
        </p>
      </div>
    ),
  },
  {
    title: 'Tab 4',
    content: (
      <div className='border-2 border-blue-400 rounded-lg p-4'>
        <h1 className='text-3xl text-blue-600'>Title Test 4</h1>
        <p>
          Lorem ipsum dolor sit ue architecto dolorum, minima enim quidem
          voluptatibus at nulla deleniti harum! Totam, mollitia quos voluptatem
          deleniti provident obcaecati rerum.
        </p>
      </div>
    ),
  },
];