import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
const ConfirmModal = ({data, isOpen, mdTitle, mdBody, toggleFn, okFn}) => {
    return(
        <div>
            <Modal isOpen={isOpen} toggle={toggleFn} wrapClassName='tienhai' backdrop='static'>
                <ModalHeader toggle={toggleFn}>{mdTitle}</ModalHeader>
                <ModalBody>{mdBody}</ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={(e)=>{
                        !!toggleFn&&toggleFn();
                        !!okFn&&okFn(data);
                    }}>OK</Button>{' '}
                    <Button color="secondary" onClick={toggleFn}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}
export default ConfirmModal;