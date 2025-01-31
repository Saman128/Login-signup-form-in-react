import React from 'react'
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import { signupschema } from './schemas';
const initialValues = {
    name: '',
    email: '',
    password: ''
};
const Signup = () => {
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues,
        validationSchema: signupschema,
        onSubmit: async (values, action) => {
            try {
                // Post data to your backend
                const response = await axios.post("http://localhost:8083/Signup", values);
                console.log("Data posted successfully:", response.data);
                // Reset the form on success
            } catch (error) {
                console.error("Error posting data:", error);
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
            <form className='form form1' onSubmit={handleSubmit}>
                <h2 className='heading'>Signup</h2>
                <label>Username</label>
                <input type='text' placeholder='enter username' autoComplete='off' name='name' value={values.name} onChange={handleChange} onBlur={handleBlur}></input><br></br>
                {errors.name && touched.name ? (<p className='error'>{errors.name}</p>) : null}
                <label>Email</label>
                <input type='email' placeholder='enter email' autoComplete='off' name='email' value={values.email} onChange={handleChange} onBlur={handleBlur}></input><br></br>
                {errors.email && touched.email ? (<p className='error'>{errors.email}</p>) : null}
                <label>Password</label>
                <input type='password' placeholder='enter password' autoComplete='off' name='password' value={values.password} onChange={handleChange} onBlur={handleBlur}></input><br></br>
                {errors.password && touched.password ? (<p className='error'>{errors.password}</p>) : null}
                <p>By creating an account, I agree to <span>Terms and <br></br>conditions</span></p>
                <button type='submit'>Signup</button>
                <p>Already have an account ? <Link to="/" className='a2 a'>Login</Link></p>
            </form>
        </div>
    )
}

export default Signup
