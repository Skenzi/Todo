import React from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from '../../store/selectors';

function ProfilePage() {
  const user = useSelector(userSelector);
  const stats = Object.entries(user.stats);
  return (
    <div className="profile bg-main">
      <div className="profile__img" />
      <div className="profile__data">
        <div className="data__item">
          <span className="data__header">Name:</span>
          {' '}
          {user.username}
        </div>
        <div className="data__item">
          <span className="data__header">Level:</span>
          {' '}
          {user.level}
        </div>
        <div className="data__item">
          <span className="data__header">Experience:</span>
          {' '}
          {user.exp}
        </div>
        {stats.map(([stat, value]) => (
          <div key={stat} className="data__item">
            <span className="data__header">{stat}</span>
            :
            {' '}
            {value}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfilePage;
