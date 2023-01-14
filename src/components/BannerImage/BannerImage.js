import {Button, Col} from "reactstrap";
import React, {useState} from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import imagesService from '../../services/images.service';

const BannerImage = ({image, onDeleteSuccess = () => {}, onError = () => {}}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const onDeleteHandler = () => {
        setIsModalOpen(true);
    }

    const onDelete = () => {
        setIsModalOpen(false);
        imagesService.deleteImage(image)
            .then(() => onDeleteSuccess(image))
            .catch((e) => onError(e));
    }

    return (<>
        {isModalOpen ? (<SweetAlert
            warning
            showCancel
            title="Se va a eliminar la imagen"
            confirmBtnText="Se, borrala nomas!"
            confirmBtnBsStyle="primary"
            cancelBtnBsStyle="secondary"
            onConfirm={onDelete}
            onCancel={() => setIsModalOpen(false)}
        >
            Seguro queres borrar la imagen {image.caption}?
        </SweetAlert>) : ''}
    <Col md={4} key={image.key} style={{paddingBottom: 25}}>
        <Button className="btn btn-icon btn-danger float-right" onClick={onDeleteHandler}>
            <i className="tim-icons icon-trash-simple" />
        </Button>
        <img alt={image.caption} src={image.src}/>
    </Col>
        </>);
}

export default BannerImage;
