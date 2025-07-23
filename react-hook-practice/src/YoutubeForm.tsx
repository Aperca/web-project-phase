import { useForm } from "react-hook-form"
import { DevTool } from '@hookform/devtools'

const YoutubeForm = () => {
  type FormValues = {
    username: string;
    email: string;
    channel: string;
  }
  const {register,handleSubmit,formState:{errors},control} = useForm<FormValues>({mode: 'onBlur'});

  return (
    <div>
      <form onSubmit={handleSubmit((data:any)=>console.log(data))}>
        <label htmlFor='username'>Username</label>
        <input  id='username' {...register('username', {
          required: "Username is required",
          minLength: {value:3, message:"Minimum 3 characters"}
          
          })} />
        {errors.username && <p>{errors.username.message}</p>}

        <label htmlFor='email'>Email</label>
        <input id='email' {...register('email',{
          required:"Email is required", 
          pattern:{
            value: /^\S+@\S+$/i,
            message: "Invalid email format"
        }
        })}/>
        {errors.email && <p>{errors.email.message}</p>}
        <label>Channel</label>
        <input  id='channel' {...register('channel')} />

        <button>Submit</button>

      </form>
      <DevTool control={control} />
    </div>
  )
}

export default YoutubeForm
