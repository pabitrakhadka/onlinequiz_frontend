import * as Yup from "yup";

// First Name Validation Schema
const FirstNameValidate = () =>
    Yup.string()
        .min(3, "Too Short!")
        .max(20, "Too Long!")
        .required("Required").matches(/^[A-Za-z]+$/, "Must be only alphabetic characters")

// Last Name Validation Schema
const LastNameValidate = () =>
    Yup.string()
        .min(3, "Too Short!")
        .max(20, "Too Long!")
        .required("Required").matches(/^[A-Za-z]+$/, "Must be only alphabetic characters")

// Email Validation Schema
const EmailValidate = () =>
    Yup.string()
        .email('Invalid email')
        .required('Required');

// Registration Schema
const registerSchema = Yup.object().shape({
    firstName: FirstNameValidate(),
    lastName: LastNameValidate(),
    email: EmailValidate(),
    address: Yup.string()
        .min(3, "Too Short!")
        .max(20, "Too Long!")
        .required("Required"),
});

// Login Schema
const loginSchema = Yup.object().shape({
    email: EmailValidate(),
    password: Yup.string()
        .min(6, "Too Short!")
        .max(50, "Too Long!")
        .required("Required"),
});

//Quiz Schema
const quizSchema = Yup.object().shape({
    question: Yup.string().required("Required"),
    options: Yup.array().of(Yup.string().required("Required")).length(4, "There should be exactly 4 options"),
    answer: Yup.string().required("Required"),
    category: Yup.string().required("Required"),
});
const newsSchema = Yup.object().shape({
    heading: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
})
// Export Schemas
export { registerSchema, loginSchema, quizSchema, newsSchema };
