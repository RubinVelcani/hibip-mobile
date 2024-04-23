import { createContext, useContext, useState } from 'react'

type Props = {
	children: React.ReactNode
}

export type ForgotPasswordContextType = {
	email: string;
	otpCode: string;
	otpVerified: boolean;
}

type SingupContextValue = {
	forgotPasswordData: ForgotPasswordContextType
	setForgotPasswordData: React.Dispatch<React.SetStateAction<ForgotPasswordContextType>>
}

const defaultState: ForgotPasswordContextType = {
	email: '',
	otpCode: '',
	otpVerified: false
}

export const ForgotPasswordContext = createContext<SingupContextValue>({forgotPasswordData: defaultState, setForgotPasswordData: () => defaultState})

const SignupProvider = ({ children }: Props) => {
	const [forgotPasswordData, setForgotPasswordData] = useState(defaultState)

	const value = { forgotPasswordData, setForgotPasswordData}

	return <ForgotPasswordContext.Provider value={value}>{children}</ForgotPasswordContext.Provider>
}

export default SignupProvider
