import React, {useState, useCallback, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginRequestAction } from "../../store/actions/User";
import { Redirect } from'react-router-dom';
import "./Login.scss";
import { meRequestAction } from '../../store/actions/Auth';

const Login = () => {

    const dispatch = useDispatch();
    const me = useSelector( state => state.meReducer.meInfo);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onChangeUsername = useCallback( (e) =>{
        setUsername(e.target.value);
    });
    const onChangePassword = useCallback((e)=>{
        setPassword(e.target.value);
    });
    const onSubmit = useCallback(( e )=> {
        e.preventDefault();
        dispatch(loginRequestAction({username,password}));
    },[username, password]);

    useEffect(()=>{
        dispatch(meRequestAction());
    } ,[]);
    
    return(
        <div className="login">
            <div className="in"> 
                {me && <Redirect to='/'></Redirect>}
                <form onSubmit={onSubmit}>
                    <div className="form">
                        <div className="text">Username</div>
                        <input className="loginInput" type="email" value={username} onChange={onChangeUsername}/>
                    </div>
                    <div className="form">
                        <div className="text">Password</div>
                        <input className="loginInput" type="password" value={password} onChange={onChangePassword}/>
                    </div>
                    <br/>
                    <button className="loginButton">Login!</button>
                </form>
            </div>
        </div>
    );
}

export default Login;