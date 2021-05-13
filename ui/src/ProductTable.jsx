/* eslint "react/prefer-stateless-function": "off" */
import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  Table,
  Tooltip,
  Button,
  Glyphicon,
  OverlayTrigger,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';



const viewTooltip = (
  <Tooltip id="view-tooltip" placement="top">View Product Image</Tooltip>
);

const ProductRow = withRouter(({ product}) => (
  <tr>
    <td>{product.product_name}</td>
    <td>
      $
      {product.product_price}
    </td>
    <td>{product.product_category}</td>
    <td>
      {/* <Link to={`/image/${product.id}`}>View</Link> */}
      <LinkContainer to={`/image/${product.id}`}>
        <OverlayTrigger delayShow={1000} overlay={viewTooltip}>
          <Button bsstyle="primary">
            <Glyphicon glyph="eye-open" />
          </Button>
        </OverlayTrigger>
      </LinkContainer>
    </td>
    
  </tr>
));

export default function ProductTable({ products }) {
  // eslint-disable-next-line max-len
  const productRows = products.map(product => <ProductRow key={product.id} product={product}  />);

  return (
    <div>
      <Table bordered hover responsive>
        <thead>
          <th>Product Name</th>
          <th>Price</th>
          <th>Category</th>
          <th>Image</th>
        
        </thead>
        <tbody>
          {productRows}
        </tbody>
      </Table>
    </div>
  );
}
