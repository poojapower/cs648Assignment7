/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
/* eslint-disable import/order */
/* eslint-disable lines-between-class-members */
/* eslint-disable camelcase */
import React from 'react';
import NumberInput from './NumberInput.jsx';
import {
  Button, Form,
  FormGroup, FormLabel, Card,
} from 'react-bootstrap';
import Toast from './Toast.jsx';
import TextInput from './TextInput.jsx';

export default class ProductEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      product: [],
      toastVisible: false,
      toastMessage: ' ',
      toastType: 'success',
     };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showSuccess = this.showSuccess.bind(this);
    this.showError = this.showError.bind(this);
    this.dismissToast = this.dismissToast.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    const { match: { params: { id: prevId } } } = prevProps;
    const { match: { params: { id } } } = this.props;
    if (id !== prevId) {
      this.loadData();
    }
  }

  onChange(event, naturalValue) {
    const { name, value: textValue } = event.target;
    const value = naturalValue === undefined ? textValue : naturalValue;
    this.setState(prevState => ({
      product: { ...prevState.product, [name]: value },
    }));
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { product } = this.state;
    const { id, ...changes } = product;
    const variables = { id, changes };
    const query = `mutation productUpdate($id: Int!, $changes: productUpdateInputs!) {  
      productUpdate(id: $id, changes: $changes) {    
        id product_name product_price product_image product_category
      } 
    }`;
    await fetch(window.ENV.UI_API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables }),
    });
    this.showSuccess('Product updated Successfully!!');
    this.loadData();
  }

  async loadData() {
    const { match: { params: { id } } } = this.props;
    const query = `query product($id: Int!){
      product (id: $id) {
        id product_name product_price product_image product_category
      }
    }`;
    const variables = { id };
    const response = await fetch(window.ENV.UI_API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables }),
    });
    const result = await response.json();
    this.setState({ product: result.data.product });
  }
  showSuccess(message) {
    this.setState({
      toastVisible: true, toastMessage: message, toastType: 'success',
    });
  }

  showError(message) {
    this.setState({
      toastVisible: true, toastMessage: message, toastType: 'danger',
    });
  }

  dismissToast() {
    this.setState({ toastVisible: false });
  }


  render() {
    const { product: { id } } = this.state;
    const { match: { params: { id: propsId } } } = this.props;
    const { toastVisible, toastMessage, toastType } = this.state;

    if (id == null) {
      if (propsId != null) {
        return <h3>{`Product with ID ${propsId} not found.`}</h3>;
      }
      return null;
    }
    const { product: { product_name, product_price } } = this.state;
    const { product: { product_image, product_category } } = this.state;
    return (
       <Card>
        <Card.Header>
          <Card.Title>{`Editing product: ${id}`}</Card.Title>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
                  <FormLabel htmlFor="product">
                    Product
                  </FormLabel>
      
                <TextInput name="product_name" value={product_name} onChange={this.onChange} key={id} />
               </FormGroup>

            <FormGroup>
              <FormLabel htmlFor="price">
                Price Per Unit
              </FormLabel>
                <NumberInput name="product_price" value={product_price} onChange={this.onChange} key={id} />
               </FormGroup>

            <FormGroup>
              <FormLabel htmlFor="image">
                Image
              </FormLabel>
                <TextInput name="product_image" value={product_image} onChange={this.onChange} key={id} />
               </FormGroup>

            <FormGroup>
              <FormLabel htmlFor="category">
                Category
              </FormLabel>
                  <select name="product_category" value={product_category} onChange={this.onChange}>
                  <option value="Shirt">Shirts</option>
                  <option value="Jeans">Jeans</option>
                  <option value="Jacket">Jackets</option>
                  <option value="Sweater">Sweaters</option>
                  <option value="Accessories">Accessories</option>
                </select>
              </FormGroup>

            <Button bsstyle="primary" type="submit">Submit</Button>
          </Form>
        </Card.Body>
        <Toast
          showing={toastVisible}
          // onDismiss={this.dismissToast}
          bsstyle={toastType}
        >
          {toastMessage}
        </Toast>
      </Card>
     );
  }
}
