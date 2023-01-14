/*!

=========================================================
* Black Dashboard React v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, {useEffect, useState, useCallback} from "react";
import {useDropzone} from 'react-dropzone'
import NotificationAlert from "react-notification-alert";
import _ from 'lodash';
import imagesService from '../services/images.service';

// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    Row,
    Col, Button
} from "reactstrap";
import BannerImage from "../components/BannerImage/BannerImage";

import uploadLogo from '../assets/img/image_placeholder.jpg';

const Banners = () => {
  const notificationAlertRef = React.useRef(null);
  const [images, setImages] = useState([]);

    const onDrop = useCallback(acceptedFiles => {
        acceptedFiles.forEach((file) => {
            imagesService.uploadImage(file)
                .then((image) => {
                    showSuccessAlert('Joya!! la imagen se guardó correctamente!');
                    findImages();
                })
                .catch(showDefaultErrorMessage);
        })
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})


    useEffect(() => findImages(), []);

    const findImages = () => {
        imagesService.getImages().then(urls => setImages(urls));
    }

    const showAlert = (message, type = 'info', icon = '', place = 'tc') => {
        const options = {
            place: place,
            message: (
                <div>
                    <div>
                        {message}
                    </div>
                </div>
            ),
            type: type,
            icon: `tim-icons ${icon}`,
            autoDismiss: 7,
        };
        notificationAlertRef.current.notificationAlert(options);
    }

    const showErrorAlert = (message, place = 'tc') => {
        showAlert(message, 'danger', 'icon-alert-circle-exc');
    }

    const showSuccessAlert = (message, place = 'tc') => {
        showAlert(message, 'success', 'icon-check-2');
    }

    const showDefaultErrorMessage = () => {
        showErrorAlert('Ops! 😅 Algo salió mal, volvé a intentarlo cuando alguien lo arregle!')
    }

  const onDeleteHandler = (image) => {
    showSuccessAlert( `La imagen ${image.caption} se borró correctamente!`);
    setImages(_.difference(images, [image]));
  }

  const imageViews = _.map(images, image => <BannerImage key={image.key} image={image}
                                                         onDeleteSuccess={onDeleteHandler}
                                                         onError={showDefaultErrorMessage}

  />);

  return (
    <div className="content">
      <div className="react-notification-alert-container">
        <NotificationAlert ref={notificationAlertRef} />
      </div>
        <Row>
            <Col md="12">
                <div className="fileinput text-center" {...getRootProps()} style={{marginBottom: 15}}>
                    <input {...getInputProps()} />
                    {
                        <>
                            <div className="thumbnail">
                                <img src={uploadLogo} width={200} height={150}/>
                            </div>
                            <Button className="btn btn-primary">Seleccionar imagen</Button>
                        </>
                    }
                </div>
            </Col>
        </Row>
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              <h5 className="title">Banners de la aplicación</h5>
            </CardHeader>
            <CardBody className="all-icons">
                <Row>
                    {imageViews}
                </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Banners;
