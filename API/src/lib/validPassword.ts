export async function validPassword(password:string) {
    const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+])(?!.*\s).{8,}$/;

    const isValid = regex.test(password)

    return isValid
}