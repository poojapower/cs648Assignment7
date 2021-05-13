/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable space-before-blocks */
/* eslint-disable no-extra-semi */
/* eslint-disable lines-between-class-members */
/* eslint-disable indent */
/* eslint-disable import/newline-after-import */
/* eslint-disable no-multi-spaces */
/* eslint-disable react/jsx-props-no-multi-spaces */
/* eslint-disable react/jsx-indent */
/* eslint "react/prefer-stateless-function": "off" */
import React from 'react';
import {
  Button,
  FormGroup,
  FormLabel,
  Form,
  Modal,
} from 'react-bootstrap';
import Toast from './Toast.jsx';
export default class ProductAddNew extends React.Component {
  constructor() {
    super();
      this.state = {
      toastVisible: false,
      toastMessage: ' ',
      toastType: 'success',
      showAddProductModal: false,
    };
    this.handleModalShow = this.handleModalShow.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showSuccess = this.showSuccess.bind(this);
    this.showError = this.showError.bind(this);
    this.dismissToast = this.dismissToast.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const addForm = document.forms.addNewProductForm;
    const productPrice = addForm.prodPrice.value;
    const product = {
      product_name: addForm.prodName.value,
      product_price: parseFloat(productPrice.substring(1, productPrice.length)),
      product_category: addForm.prodCategory.value,
      product_image: addForm.prodImage.value,
    };
    const { props } = this;
    props.createProduct(product);
    this.showSuccess('Product Added Successfully');
    this.handleModalClose();
    addForm.prodName.value = '';
    addForm.prodPrice.value = '$';
    addForm.prodImage.value = '';
    };
    showSuccess(message){
    this.setState({
      toastVisible: true,
      toastMessage: message,
      toastType: 'success',
    });
  }

  showError(message) {
    this.setState({
      toastVisible: true,
      toastMessage: message,
      toastType: 'danger',
    });
  }

  dismissToast() {
    this.setState({ toastVisible: false });
  }


  handleModalClose() {
    this.setState({ showAddProductModal: false });
  }

  handleModalShow() {
    this.setState({ showAddProductModal: true });
  }
  

  render() {
     const {
      toastVisible,
      toastMessage,
      toastType,
      showAddProductModal,
    } = this.state;

    return (
      <div>
      <Button variant="primary" onClick={this.handleModalShow}>
          Add a Product
        </Button>

        <Modal show={showAddProductModal} onHide={this.handleModalClose}>

          <Modal.Header closeButton>
            <Modal.Title>Add a new product</Modal.Title>
          </Modal.Header>

          <Form name="addNewProductForm" onSubmit={this.handleSubmit}>
           <Modal.Body>
              <FormGroup>
                <FormLabel className="addForm"  htmlFor="prodCategory">
                Product Category
                </FormLabel>
              <select name="prodCategory">
                <option>Shirts</option>
                <option>Jeans</option>
                <option>Jackets</option>
                <option>Sweaters</option>
                <option>Accessories</option>
              </select>
              </FormGroup>

              <FormGroup>
                <FormLabel className="addForm cl-2" htmlFor="prodPrice">
                  Product Price
                </FormLabel>
                <input defaultValue="$" type="text" name="prodPrice" />
              </FormGroup>

              <FormGroup>
                <FormLabel className="addForm" htmlFor="prodName">
                  Product Name
                </FormLabel>
                <input type="text" name="prodName" placeholder="Product Name" />
              </FormGroup>

              <FormGroup>
                <FormLabel className="addForm" htmlFor="prodImage">
                  Product Image URL
                </FormLabel>
                <input type="text" name="prodImage" placeholder="Product Image" />
              </FormGroup>

              <br />
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleModalClose}>
                Close
              </Button>
              <Button bsstyle="primary" type="submit">Add Product</Button>
            </Modal.Footer>

          </Form>
        </Modal>
        <Toast
          showing={toastVisible}
          // onDismiss={this.dismissToast}
          bsstyle={toastType}
        >
          {toastMessage}
        </Toast>
      </div>
    );
  }
}
