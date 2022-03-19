import React from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from '../../store/selectors';

function DataItem({ value, property }) {
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
  const stats = Object.entries(user.stats);
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
        {stats.map(([stat, value]) => (
          <DataItem key={stat} value={value} property={stat} />
        ))}
      </div>
    </div>
  );
}

export default ProfilePage;
