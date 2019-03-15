import React from 'react';
import Contacts from '../contacts/Contacts';
import Sidebar from '../layout/Sidebar';

export default () => {
  return (
    <div className="row">
      <div className="col-md-12 ">
        <Contacts />
      </div>
      <div className="col-md-2 ">{/* <Sidebar /> */}</div>
    </div>
  );
};
