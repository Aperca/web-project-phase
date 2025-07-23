import { useForm, type SubmitHandler, Controller } from "react-hook-form"
import { DevTool } from '@hookform/devtools'
const FirstForm = () => {
    type FormValues = {
        firstname: string;
        email: string;
        channe: string;
      }
      const form = useForm<FormValues>();
 const{register,handleSubmit, formState:{ errors},control} = useForm()
 console.log(errors)
  return (
    <div>
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <input {...register('firstname', {required: 'this is required'})} placeholder="firstname"/>
        {errors.firstname && <p>{errors.firstname.message}</p>}
        <input {...register('email', {required: 'this is required', minLength:{value: 4, message: 'Min length is 4'}})} placeholder="email"/>
        {errors.email && <p>{errors.email.message}</p>}

        <input type="submit" />
      </form>
      <DevTool control={control}/>
    </div>
  )
}

export default FirstForm
