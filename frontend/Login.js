import React from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import { loginschema } from './schemas';
const initialValues = {
    email: '',
    password: '',
};
const Login = () => {
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues,
        validationSchema: loginschema,
        onSubmit: async (values, action) => {
            try {
                const response = await axios.post("http://localhost:8083/login", values);
                alert(response.data.message);
                console.log("Login successful:", response.data.user);
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    alert("Invalid email or password");
                } else {
                    alert("Something went wrong. Please try again.");
                }
            }
            console.log(
                values
            );
            action.resetForm();
        },
    });
    console.log(
        errors
    );
    return (
        <div className='background'>
            <form className='form' onSubmit={handleSubmit}>
                <h2 className='heading'>Login</h2>
                <label>Email</label>
                <input type='email' placeholder='enter email' autoComplete='off' name='email' value={values.email} onChange={handleChange} onBlur={handleBlur}></input><br></br>
                {errors.email && touched.email ? (<p className='error'>{errors.email}</p>) : null}
                <label>Password</label>
                <input type='password' placeholder='enter password' autoComplete='off' name='password' value={values.password} onChange={handleChange} onBlur={handleBlur}></input><br></br>
                {errors.password && touched.password ? (<p className='error'>{errors.password}</p>) : null}
                <Link to="" className='a1 a'>Forget Passwod ?</Link>
                <br></br>
                <button type='submit'>Login</button>
                <p>Don't have an account ? <Link to="/Signup" className='a2 a'>Signup</Link></p>
            </form>
        </div>
    )
}

export default Login
