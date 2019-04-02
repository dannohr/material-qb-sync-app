import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

export default class UserForm extends React.Component {
  handleSubmit = (values, { props = this.props, setSubmitting }) => {
    // console.log(values);
    alert("Form Submitted");
    setSubmitting(false);
    return;
  };

  render() {
    // console.log(this.props);
    const { customer } = this.props;
    return (
      <div>
        <p>{customer.CustomerName}</p>
        <Formik
          enableReinitialize={true}
          initialValues={{
            CustomerName: customer.CustomerName,
            dbId: customer.id,
            email_address: "",
            gender: ""
          }}
          validate={values => {
            let errors = [];

            if (!values.email) errors.email = "Email Address Required";

            //check if my values have errors
            return errors;
          }}
          onSubmit={this.handleSubmit}
          render={formProps => {
            // console.log(formProps);
            return (
              <Form>
                <Field
                  type="text"
                  name="CustomerName"
                  placeholder="First Name"
                />
                <ErrorMessage name="CustomerName" />

                <Field type="number" name="dbId" />

                {/* <Field type="text" name="dbId" placeholder="database id" />
                <ErrorMessage name="dbId" /> */}

                <button type="submit" disabled={formProps.isSubmitting}>
                  Submit Form
                </button>
              </Form>
            );
          }}
        />
      </div>
    );
  }
}

// import React from "react";
// import * as Yup from "yup";
// import { withFormik, Form, Field, ErrorMessage } from "formik";
// // import { Debug } from "./Debug";

// const formikEnhancer = withFormik({
//   mapPropsToValues: props => ({
//     email: props.user.email,
//     CustomerName: props.customer.CustomerName,
//     name: props.name,
//     something: "some random text"
//   }),
//   validationSchema: Yup.object().shape({
//     email: Yup.string()
//       .email("Invalid email address")
//       .required("Email is required!")
//   }),
//   handleSubmit: (values, { setSubmitting }) => {
//     setTimeout(() => {
//       alert(JSON.stringify(values, null, 2));
//       setSubmitting(false);
//     }, 1000);
//   },
//   displayName: "MyForm", // helps with React DevTools

// });

// const UserForm = props => {
//   const {
//     values,
//     touched,
//     errors,
//     dirty,
//     isSubmitting,
//     handleChange,
//     handleBlur,
//     handleSubmit,
//     handleReset
//   } = props;
//   console.log(props);

//   return (
//     <Form>
//       <label htmlFor="email">Email</label>
//       <Field name="email" placeholder="jane@acme.com" type="email" />
//       <div>
//         <ErrorMessage name="email" />
//       </div>
//       <label htmlFor="CustomerName">CustomerName</label>
//       <Field name="CustomerName" placeholder="John Doe" />
//       <label htmlFor="somrthing">Random Text</label>
//       <Field name="something" placeholder="" />
//       <button
//         type="button"
//         className="outline"
//         onClick={handleReset}
//         disabled={!dirty || isSubmitting}
//       >
//         Reset
//       </button>
//       <button type="submit" disabled={isSubmitting}>
//         Submit
//       </button>

//       {/* <Debug /> */}
//     </Form>
//   );
// };

// export default formikEnhancer(UserForm);
