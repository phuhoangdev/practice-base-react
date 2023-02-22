import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { createNewUser } from "../services/UserService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ModalAddNew = (props) => {
   const { show, handleClose, handleUpdateTable } = props;
   const [name, setName] = useState("");
   const [job, setJob] = useState("");

   const handleCreateUser = async () => {
      let res = await createNewUser(name, job);

      if (res && res.id) {
         handleClose();
         setName("");
         setJob("");

         toast.success("Create user successfully!!!");
         handleUpdateTable({ first_name: name });
      } else {
         toast.error("An error!!!");
      }
   };

   return (
      <>
         <Modal backdrop="static" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
               <Modal.Title>Add New User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <div className="form-add-new">
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
               <Button variant="primary" onClick={handleCreateUser}>
                  Save Changes
               </Button>
            </Modal.Footer>
         </Modal>
      </>
   );
};
export default ModalAddNew;
