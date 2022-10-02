import create from 'zustand';
import axios from 'axios';
import { customLogger, httpErrorLogger } from '../utils/logsManager';

const baseApi = process.env.REACT_APP_BASE_API;

const useOtpManagerStore = create((set, get) => ({
    isOtpSent: false,
    isOtpVerified: false,
    otpToken: null,
    isPasswordReset: false,
    error: null,
    setIsOtpSent: (value) => set({ isOtpSent: value }),
    setIsOtpVerified: (value) => set({ isOtpVerified: value }),
    setOtpToken: (value) => set({ otpToken: value }),
    setIsPasswordReset: (value) => set({ isPasswordReset: value }),
    resetOtpManagerState: () => set({ isOtpSent: false, isOtpVerified: false, isPasswordReset: false, otpToken: null, error: null }),
    setError: (value) => set({ error: value }),
    sendOtp: async (email) => {
        customLogger('Sending OTP');
        await axios.post(`${baseApi}/users/forgetPassword`, { email: email }).then((res) => {
            set({ isOtpSent: true });
        }).catch((err) => {
            httpErrorLogger(err);
            set({ error: err.response.data.message });
        });
    },
    verifyOtp: async (email, otp) => {
        customLogger('Verifying OTP');
        await axios.post(`${baseApi}/users/verifyOtp`, { email: email, otp: otp }).then((res) => {
            set({ isOtpVerified: true });
            set({ otpToken: res.data.token });
        }).catch((err) => {
            httpErrorLogger(err);
            set({ error: err.response.data.message });
        });
    },
    resetPassword: async (email, password) => {
        customLogger('Resetting Password');
        if (get().otpToken) {
            await axios.post(`${baseApi}/users/resetPassword`, { email: email, password: password }, {
                headers: {
                    Authorization: `Bearer ${get().otpToken}`,
                }
            }).then((res) => {
                set({ isPasswordReset: true });
            }).catch((err) => {
                httpErrorLogger(err);
                set({ error: err.response.data.message });
            });
        }
    },
}));

export default useOtpManagerStore;
