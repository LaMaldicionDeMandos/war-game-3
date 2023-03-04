import {Card} from "reactstrap";

const InfoWindow = ({children}) => {
  const infoWindowStyle = {
    position: 'relative',
    bottom: 90,
    left: '-0px',
    width: 150,
    backgroundColor: 'white',
    boxShadow: '0 2px 7px 1px rgba(0, 0, 0, 0.3)',
    padding: 10,
    fontSize: 14,
    zIndex: 100,
  };

  return (
    <Card style={infoWindowStyle}>
      {children}
    </Card>
  );
};

export default InfoWindow;
