import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { hideNotification } from "../../../notification/notificationSlice";
import { Notification } from "../../../notification/components/organism";
import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "react-router-dom";
import { requestNewEmailToken, verifyEmail } from "../../authSlice";
import { Button, Loading } from "../../../../components/atoms";
import { jwtDecode } from "jwt-decode";
import { RiCheckboxCircleLine, RiCloseCircleLine } from "react-icons/ri";

const VerifyEmail = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  // Mendapatkan nilai token dari query parameter
  const token = new URLSearchParams(location.search).get("token");

  const {
    verifyEmailStatus,
    isVerifyEmailError,
    requestNewEmailTokenStatus,
    isRequestNewEmailTokenError
  } = useSelector((state) => state.auth);
  const { message, type, isOpen } = useSelector((state) => state.notification);


  useEffect(() => {
    if(token) {
      dispatch(verifyEmail({token}));
    }
  }, [dispatch, token]);

  const handleCloseNotification = () => {
    dispatch(hideNotification());
  };

  const handelSubmit = () => {
    dispatch(requestNewEmailToken({ email: jwtDecode(token)?.email}))
  }

  return (
    <>
      <Helmet>
        <title>Verify Email</title>
      </Helmet>

      <div className="relative min-h-[100vh] w-screen overflow-x-hidden bg-gradient-to-b from-slate-100 to-slate-50 flex flex-col justify-center items-center">
        <div className="p-3 h-full w-full flex flex-col justify-center items-center gap-4">
          <>
            {verifyEmailStatus === "loading" && (
              <div className="flex justify-center items-center">
                <Loading />
                <span className="text-base">Verifying email...</span>
              </div>
            )}
            {verifyEmailStatus === "succeeded" && (
              <div className="p-3 h-full w-full flex flex-col justify-center items-center gap-4">
                <RiCheckboxCircleLine className="text-5xl text-emerald-400" />
                <div className="p-3 text-base text-center">Email verified successfully!</div>
                <Link to="/auth/login" className="text-sky-500">Go to Login</Link>
              </div>
            )}
            {verifyEmailStatus === "failed" && (
            <div className="p-3 relative h-full flex flex-col justify-center items-center gap-4">
              <RiCloseCircleLine className="text-5xl  text-red-500" />
              <div className="text-base text-center">{`Error: ${isVerifyEmailError}`}</div>
              {requestNewEmailTokenStatus === "succeeded" && (
                <div className="p-3 bg-white border-2 border-emerald-400 rounded text-base">New email verification token sent successfully</div>
              )}
              {requestNewEmailTokenStatus === "failed" && (
                <div className="p-3 bg-white border-2 border-emerald-400 rounded text-base">{`Error: ${isRequestNewEmailTokenError}`}</div>
              )}
              {isVerifyEmailError === "Email verification link has expired. Please request a new one." && (
                <Button
                  onClick={handelSubmit}
                  type={"submit"}
                  text={requestNewEmailTokenStatus !== "loading" && "Resend Email Verification"}
                  disabled={requestNewEmailTokenStatus === "loading"}
                  icon={requestNewEmailTokenStatus === "loading" && <Loading text={true} />}
                  variant={`w-max bg-sky-400 text-white shadow-lg ${requestNewEmailTokenStatus === "succeeded" ? "hidden" : ""}`}
                />
              )}
            </div>
            )}
          </>
        </div>
      </div>

      {isOpen && (
        <Notification
          message={message}
          type={type}
          onClose={handleCloseNotification}
        />
      )}
    </>
  )
}

export default VerifyEmail