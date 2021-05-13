/* eslint-disable linebreak-style */
/* eslint linebreak-style: ["error","windows"] */
/* eslint "react/react-in-jsx-scope": "off" */
/* eslint "react/jsx-no-undef": "off" */
/* eslint "no-alert": "off" */
import React from 'react';

import { Card } from 'react-bootstrap';

import ProductTable from './ProductTable.jsx';
//import ProductAddNew from './ProductAddNew.jsx';
import Toast from './Toast.jsx';

export default class ProductList extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
     
      count: 0,
    };

    //this.createProduct = this.createProduct.bind(this);
    // this.deleteProduct = this.deleteProduct.bind(this);
    // this.showSuccess = this.showSuccess.bind(this);
    // this.showError = this.showError.bind(this);
    // this.dismissToast = this.dismissToast.bind(this);
  }

  componentDidMount() {
    this.loadData();
     this.countProduct();
  }

  async loadData() {
    const query = `query {
        productList {
        id product_category product_name product_price product_image
        }
    }`;

    await fetch(window.ENV.UI_API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    }).then((response) => {
      response.json().then((result) => {
        this.setState({ products: result.data.productList });
      });
    }).catch((err) => {
      alert(`Error in sending data to server: ${err.message}`);
    });
  }


async countProduct() {
    const query = `query{
        productCounts{
            count
        }
      }`;

    const response = await fetch(window.ENV.UI_API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });
    const result = await response.json();
    if (result.data.productCounts.length > 0) {
      this.setState({ count: result.data.productCounts[0].count });
    } else {
      this.setState({ count: 0 });
    }
  }


 

  

  render() {
    const { state } = this;
    const {
      count,
    } = this.state; 

    return (
      <div title="Inner Div">
        <h1 className="headerClass">My Product Inventory </h1>
        <Card>
          <Card.Header>
            <Card.Title className="headerClass">Showing
              {' '}
              {count}
              {' '}
              available products</Card.Title>
          </Card.Header>
          <hr />
        <Card.Body>
            {/* <ProductTable products={state.products} /> */}
          </Card.Body>
        </Card>
        <br />
        
       
      </div>
    );
  }
}
