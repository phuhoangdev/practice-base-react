import { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { fetchAllUser } from "../services/UserService";
import ReactPaginate from "react-paginate";
import ModalAddNew from "./ModalAddNew";
import ModalEditUser from "./ModalEditUser";
import ModalConfirm from "./ModalConfirm";
import _, { debounce } from "lodash";
import "./TableUser.scss";
import { CSVLink } from "react-csv";
import Papa from "papaparse";
import { toast } from "react-toastify";

const TableUsers = () => {
   const [listUsers, setListUsers] = useState([]);
   const [totalUsers, setTotalUsers] = useState(0);
   const [totalPages, setTotalPages] = useState(0);

   const [showModalAddNew, setShowModalAddNew] = useState(false);

   const [showModalEdit, setShowModalEdit] = useState(false);
   const [dataUserEdit, setDataUserEdit] = useState({});

   const [showModalDelete, setShowModalDelete] = useState(false);
   const [dataUserDelete, setDataUserDelete] = useState({});

   const [sortBy, setSortBy] = useState("asc");
   const [sortField, setSortField] = useState("id");
   const [dataExport, setDataExport] = useState([]);

   const handleShow = () => {
      setShowModalAddNew(true);
   };
   const handleClose = () => {
      setShowModalAddNew(false);
      setShowModalEdit(false);
      setShowModalDelete(false);
   };

   useEffect(() => {
      getUsers(1);
   }, []);

   const getUsers = async (page) => {
      let res = await fetchAllUser(page);

      if (res && res.data && res.data) {
         setListUsers(res.data);
         setTotalUsers(res.total);
         setTotalPages(res.total_pages);
      }
   };

   const handlePageClick = (event) => {
      getUsers(+event.selected + 1);
   };

   const handleUpdateTable = (user) => {
      setListUsers([user, ...listUsers]);
   };

   const handleEditUser = (user) => {
      setShowModalEdit(true);
      setDataUserEdit(user);
   };

   const handleEditUserFromModal = (user) => {
      let cloneListUsers = _.cloneDeep(listUsers);
      let index = listUsers.findIndex((item) => item.id === user.id);
      cloneListUsers[index].first_name = user.first_name;
      setListUsers(cloneListUsers);
   };

   const handleDeleteUser = (user) => {
      setShowModalDelete(true);
      setDataUserDelete(user);
   };

   const handleDeleteUserFromModal = (user) => {
      let cloneListUsers = _.cloneDeep(listUsers);
      cloneListUsers = cloneListUsers.filter((item) => item.id !== user.id);
      setListUsers(cloneListUsers);
   };

   const handleSort = (sortBy, sortField) => {
      setSortBy(sortBy);
      setSortField(sortField);

      let cloneListUsers = _.cloneDeep(listUsers);
      cloneListUsers = _.orderBy(cloneListUsers, [sortField], [sortBy]);
      setListUsers(cloneListUsers);
   };

   const handleSearch = debounce((event) => {
      let term = event.target.value;

      if (term) {
         let cloneListUsers = _.cloneDeep(listUsers);
         cloneListUsers = cloneListUsers.filter((item) =>
            item.email.includes(term),
         );
         setListUsers(cloneListUsers);
      } else {
         getUsers(1);
      }
   }, 500);

   const getUsersExport = (event, done) => {
      let result = [];
      if (listUsers && listUsers.length > 0) {
         result.push(["Id", "Email", "First Name", "Last Name"]);
         listUsers.map((item, index) => {
            let arr = [];
            arr[0] = item.id;
            arr[1] = item.email;
            arr[2] = item.first_name;
            arr[3] = item.last_name;
            result.push(arr);
         });

         setDataExport(result);
         done();
      }
   };

   const handleImport = (event) => {
      if (event.target && event.target.files && event.target.files[0]) {
         let file = event.target.files[0];

         if (file.type !== "application/vnd.ms-excel") {
            toast.error("Only import CSV file !!!");
            return;
         }

         Papa.parse(file, {
            //header: true,
            complete: function (results) {
               let rawCSV = results.data;
               if (rawCSV.length > 0) {
                  if (rawCSV[0] && rawCSV[0].length === 3) {
                     if (
                        rawCSV[0][0] !== "email" ||
                        rawCSV[0][1] !== "first_name" ||
                        rawCSV[0][2] !== "last_name"
                     ) {
                        toast.error("Wrong format header file !!!");
                     } else {
                        let result = [];

                        rawCSV.map((item, index) => {
                           if (index > 0 && item.length === 3) {
                              let obj = {};
                              obj.email = item[0];
                              obj.first_name = item[1];
                              obj.last_name = item[2];

                              result.push(obj);
                           }
                        });

                        setListUsers(result);
                     }
                  } else {
                     toast.error("Wrong format file !!!");
                  }
               } else {
                  toast.error("Not found data on file !!!");
               }
            },
         });
      }
   };

   return (
      <>
         <div className="row my-4">
            <div className="col-lg-8">
               <label htmlFor="import-file" className="btn btn-dark">
                  <i className="fa-solid fa-file-import me-1"></i> Import
               </label>
               <input
                  type="file"
                  id="import-file"
                  hidden
                  onChange={(event) => handleImport(event)}
               />

               <CSVLink
                  filename={"users.csv"}
                  data={dataExport}
                  className="btn btn-primary mx-3"
                  asyncOnClick={true}
                  onClick={getUsersExport}
               >
                  <i className="fa-solid fa-file-arrow-down me-1"></i> Export
               </CSVLink>

               <Button variant="success" onClick={handleShow}>
                  <i className="fa-solid fa-circle-plus me-1"></i> Add New
               </Button>
            </div>
            <div className="col-lg-4 mt-4 mt-lg-0">
               <input
                  type="text"
                  className="form-control"
                  placeholder="Search user by email..."
                  onChange={(event) => handleSearch(event)}
               />
            </div>
         </div>
         <Table responsive striped bordered hover className="mt-4">
            <thead>
               <tr>
                  <th className="sort-header">
                     <span>#</span>
                     <span>
                        <i
                           className="fa-solid fa-arrow-down-long"
                           onClick={() => handleSort("asc", "id")}
                        ></i>
                        <i
                           className="fa-solid fa-arrow-up-long"
                           onClick={() => handleSort("desc", "id")}
                        ></i>
                     </span>
                  </th>
                  <th>Email</th>
                  <th className="sort-header">
                     <span>First Name</span>
                     <span>
                        <i
                           className="fa-solid fa-arrow-down-long"
                           onClick={() => handleSort("asc", "id")}
                        ></i>
                        <i
                           className="fa-solid fa-arrow-up-long"
                           onClick={() => handleSort("desc", "first_name")}
                        ></i>
                     </span>
                  </th>
                  <th>Last Name</th>
                  <th>Actions</th>
               </tr>
            </thead>
            <tbody>
               {listUsers &&
                  listUsers.length > 0 &&
                  listUsers.map((item, index) => {
                     return (
                        <tr key={`user-${index}`}>
                           <td>{index + 1}</td>
                           <td>{item.email}</td>
                           <td>{item.first_name}</td>
                           <td>{item.last_name}</td>
                           <td>
                              <button
                                 className="btn btn-warning mx-2"
                                 onClick={() => handleEditUser(item)}
                              >
                                 Edit
                              </button>
                              <button
                                 onClick={() => handleDeleteUser(item)}
                                 className="btn btn-danger mx-2"
                              >
                                 Delete
                              </button>
                           </td>
                        </tr>
                     );
                  })}
            </tbody>
         </Table>

         <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={totalPages}
            previousLabel="<"
            renderOnZeroPageCount={null}
            marginPagesDisplayed={2}
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination justify-content-center"
            activeClassName="active"
         />

         <ModalAddNew
            show={showModalAddNew}
            handleClose={handleClose}
            handleUpdateTable={handleUpdateTable}
         />

         <ModalEditUser
            show={showModalEdit}
            handleClose={handleClose}
            dataUserEdit={dataUserEdit}
            handleEditUserFromModal={handleEditUserFromModal}
         />

         <ModalConfirm
            show={showModalDelete}
            handleClose={handleClose}
            dataUserDelete={dataUserDelete}
            handleDeleteUserFromModal={handleDeleteUserFromModal}
         />
      </>
   );
};
export default TableUsers;
