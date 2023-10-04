//import { defaults } from "gh-pages";
import React from "react";
import { NavLink } from "react-router-dom";
const AdminMenu = () => {
  return (
    <div >
      <div className="text-center" >
        <div className="list-group dashboard-menu" >
          <div style={{borderRadius:"20px", Color:"pink"}}>
          <h4 style={{borderRadius:"20px", Color:"pink"}}>Admin Panel</h4>
          </div>
          <NavLink
            to="/dashboard/admin/create-category"
            
            className="list-group-item list-group-item-action"
          >
            Create Category
          </NavLink>
          <NavLink
            to="/dashboard/admin/create-product"
            
            className="list-group-item list-group-item-action"
          >
            Create Product
          </NavLink>
          <NavLink
            to="/dashboard/admin/products"
           
            className="list-group-item list-group-item-action"
          >
            Products
          </NavLink>
          <NavLink
            to="/dashboard/admin/orders"
            
            className="list-group-item list-group-item-action"
          >
            Orders
          </NavLink>
          {/* <NavLink
            to="/dashboard/admin/users"
            className="list-group-item list-group-item-action"
          >
            Users
          </NavLink> */}
        </div>
      </div>
    </div>
  );
};
export default AdminMenu;
