import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { updateUser } from "../services/UserService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ModalEditUser = (props) => {
   const { show, handleClose, dataUserEdit, handleEditUserFromModal } = props;
   const [name, setName] = useState("");
   const [job, setJob] = useState("");

   const handleEditUser = async () => {
      let res = await updateUser(dataUserEdit.id, name, job);

      if (res && res.updatedAt) {
         handleClose();
         setName("");
         setJob("");

         toast.success("Update user successfully!!!");
         handleEditUserFromModal({
            first_name: name,
            id: dataUserEdit.id,
         });
      } else {
         toast.error("An error!!!");
      }
   };

   useEffect(() => {
      if (show) {
         setName(dataUserEdit.first_name);
      }
   }, [dataUserEdit]);

   return (
      <>
         <Modal backdrop="static" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
               <Modal.Title>Edit User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <div className="form-edit-user">
                  <form>
                     <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input
                           value={name}
                           type="text"
                           className="form-control"
                           onChange={(event) => setName(event.target.value)}
                        />
                     </div>
                     <div className="mb-3">
                        <label className="form-label">Job</label>
                        <input
                           value={job}
                           type="text"
                           className="form-control"
                           onChange={(event) => setJob(event.target.value)}
                        />
                     </div>
                  </form>
               </div>
            </Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={handleClose}>
                  Close
               </Button>
               <Button variant="primary" onClick={handleEditUser}>
                  Save Changes
               </Button>
            </Modal.Footer>
         </Modal>
      </>
   );
};
export default ModalEditUser;
