import { useSelector } from 'react-redux';

function EditProfile() {
    const lastName = useSelector(state => state.userReducer.lastName);
    console.log(`id : ${lastName}`)

    return (<></>)
}

export default EditProfile;