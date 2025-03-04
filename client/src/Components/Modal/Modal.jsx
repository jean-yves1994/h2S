import { useState, useEffect } from 'react';
import { createPortal } from "react-dom";
import axios from 'axios'; // Make sure to import axios
import "./Modal.css"; // import custom CSS

export default function CenteredModal({ isOpen, setIsOpen }) {
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    terms: false
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const[email, setEmail] = useState('');

  useEffect(() => {
    const { email, phone, terms } = formData;
    setIsFormValid(email !== '' && phone !== '' && terms);
  }, [formData]);

  // Function to create an invoice
  const handlePayment = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/create-invoice", {
        email: formData.email,
        phoneNumber: formData.phone,
        name: "",
      });

      console.log("Generated Invoice Number:", response?.data?.data.invoiceNumber);
      setIsLoading(false);
      setInvoiceNumber( response?.data?.data.invoiceNumber);
      setEmail( response?.data?.data.customer.email);
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
    }
  };

  // Function to initiate payment using the generated invoiceNumber
  const makePayment = () => {
    IremboPay.initiate({
      publicKey: "pk_live_15a0eeb4cf094da993d347a5a1a241db",
      invoiceNumber: invoiceNumber,
      locale: IremboPay.locale.EN,
      callback: async (err, resp) => {
        if (!err) {
          console.log("Payment successful:", invoiceNumber, email);
          try {
            const response = await fetch("http://localhost:5000/api/payment-success", {
              method: "POST",
              headers: {
               "Content-Type": "application/json",
              },
              body: JSON.stringify({
          email: email,
          invoiceNumber: invoiceNumber,
              }),
            });
            const data = await response.json();
            console.log(data);
          } catch (error) {
            console.error("Error:", error);
          }
        } else {
          console.error("Payment failed:", err);
        }
      },
    });
  }; 

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (name === 'terms' && checked) {
      handlePayment();
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted with data:", formData);
    // Clear form fields
    setFormData({
      email: '',
      phone: '',
      terms: false
    });
    // Close modal after submission
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && createPortal(
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="modal-title">Fill your Information</h2>

            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <input 
                  type="email"
                  id="email"
                  placeholder='Email Address'
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group">
                <input 
                  type="text"
                  placeholder='Phone Number'
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="checkbox-group">
                <input 
                  type="checkbox"
                  id="terms"
                  name="terms"
                  checked={formData.terms}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="terms">Accept Terms</label>
              </div>

              <button 
                onClick={makePayment} 
                type="submit" 
                className="submit-button" 
                disabled={!isFormValid || isLoading}
              >
                {isLoading ? 'Processing...' : 'Proceed to Pay'}
              </button>
            </form>

            <button 
              className="close-modal-button"
              onClick={() => setIsOpen(false)} // Close modal on button click
            >
              ✖
            </button>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
