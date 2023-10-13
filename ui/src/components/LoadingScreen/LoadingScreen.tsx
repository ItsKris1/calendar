import { Card, CardBody } from "reactstrap";

import "./styles.css";

export const LoadingSpinner = () => {
  return (
    <Card className="align-items-center wrapper">
      <CardBody className="spinner-container">
        <div className="loading-spinner"></div>
      </CardBody>
    </Card>
  );
};
