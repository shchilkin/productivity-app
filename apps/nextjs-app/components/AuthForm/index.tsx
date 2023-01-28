import React from "react";
import {useRouter} from "next/navigation";

const AuthForm: React.FunctionComponent = () => {
    const router = useRouter();
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("submit");
        router.replace("/app");
    }

    return <form>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
        <button type="submit" onClick={() => handleSubmit}>Submit</button>
    </form>
}

export default AuthForm;