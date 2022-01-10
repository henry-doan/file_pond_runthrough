import { Card } from 'react-bootstrap';
import { AuthConsumer } from '../../providers/AuthProvider';
import Moment from 'react-moment';

const Profile = ({ id, fname, lname, age, email, created_at, image }) => {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title>User # {id} {fname} {lname}</Card.Title>
        <Card.Text>
          Age: {age}
          <br />
          Email: {email}
          <br />
          Date Joined: {' '}
          <Moment format="MM/DD/YY">
            {created_at}
          </Moment>
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

const ConnectedProfile = (props) => (
  <AuthConsumer>
    { value => <Profile {...props} {...value.user} />}
  </AuthConsumer>
)

export default ConnectedProfile;