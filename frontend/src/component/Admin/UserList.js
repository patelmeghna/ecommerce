import React, { useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import { Button } from "@material-ui/core";
import Sidebar from "./Sidebar";
import { MdEdit, MdDelete } from "react-icons/md";
import { getAllUsers, clearErrors, deleteUser } from "../../actions/userAction";
import { DELETE_USER_RESET } from "../../constants/userConstant";

const UserList = () => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { error, users } = useSelector((state) => state.allUsers);

  const { error: deleteError, isDeleted, message } = useSelector(
    (state) => state.profile
  );

  const navigate = useNavigate();

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success(message);
      navigate("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }

    dispatch(getAllUsers());
  }, [dispatch, alert, error, deleteError, navigate, isDeleted, message]);

  const columns = [
    { field: "id", headerName: "User Id", minWidth: 200, flex: 0.5 },
    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex: 0.5,
    },
    { field: "name", headerName: "Name", minWidth: 150, flex: 0.3 },
    {
      field: "role",
      headerName: "Role",
      minWidth: 150,
      flex: 0.3,
      cellClassName: (params) => {
        return params.getValue(params.id, "role") === "admin"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "number",
      minWidth: 150,
      flex: 0.3,
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
              <MdEdit />
            </Link>

            <Button
              onClick={() =>
                deleteUserHandler(params.getValue(params.id, "id"))
              }
            >
              <MdDelete />
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [];

  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        role: item.role,
        email: item.email,
        name: item.name,
      });
    });

  return (
    <>
      <MetaData title={`All Users - Admin`} />

      <div className="dashboard">
        <Sidebar />

        <div className="productListContainer">
          <h1 id="productListHeading">ALL USERS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </>
  );
};

export default UserList