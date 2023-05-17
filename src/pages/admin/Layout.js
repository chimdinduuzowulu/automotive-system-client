import React from 'react';
import Footer from '../admin/layout/Footer';
import Header from '../admin/layout/Header';
import SideNav from '../admin/layout/SideNav';
import '../../styles/adminStyle.css';


const AdminLayout = (props) => {
  return (
    <div className='App'>
      <div id='wrapper' className="">
        <SideNav />
        <div id='content-wrapper' className='d-flex flex-column'>
          <div id='content' className="bg-yellow-500">
            <Header />
            {props.children}
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
