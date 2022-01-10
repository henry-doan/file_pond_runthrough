import { useState, useEffect } from 'react';
import { AuthConsumer } from '../../providers/AuthProvider';
import { Form, Row, Col, Image, Container, Button } from 'react-bootstrap';
// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const defaultImage = 'https://d30y9cdsu7xlg0.cloudfront.net/png/15724-200.png';

const Profile = ({ user, updateUser }) => {
  const [editing, setEditing] = useState(false)
  const [file, setFile] = useState()
  const [formVals, setFormValue] = useState({ name: '', email: '', image: null })

  useEffect( () => {
    const { name, email, image } = user
    setFormValue({ name, email, image })
  }, [])
  
  const profileView = () => {
    return (
      <>
        <Col md="4">
          <Image src={formVals.image || defaultImage} />
        </Col>
        <Col md="8">
          <h1>{formVals.name}</h1>
          <h1>{formVals.email}</h1>
        </Col>
      </>
    )
  }

  const handleFileUpdate = (fileItems) => {
    if (fileItems.length !== 0) {
      setFile(fileItems)
      setFormValue({ ...formVals, image: fileItems[0].file });
    }
  };

  const handleFileRemoved = (e, file) => {
    setFile(null)
    setFormValue({ ...formVals, image: null });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(user.id, formVals);
    setEditing(false)
    setFormValue({ ...formVals, image: null })
  }
  
  const editView = () => {
    return (
      <Form onSubmit={handleSubmit}>
        <Col md="4">
          <FilePond
            files={file}
            onupdatefiles={handleFileUpdate}
            onremovefile={handleFileRemoved}
            allowMultiple={false}
            name="image"
            labelIdle='Drag and Drop your files or <span class="filepond--label-action">Browse</span>'
          />
        </Col>
        <Col md="8">
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control 
              type="text" 
              name="name"
              value={formVals.name}
              required
              onChange={(e) => setFormValue({...formVals, name: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control 
              type="email" 
              name="email"
              value={formVals.email}
              required
              onChange={(e) => setFormValue({...formVals, email: e.target.value })}
            />
          </Form.Group>
          <Button type="submit">Update</Button>
        </Col>
      </Form>
    )
  }
  
  return (
    <Container>
      <hr />
      <Row>
        { editing ? editView() : profileView()}
        <Col>
          <Button onClick={() => setEditing(!editing)}>{editing ? 'Cancel' : 'Edit'}</Button>
        </Col>
      </Row>
    </Container>
  )
}

const ConnectedProfile = (props) => (
  <AuthConsumer>
    { auth => <Profile { ...props } { ...auth } /> }
  </AuthConsumer>
)

export default ConnectedProfile;