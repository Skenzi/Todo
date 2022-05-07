// TODO: add stats

/*import React from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from '../../store/selectors';

interface DataItemProps {
  value: string | number,
  property: string,
}

function DataItem({ value, property }: DataItemProps) {
  return (
    <div className="data__item">
      <span className="data__header">{property}</span>
      {': '}
      {value}
    </div>
  );
}

const userProperties = [
  {
    name: 'username',
    property: 'Name',
  },
  {
    name: 'level',
    property: 'Level',
  },
  {
    name: 'exp',
    property: 'Experience',
  },
];

function ProfilePage() {
  const user = useSelector(userSelector);
  return (
    <div className="profile bg-main">
      <div className="profile__img" />
      <div className="profile__data">
        {userProperties.map((item) => (
          <DataItem
            key={item.name}
            value={user[item.name]}
            property={item.property}
          />
        ))}
      </div>
    </div>
  );
}

export default ProfilePage;*/
