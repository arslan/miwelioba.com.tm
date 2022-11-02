import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import ReCAPTCHA from 'react-google-recaptcha';

import AnimatedImage from "../elements/animated-image";

function ContactForm({ data }) {
  const {
    title,
    anchor,
    firstNameTitle,
    firstNamePlaceholder,
    lastNameTitle,
    lastNamePlaceholder,
    addressTitle,
    addressPlaceholder,
    phoneNumberTitle,
    phoneNumberPlaceholder,
    emailTitle,
    emailPlaceholder,
    messageTitle,
    messagePlaceholder,
    submitButton,
    decor
  } = data;

  const [token, setToken] = useState(null);
  const captchaRef = useRef(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });

  const onError = (errors, e) => console.log(errors, e);

  const onSubmit = (data) => {
    console.log(data);
    if (!token) {
      return alert('Captcha token required');
    }
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...data, token: token }),
    };

    fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/email`,
      requestOptions
    ).then((res) => {});

    reset();
    captchaRef.current.reset();
  };

  useEffect(() => {}, [token]);

  return (
    <div className="container relative pt-12 pb-24 text-white px-80" id={anchor}>
          {/* DECORATION IMAGES */}
          {decor.decorationImages.data?.length === 4 ? (
        <div>
          {/* MINT */}
          <AnimatedImage
            media={{ data: { ...decor.decorationImages?.data[0] } }}
            speed={1}
            className="absolute z-10 w-64 left-20 -top-32"
          />
          {/* GRAPEFRUIT */}
          <AnimatedImage
            media={{ data: { ...decor.decorationImages?.data[1] } }}
            speed={-2}
            className="absolute left-0 w-56 -bottom-64"
          />
          {/* MANGO */}
          <AnimatedImage
            media={{ data: { ...decor.decorationImages?.data[2] } }}
            speed={-1}
            className="absolute z-10 w-56 right-20 -bottom-64"
          />
          {/* ORANGES */}
          <AnimatedImage
            media={{ data: { ...decor.decorationImages?.data[3] } }}
            speed={1}
            className="absolute right-0 z-10 w-64 -top-0"
          />
        </div>
      ) : (
        console.log('Only 4 decoration images are supported. No less no more.')
      )}
      <form
        className="flex flex-col gap-6 p-12 shadow-2xl bg-orange drop-shadow-xl rounded-large"
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <h2 className="mb-4">{title}</h2>

        {/* START: FIRST ROW */}
        <div className="flex flex-row gap-12">
          {/* First Name */}
          <label className="flex flex-col">
            {firstNameTitle}
            <input
              type="text"
              className="peer"
              minLength="2"
              placeholder={firstNamePlaceholder}
              {...register('firstName', { required: true, minLength: 2 })}
            />
            <p className="mt-1 text-sm text-red-800 transition duration-300 opacity-0 peer-invalid:opacity-100">
              Please provide a valid
              <span className="lowercase"> {firstNameTitle}.</span>
            </p>
          </label>
          {/* Last Name */}
          <label className="flex flex-col">
            {lastNameTitle}
            <input
              type="text"
              minLength="2"
              className="peer"
              placeholder={lastNamePlaceholder}
              {...register('lastName', { required: true, minLength: 2 })}
            />
            <p className="mt-1 text-sm text-red-800 transition duration-300 opacity-0 peer-invalid:opacity-100">
              Please provide a valid
              <span className="lowercase"> {lastNameTitle}.</span>
            </p>
          </label>
        </div>
        {/* END: FIRST ROW */}

        {/* START: SECOND ROW */}
        <div className="flex flex-row gap-12">
          {/* Address */}
          <label className="flex flex-col grow">
            {addressTitle}
            <input
              type="text"
              className="peer"
              minLength="4"
              placeholder={addressPlaceholder}
              {...register('address', { required: true, minLength: 4 })}
            />
            <p className="mt-1 text-sm text-red-800 transition duration-300 opacity-0 peer-invalid:opacity-100">
              Please provide a valid
              <span className="lowercase"> {addressTitle}.</span>
            </p>
          </label>
          {/* Phone */}
          <label className="flex flex-col grow">
            {phoneNumberTitle}
            <input
              type="tel"
              className="peer"
              minLength="6"
              maxLength="16"
              placeholder={phoneNumberPlaceholder}
              {...register('phone', {
                required: true,
                maxLength: 16,
                minLength: 6,
              })}
            />
            <p className="mt-1 text-sm text-red-800 transition duration-300 opacity-0 peer-invalid:opacity-100">
              Please provide a valid
              <span className="lowercase"> {phoneNumberTitle}.</span>
            </p>
          </label>
        </div>
        {/* END: SECOND ROW */}

        {/* E-mail */}
        <label className="flex flex-col">
          {emailTitle}
          <input
            type="email"
            placeholder={emailPlaceholder}
            className="peer"
            {...register('email', {
              required: true,
              minLength: 4,
              pattern: /^\S+@\S+$/i,
            })}
          />
          <p className="mt-1 text-sm text-red-800 transition duration-300 opacity-0 peer-invalid:opacity-100">
            Please provide a valid
            <span className="lowercase"> {emailTitle}.</span>
          </p>
        </label>
        {/* END: THIRD ROW */}

        {/* START: FOURTH ROW */}
        {/* Message */}
        <div className="flex flex-col">
          <label>{messageTitle}</label>
          <textarea
            type="text"
            minLength="4"
            maxLength="500"
            className="peer"
            rows={3}
            cols={50}
            placeholder={messagePlaceholder}
            {...register('message', {
              required: true,
              minLength: 4,
              maxLength: 500,
            })}
          />
          <p className="mt-1 text-sm text-red-800 transition duration-300 opacity-0 peer-invalid:opacity-100">
            Please provide a valid
            <span className="lowercase"> {messageTitle}.</span>
          </p>
        </div>
        {/* END: FOURTH ROW */}

        <ReCAPTCHA
          onChange={setToken}
          onErrored={() => setToken(null)}
          onExpired={() => setToken(null)}
          ref={captchaRef}
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
        />

        {/* Submit button */}
        <button type="submit" className="button">
          {submitButton.text}
        </button>
      </form>
    </div>
  );
}

export default ContactForm;
