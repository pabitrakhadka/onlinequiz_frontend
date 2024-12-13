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
//String message validate
const stringMessageValidate = () => {
    return Yup.string()
        .min(5, "Too Short")
        .required("Required");
};
// Registration Schema
const registerSchema = Yup.object().shape({
    firstName: FirstNameValidate(),
    lastName: LastNameValidate(),
    email: EmailValidate(),
    address: Yup.string()
        .min(3, "Too Short!")
        .max(50, "Too Long!")
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
    categoryId: Yup.number().required("Required"),
    description: Yup.string().nullable(),
});
//Subjective Question Schema
const subjectiveQuestionSchema = Yup.object().shape({
    question: Yup.string().required("Required"),
    categoryId: Yup.number().required("Required"),
    category: Yup.number().required("Required"),
});
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png", "image/gif"];
const FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const newsSchema = Yup.object().shape({
    heading: Yup.string()
        .required("Heading is required"),
    description: Yup.string()
        .required("Description is required"),
    image: Yup.mixed()
        .required("Image is required")
        .test(
            "fileSize",
            "File size is too large. Maximum size is 5MB",
            (value) => !value || (value && value.size <= FILE_SIZE)
        )
        .test(
            "fileFormat",
            "Unsupported file format",
            (value) => !value || (value && SUPPORTED_FORMATS.includes(value.type))
        ),
});

//Pdf file validate
const FILE_SIZE_LIMIT = 5 * 1024 * 1024; // 5 MB

const pdfValidationSchema = Yup.object().shape({
    pdfFile: Yup.mixed()
        .required("A PDF file is required.")
        .test(
            "fileType",
            "Only PDF files are allowed.",
            (value) => value && value.type === "application/pdf"
        )
        .test(
            "fileSize",
            "File size must be less than 5MB.",
            (value) => value && value.size <= FILE_SIZE_LIMIT
        ),
    categoryId: Yup.mixed()
        .test("is-number-or-numeric-string", "Must be a number or numeric string", (value) => {
            if (value === undefined || value === null) return false; // Required check
            return !isNaN(Number(value)); // Checks if the value is a valid number or numeric string
        })
        .required("Required"),
});

//contact Schema
const contactSchema = Yup.object().shape({
    firstName: FirstNameValidate(),
    lastName: LastNameValidate(),
    email: EmailValidate(),
    message: stringMessageValidate()
});
const categorySchema = Yup.object().shape({
    categoryName: Yup.string().required("Required"),
});

// Export Schemas
export { registerSchema, loginSchema, quizSchema, newsSchema, pdfValidationSchema, contactSchema, subjectiveQuestionSchema, categorySchema };
