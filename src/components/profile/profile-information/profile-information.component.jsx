import { useState, useRef } from 'react';
import { updateUserInfoInFirebase } from '../../../utils/firebase.utils';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserStart } from '../../../store/user-slice/user-slice';
import { Container, Content, Footer, Form, Button, Uploader,
         Message, Schema, Loader, useToaster } from 'rsuite';
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
    const selectUserSlice = useSelector(state => state.user);
    const toaster = useToaster();
    const [uploading, setUploading] = useState(false);
    const [fileInfo, setFileInfo] = useState(null);
    const { StringType } = Schema.Types;
    const formRef = useRef();
    const [formValue, setFormValue] = useState({
        firstName: selectUserSlice.currentUser?.firstName ? selectUserSlice.currentUser.firstName : '',
        lastName: selectUserSlice.currentUser?.lastName ?  selectUserSlice.currentUser.lastName : '',
        displayName: selectUserSlice.currentUser ? selectUserSlice.currentUser.displayName : '',
        email: selectUserSlice.currentUser ? selectUserSlice.currentUser.email :'',
        phoneNumber: selectUserSlice.currentUser ? selectUserSlice.currentUser.phoneNumber : '',
        photoURL: selectUserSlice.currentUser?.photoURL ? selectUserSlice.currentUser.photoURL : ''
    });

    const updateUserInfoStart = (currentUserUid) => {
            dispatch(updateUserStart({currentUserUid}))
    }

    const handleUpdateUserInfo = () => {
        if (!formRef.current.check()) {
            console.error('Form Error');
            return;
          } else {
            updateUserInfoInFirebase(formValue)
            updateUserInfoStart(selectUserSlice.currentUser.uid)
          }
    }

    const model = Schema.Model({
        displayName: StringType().isRequired('This field is required.'),
        email: StringType()
            .isEmail('Please enter a valid email address.')
            .isRequired('This field is required.'),
        });

        return (
            <Container>
                <Content className='flex justify-center mt-10'>
                { formValue && !selectUserSlice.isLoading ?
                    <Form
                    ref={formRef}
                    onChange={setFormValue}
                    formValue={formValue}
                    model={model}>
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

                    :

                    <Loader size="lg" />
                }
                </Content>
                <Footer>Footer</Footer>
            </Container>
        );
};

export default ProfileInformation