import { useState, useRef } from 'react';
import { updateUserInfoInFirebase } from '../../../utils/firebase.utils';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserStart } from '../../../store/user-slice/user-slice';
import { Container, Content, Footer, Form, Button, Uploader, Message, Loader, useToaster } from 'rsuite';
import AvatarIcon from '@rsuite/icons/legacy/Avatar';

function previewFile(file, callback) {
    const reader = new FileReader();
    reader.onloadend = () => {
      callback(reader.result);
    };
    reader.readAsDataURL(file);
  }

const ProfileInformation = () => {
    const dispatch = useDispatch()
    const selectCurrentUser = useSelector(state => state.user.currentUser);
    const toaster = useToaster();
    const [uploading, setUploading] = useState(false);
    const [fileInfo, setFileInfo] = useState(null);
    const formRef = useRef();
    const [formValue, setFormValue] = useState({
        firstName: selectCurrentUser ? selectCurrentUser.firstName : '',
        lastName: selectCurrentUser ? selectCurrentUser.lastName : '',
        displayName: selectCurrentUser ? selectCurrentUser.displayName : '',
        email: selectCurrentUser ? selectCurrentUser.email :'',
        phoneNumber: selectCurrentUser ? selectCurrentUser.phoneNumber : '',
        photoURL: selectCurrentUser ? selectCurrentUser.photoURL : ''
    });

    const updateUserInfoStart = (currentUserUid) => {
            dispatch(updateUserStart({currentUserUid}))
    }

    function handleUpdateUserInfo() {
        if (!formRef.current.check()) {
            console.error('Form Error');
            return;
          } else {
            updateUserInfoInFirebase(formValue)
            updateUserInfoStart(selectCurrentUser.uid)
            alert('Your Information has been updated')
          }
    }

        return (
            <Container>
                <Content className='flex justify-center mt-10'>
                { formValue && 
                    <Form
                    ref={formRef}
                    onChange={setFormValue}
                    formValue={formValue}>
                        <Form.Group controlId="firstName">
                            <Form.ControlLabel>First Name</Form.ControlLabel>
                            <Form.Control name="firstName" />
                        </Form.Group>        
                            <Form.Group controlId="lastName">
                            <Form.ControlLabel>Last Name</Form.ControlLabel>
                            <Form.Control name="lastName" />
                        </Form.Group>
                        <Form.Group controlId="displayName">
                            <Form.ControlLabel>Display Name</Form.ControlLabel>
                            <Form.Control name="displayName" />
                            <Form.HelpText tooltip>Display Name is required</Form.HelpText>
                        </Form.Group>
                        <Form.Group controlId="email">
                            <Form.ControlLabel>Email</Form.ControlLabel>
                            <Form.Control name="email" type="email" />
                            <Form.HelpText tooltip>Email is required</Form.HelpText>
                        </Form.Group>
                        <Form.Group controlId="phoneNumber">
                            <Form.ControlLabel>Phone Number</Form.ControlLabel>
                            <Form.Control name="phoneNumber" />
                        </Form.Group>
                        <Form.Group controlId="photoURL">
                            <Form.ControlLabel>Photo URL</Form.ControlLabel>
                            <Uploader
                            fileListVisible={false}
                            listType="picture"
                            action="//jsonplaceholder.typicode.com/posts/"
                            onUpload={file => {
                                setUploading(true);
                                previewFile(file.blobFile, value => {
                                setFileInfo(value);
                                });
                            }}
                            onSuccess={(response, file) => {
                                setUploading(false);
                                toaster.push(<Message type="success">Uploaded successfully</Message>);
                                console.log(response);
                            }}
                            onError={() => {
                                setFileInfo(null);
                                setUploading(false);
                                toaster.push(<Message type="error">Upload failed</Message>);
                            }}
                            >
                            <button style={{ width: 150, height: 150 }}>
                                {uploading && <Loader backdrop center />}
                                {fileInfo ? (
                                <img src={fileInfo} width="100%" height="100%" alt="file info"/>
                                ) : (
                                <AvatarIcon style={{ fontSize: 80 }} />
                                )}
                            </button>
                            </Uploader>
                        </Form.Group>
                        <Button appearance="primary" onClick={handleUpdateUserInfo}>Save</Button>
                        <Button appearance="default">Edit</Button>
                    </Form>
                }
                </Content>
                <Footer>Footer</Footer>
            </Container>
        );
};

export default ProfileInformation