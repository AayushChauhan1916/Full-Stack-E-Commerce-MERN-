import { useState } from "react";
import "./css/loginsignup.css";
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

const LoginSignUp = () => {
  const [state, setState] = useState("Login");const {
    register,
    handleSubmit,
    formState: {errors,isSubmitting},
  } = useForm()

  

  const onSubmit = async (data) => {
    try {
      const url = state === 'Login' ? "http://localhost:8080/api/login" : "http://localhost:8080/api/signup";
      const response = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (responseData.success) {
        toast.success(state === 'Login' ? "Login Successfully" : "Welcome To Shopify");
        setTimeout(() => {
          window.location.replace("/");
        }, 500);
      } else {
        toast.error(responseData.error); 
      }
    } catch (error) {
      console.error("Error occurred: ", error);
    }
  };

  const toggleState = () => {
    setState(state === 'Login' ? 'SignUp' : 'Login');
  };

  return (
    <div>
    {/* {isSubmitting && toast.info("loading.....")} */}
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="loginsignup-fields">
            <input
             {...register("username", { required: true })}
              type="text"
              placeholder="Username"
            />
            {errors.username && <span className="red">Username is required</span>}
            {state === "SignUp" && (
              <>
                <input
                  {...register("email", { required: true })}
                  type="email"
                  placeholder="Email address"
                />
                {errors.email && <span className="red">Email is required</span>}
              </>
            )}
            <input
              {...register("password", { required: true })}
              type="password"
              placeholder="Password"
            />
            {errors.password && <span className="red">Password is required</span>}
          </div>
          <button disabled={isSubmitting} type="submit">Continue</button>
        </form>
        <p className="loginsignup-login">
          {state === 'Login' ? "Create an account? " : "Already have an account? "}
          <span
            className="Login"
            onClick={toggleState}
          >
            {state === 'Login' ? "Click Here" : "Login Here"}
          </span>
        </p>
      </div>
    </div>
    </div>
  );
};



export default LoginSignUp;
