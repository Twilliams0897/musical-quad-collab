import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SyntheticEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import { useHistory } from 'react-router-dom';
import userService from './user.service';
import { getUser, updateUser} from '../store/actions';
import { GrubState } from '../store/store';
import { useNavigation } from '@react-navigation/native';
import { User } from "./user";


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
  });
  
  // export const addEmp = () => {
  //   return (
  //     <View style={styles.container}>
  //       <Text>Open up App.tsx to start working on your app!</Text>
  //     </View>
  //   );
  // };
  
  
  function AddEmpComponent() {
    const selectUser = (state: GrubState) => state.user;
    const user = useSelector(selectUser);
    const 
   // const [user] = useState(new User());
    const dispatch = useDispatch();
    const nav = useNavigation();

  
    // useEffect(() => {
    //     let u: any = { ...user}
  
    //     console.log(u);
        
    //     u.userId = null;
    //     u.username = null;
    //     u.password = null;
    //     u.role = null;
    //     u.credits = null;
    //     u.playlist = null;
    //     u.favorites = null;
    //     console.log('Add User' + JSON.stringify(u));
    //     dispatch(getUser(u));
    //     console.log(u);
    //     //dispatch(updateUser(u));
    // }, []);
  
    //Need to create a function to randomly generate an employee id (how long? 6 characters/numbers?)
    //Take out ID input for new user
    //check your function for adding a new claim from p1
    function handleFormInput(e: SyntheticEvent) {
        //let u: any = { ...user };
        switch ((e.target as HTMLInputElement).name) {
            case 'userId':
                u.userId = ((e.target as HTMLInputElement).value);
                break;
            case 'username':
                u.username = (e.target as HTMLInputElement).value;
                break;
            case 'password':
                u.password = (e.target as HTMLInputElement).value;
                break;
            case 'role':
                u.role = (e.target as HTMLInputElement).value;
                break;
            case 'credits':
                u.credits = Number((e.target as HTMLInputElement).value);
                break;
            case 'playlist':
                u.playlist = (e.target as HTMLInputElement).value;
                break;
            case 'favorites':
                u.favorites = (e.target as HTMLInputElement).value;
                break;
        }
        dispatch(updateUser(u));
    }
  
    function submitForm() {
        let u = { ...user };
        userService.addUser(u).then(() => {
            dispatch(updateUser(user));
            nav.navigate('SongDetails');
        });
    }
  
    function cancel() {
        nav.navigate('SongDetails');
    }
  
    return (
        <div className='formContainer'>
            <p className='form'>
                User ID: <input type='text' className='form-control' onChange={handleFormInput} name='userId' />
                <br />
                Username: <input type='text' className='form-control' onChange={handleFormInput} name='username'/>
                <br />
                Password: <input type='text' className='form-control' onChange={handleFormInput} name='password' />
                <br />
                Role: <input type='text' className='form-control' onChange={handleFormInput} name='role' />
                <br />
                Credits: <input type='text' className='form-control' onChange={handleFormInput} name='credits' />
                <br />
                Playlist: <input type='text' className='form-control' onChange={handleFormInput} name='playlist' />
                <br />
                Favorites: <input type='text' className='form-control' onChange={handleFormInput} name='favorites' />
                <br />
                <button className='formButton' onClick={submitForm}>Add New User</button>
                <button onClick={cancel}>Cancel</button>
            </p>
        </div>
    )
  }
  
  export default AddEmpComponent;
