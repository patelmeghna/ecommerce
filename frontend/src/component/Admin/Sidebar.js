import React from 'react';
import './sidebar.css';
import logo from "../../images/logo.png";
import { Link } from 'react-router-dom';
import { TreeView, TreeItem } from '@material-ui/lab';
import { MdExpandMore, MdAdd, MdImportExport, MdDashboard, MdPeople, MdRateReview, MdNoteAdd } from 'react-icons/md';
import { FaListAlt } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className='sidebar'>
        <Link to="/">
            <img src={logo} alt="Logo" />
        </Link>

        <Link to="/admin/dashboard">
            <p>
                <MdDashboard /> Dashboard
            </p>
        </Link>

        <a href='#'>
            <TreeView
                defaultCollapseIcon={<MdExpandMore />}
                defaultExpandIcon={<MdImportExport />}
            >
                <TreeItem nodeId='1' label="Products">
                    <Link to="/admin/products">
                        <TreeItem nodeId='2' label="All" icon={<MdNoteAdd />} />
                    </Link>

                    <Link to="/admin/product">
                        <TreeItem nodeId='3' label="Create" icon={<MdAdd />} />
                    </Link>
                </TreeItem>
            </TreeView>
        </a>

        <Link to="/admin/orders">
            <p>
                <FaListAlt />
                Orders
            </p>
        </Link>

        <Link to="/admin/users">
            <p>
                <MdPeople />
                Users
            </p>
        </Link>

        <Link to="/admin/reviews">
            <p>
                <MdRateReview />
                Reviews
            </p>
        </Link>
    </div>
  );
};

export default Sidebar;
