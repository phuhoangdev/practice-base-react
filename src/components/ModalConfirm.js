import { Modal, Button } from "react-bootstrap";
import { deleteUser } from "../services/UserService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ModalConfirm = (props) => {
   const { show, handleClose, dataUserDelete, handleDeleteUserFromModal } =
      props;
   const confirmDelete = async () => {
      let res = await deleteUser(dataUserDelete.id);

      if (res && +res.statusCode === 204) {
         handleClose();
         toast.success("Delete user successfully!!!");
         handleDeleteUserFromModal(dataUserDelete);
      } else {
         toast.error("An Error!!!");
      }
   };

   return (
      <>
         <Modal backdrop="static" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
               <Modal.Title>Delete a user</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <div className="form-add-new">
                  Are you sure to delete this user, email ={" "}
                  {dataUserDelete.email}?
               </div>
            </Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={handleClose}>
                  Close
               </Button>
               <Button variant="primary" onClick={confirmDelete}>
                  Confirm
               </Button>
            </Modal.Footer>
         </Modal>
      </>
   );
};
export default ModalConfirm;
