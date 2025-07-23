import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useState } from "react";
import "./form.css"; 

type FormStates = {
  name: string;
  email: string;
  message: string;
};

const ContactForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<FormStates>();

  return (
    <div className="contact-form-container">
      <form
        onSubmit={handleSubmit((data) => {
          console.log("Form submitted:", data);
          setSubmitted(true);
          reset();
        })}
        className="contact-form"
      >
        <h2>Contact Us</h2>
  
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            {...register("name", { required: "Name is required" })}
            placeholder="Enter your name"
            className={`form-control ${errors.name ? "error-border" : ""}`}
          />
          {errors.name && (
            <p className="error-message">{errors.name.message}</p>
          )}
        </div>
  
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "Invalid email format",
              },
            })}
            placeholder="Enter your email"
            className={`form-control ${errors.email ? "error-border" : ""}`}
          />
          {errors.email && (
            <p className="error-message">{errors.email.message}</p>
          )}
        </div>
  
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            {...register("message", { required: "Message is required" })}
            placeholder="Write your message"
            rows={4}
            className={`form-control ${errors.message ? "error-border" : ""}`}
          />
          {errors.message && (
            <p className="error-message">{errors.message.message}</p>
          )}
        </div>
  
        <button
          type="submit"
          className="submit-btn"
        >
          Send
        </button>
  
        {submitted && (
          <p className="success-message">
            Form successfully submitted!
          </p>
        )}
  
        <DevTool control={control} />
      </form>
    </div>
  );
} 

export default ContactForm;