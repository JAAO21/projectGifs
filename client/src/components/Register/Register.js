import { Button } from "antd";
import { Formik, Form, Field, ErrorMessage } from "formik";

import useUser from "../../context/useUser";

import "./main.css";

const validateFiedls = (values) => {
  console.log(values);
  const errors = {};
  if (!values.username) {
    errors.username = "Required username";
  }
  return errors;
};

const initialValues = {
  username: "",
  password: "",
  email: "",
  name: "",
  lastName: "",
  identificationType: "",
  identificationNumber: 0,
  age: 0,
  gender: "",
  birthDay: "",
};
const Register = () => {
  const { register } = useUser();
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validate={validateFiedls}
        onSubmit={(values, { setSubmitting, setErrors }) => {
          setSubmitting(false);
          setErrors();
          register(values);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="containerRegister">
              <h2>Register</h2>
              <Field name="username" placeholder="Type your username" />
              <ErrorMessage name="username" component="div" />

              <Field
                type="password"
                name="password"
                placeholder="Type your password"
              />
              <ErrorMessage name="password" component="div" />
              <Button
                htmlType="submit"
                disabled={isSubmitting}
                className="btn-register"
              >
                Send
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
